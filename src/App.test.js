import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('says hello world', () => {
  const { getByText } = render(<App />);
  const helloElement = getByText(/hello world/i);
  expect(helloElement).toBeInTheDocument();
});
