import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

const personalAccessToken = process.env.REACT_APP_GITHUB_API_KEY;

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

export default client;
