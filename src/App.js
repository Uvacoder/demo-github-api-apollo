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
            status {
              message
            }
            location
            starredRepositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            createdAt
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
                  <UserListing {...user.node} />
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

const UserListing = ({
  login,
  name,
  avatarUrl,
  bio,
  status,
  location,
  starredRepositories,
  followers,
  following,
  createdAt,
}) => (
  <a
    href={`https://api.github.com/search/users?q=user:${login}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2>{login}</h2>
    <h3>{name}</h3>
    <img src={avatarUrl} alt={`${login}'s avatar`} />
    <p>{status?.message}</p>
    <p>{bio}</p>
    <ul>
      <li>{followers.totalCount} followers</li>
      <li>{following.totalCount} following</li>
      <li>{starredRepositories.totalCount} stars</li>
      <li>Location: {location}</li>
      <li>
        Joined{' '}
        {new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })}
      </li>
    </ul>
  </a>
);

export default App;
