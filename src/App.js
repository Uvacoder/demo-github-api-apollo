import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
// import UserSchema from './UserSchema';

// TODO Modify search params for pagination
const USERS = gql`
  query GetUsers($userQuery: String!) {
    search(query: $userQuery, type: USER, first: 10) {
      userCount
      edges {
        node {
          ... on User {
            id
            login
            name
            avatarUrl
            bio
          }
        }
      }
    }
  }
`;

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [usersPage, setUsersPage] = useState([]);
  const [getUsers, { loading, data }] = useLazyQuery(USERS);

  useEffect(() => {
    if (data) {
      console.log('got API data:', data);
      setUserCount(data.search.userCount);
      setUsersPage(data.search.edges);
    }
  }, [loading, data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    getUsers({ variables: { userQuery: userQuery } });
  };

  return (
    <>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-search">
          User
          <input
            type="text"
            name="user-search"
            id="user-search"
            value={userQuery}
            onChange={(event) => {
              setUserQuery(event.target.value);
            }}
            placeholder="Name, username, bio..."
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          {userCount !== 0 ? (
            <p>{userCount} users found</p>
          ) : (
            <p>No users to show</p>
          )}
          {usersPage.length ? (
            <ul>
              {usersPage.map((user) => (
                <li key={user.node.id}>
                  <a
                    href={`https://api.github.com/search/users?q=user:${user.node.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
      {/* <hr />
      <UserSchema /> */}
    </>
  );
};

export default App;
