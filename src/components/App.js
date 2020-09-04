import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USERS } from '../queries';
import { PAGE_LENGTH } from '../constants';
import Pagination from './Pagination';
import UserListing from './UserListing';
import OrganizationListing from './OrganizationListing';

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

export default App;
