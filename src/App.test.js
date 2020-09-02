import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';

test('says hello world', async () => {
  const { findByText } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  const helloElement = await findByText(/hello world/i);
  expect(helloElement).toBeInTheDocument();
});
