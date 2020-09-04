import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import App from './App';

test('says GitHub User Search', async () => {
  const { findByText } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  const titleElement = await findByText(/github user search/i);
  expect(titleElement).toBeInTheDocument();
});
