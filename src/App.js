import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const USERS = gql`
  query GetUsers($userQuery: String!, $pageLength: Int!, $cursor: String) {
    search(query: $userQuery, type: USER, first: $pageLength, after: $cursor) {
      userCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          __typename
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
            repositories {
              totalCount
            }
            createdAt
          }
          ... on Organization {
            id
            login
            name
            avatarUrl
            description
            location
            repositories {
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

const formatDateString = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [getUsers, { loading, data, error, fetchMore }] = useLazyQuery(USERS);

  // Handle incoming data
  useEffect(() => {
    if (data) {
      console.log('got API data:', data);
    }

    if (error) {
      console.error(error);
    }
  }, [loading, data, error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    getUsers({
      variables: {
        userQuery: userQuery,
        pageLength: PAGE_LENGTH,
      },
    });
  };

  // TODO implement getPreviousPage

  const getNextPage = () => {
    const { endCursor } = data.search.pageInfo;

    fetchMore({
      variables: { cursor: endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
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
          {data?.search.edges.length ? (
            <>
              <Pagination
                {...{
                  resultCount: data.search.userCount,
                  offset,
                  setOffset,
                  getNextPage,
                }}
              />
              <ul>
                {data.search.edges.map((result) => (
                  <li key={result.node.id}>
                    {result.node.__typename === 'User' ? (
                      <UserListing {...result.node} />
                    ) : (
                      <OrganizationListing {...result.node} />
                    )}
                  </li>
                ))}
              </ul>
              <Pagination
                {...{
                  resultCount: data.search.userCount,
                  offset,
                  setOffset,
                  getNextPage,
                }}
              />
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
  repositories,
  createdAt,
}) => (
  <a
    href={`https://api.github.com/search/users/${login}`}
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
      <li>{repositories.totalCount} repositories</li>
      <li>{starredRepositories.totalCount} stars</li>
      <li>Location: {location}</li>
      <li>Joined {formatDateString(createdAt)}</li>
    </ul>
  </a>
);

const OrganizationListing = ({
  login,
  name,
  avatarUrl,
  description,
  location,
  repositories,
  createdAt,
}) => (
  <a href={`https://api.github.com/search/orgs/${login}`}>
    <h2>{login}</h2>
    <h3>{name}</h3>
    <h4>Organization</h4>
    <img src={avatarUrl} alt={`${login}'s avatar`} />
    <p>{description}</p>
    <ul>
      <li>Location: {location}</li>
      <li>{repositories.totalCount} repositories</li>
      <li>Joined {formatDateString(createdAt)}</li>
    </ul>
  </a>
);

const Pagination = ({ resultCount, offset, setOffset, getNextPage }) => {
  const lowerBound = 1 + offset;
  const upperBound = PAGE_LENGTH + offset;
  const canClickPrevious = offset > 0;
  const canClickNext = upperBound < resultCount;

  const handleClickPrevious = () => {
    if (canClickPrevious) setOffset(offset - PAGE_LENGTH);
  };

  const handleClickNext = () => {
    if (canClickNext) {
      setOffset(offset + PAGE_LENGTH);
      getNextPage();
    }
  };

  return (
    <>
      {resultCount !== 0 ? (
        <p>
          Showing {lowerBound} - {canClickNext ? upperBound : resultCount} of{' '}
          {resultCount} user{resultCount > 1 ? 's' : null} found
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
