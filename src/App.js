import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const USERS = gql`
  query GetUsers($userQuery: String!, $pageLength: Int, $cursor: String) {
    search(query: $userQuery, type: USER, first: $pageLength, after: $cursor) {
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
        cursor
      }
    }
  }
`;

const PAGE_LENGTH = 10;

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [usersPage, setUsersPage] = useState([]);
  const [offset, setOffset] = useState(0);
  // TODO How to synchronize cursor w/offset for Pagination?
  // setCursor should be called with fetchMore
  const [cursor, setCursor] = useState(null);
  const [getUsers, { loading, data, fetchMore }] = useLazyQuery(USERS);

  useEffect(() => {
    if (data) {
      console.log('got API data:', data);

      // TODO This only accounts for when Organization results appear in the first page
      // What if instead of stripping out Organizations, we showed them too?
      const onlyUsers = data.search.edges.filter(
        (edge) => edge.node.__typename === 'User'
      );
      setUserCount(
        data.search.userCount - (data.search.edges.length - onlyUsers.length)
      );
      setUsersPage(onlyUsers);
    }
  }, [loading, data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    getUsers({
      variables: {
        userQuery: userQuery,
        pageLength: PAGE_LENGTH,
        cursor: cursor,
      },
    });
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
          {usersPage.length ? (
            <>
              <Pagination {...{ userCount, offset, setOffset }} />
              <ul>
                {usersPage.map((user) => (
                  <li key={user.node.id}>
                    <UserListing {...user.node} />
                  </li>
                ))}
              </ul>
              <Pagination {...{ userCount, offset, setOffset }} />
            </>
          ) : null}
        </>
      )}
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

const Pagination = ({ userCount, offset, setOffset }) => {
  const lowerBound = 1 + offset;
  const upperBound = PAGE_LENGTH + offset;
  const canClickPrevious = offset > 0;
  const canClickNext = upperBound < userCount;

  const handleClickPrevious = () => {
    if (canClickPrevious) setOffset(offset - PAGE_LENGTH);
  };

  const handleClickNext = () => {
    if (canClickNext) setOffset(offset + PAGE_LENGTH);
  };

  return (
    <>
      {userCount !== 0 ? (
        <p>
          Showing {lowerBound} - {canClickNext ? upperBound : userCount} of{' '}
          {userCount} user{userCount > 1 ? 's' : null} found
        </p>
      ) : (
        <p>No users to show</p>
      )}
      <button onClick={handleClickPrevious} disabled={!canClickPrevious}>
        Previous
      </button>
      <button onClick={handleClickNext} disabled={!canClickNext}>
        Next
      </button>
    </>
  );
};

export default App;
