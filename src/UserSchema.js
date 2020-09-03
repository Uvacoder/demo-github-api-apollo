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

const UserSchema = () => {
  const { loading, error, data } = useQuery(USER_SCHEMA);

  if (loading) return <p>Loading User schema...</p>;
  if (error) return <p>Error getting User schema</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default UserSchema;
