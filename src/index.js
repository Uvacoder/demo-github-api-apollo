import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import './index.css';
import App from './App';

// TODO Maybe this shouldn't be committed to source control?
// But it's only allowed to read user profile data + email addresses, so whatever
const personalAccessToken = 'b7ec5bdbf8b0ed6874d15adc3804d01ba305a7bd';

// https://risanb.com/code/set-authorization-header-with-apollo-client/
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: personalAccessToken ? `bearer ${personalAccessToken}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetTypes {
        __schema {
          types {
            name
            kind
            description
            fields {
              name
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
