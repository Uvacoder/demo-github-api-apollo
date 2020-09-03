import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
// import UserSchema from './UserSchema';

const USERS = gql`
  query GetUsers($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      bio
    }
  }
`;

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [getUsers, { loading, data }] = useLazyQuery(USERS);

  useEffect(() => {
    if (data) {
      console.log('got API data:', data);
      setUsers(data);
    }
  }, [loading, data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    getUsers({ variables: { login: userQuery } });
    console.log('you submitted the form!');
  };

  return (
    <>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-search">
          Username
          <input
            type="text"
            name="user-search"
            id="user-search"
            value={userQuery}
            onChange={(event) => {
              setUserQuery(event.target.value);
            }}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <pre>{JSON.stringify(users, null, 2)}</pre>

          {/* TODO Get list of users whose logins include userQuery */}
          {users.length ? (
            <ul>
              {users.map((user, i) => (
                <li key={i}>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </li>
              ))}
            </ul>
          ) : (
            // <p>No users found</p>
            <pre>
              users.length === 0, or users has no property called length
            </pre>
          )}
        </>
      )}
      {/* <hr />
      <UserSchema /> */}
    </>
  );
};

export default App;
