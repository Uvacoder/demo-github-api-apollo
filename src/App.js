import React from 'react';
import { gql, useQuery } from '@apollo/client';

const USER_SCHEMA = gql`
  query GetUserSchema {
    __type(name: "User") {
      name
      kind
      description
      fields {
        name
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(USER_SCHEMA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <>
      <h1>Hello world!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default App;
