import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USERS } from '../queries';
import { PAGE_LENGTH } from '../constants';
import Pagination from './Pagination';
import UserListing from './UserListing';
import OrganizationListing from './OrganizationListing';

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [getUsers, { loading, data, error, fetchMore }] = useLazyQuery(USERS);
  const [offset, setOffset] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [previousCursors, setPreviousCursors] = useState([]);

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

  const getPreviousPage = () => {
    const previousCursor = previousCursors.slice(-1)[0];

    // Pop last known cursor off of stack
    setPreviousCursors(
      previousCursors.filter((cursor) => cursor !== previousCursor)
    );
    setCursor(previousCursor);

    fetchMore({
      variables: { cursor: previousCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  };

  const getNextPage = () => {
    const { endCursor } = data.search.pageInfo;

    // Push last known cursor onto stack
    setPreviousCursors([...previousCursors, cursor]);
    setCursor(endCursor);

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
                  getPreviousPage,
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
                  getPreviousPage,
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

export default App;
