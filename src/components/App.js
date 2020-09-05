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
    <div className="flex flex-col max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto py-5 px-4 max-h-full bg-white rounded-md shadow-xl">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">GitHub User Search</h1>
        <p className="mb-6">
          by{' '}
          <a
            href="https://github.com/dawneraq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-purple-600 hover:text-purple-700"
          >
            Andrew Aquino
          </a>
        </p>
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            type="text"
            name="user-search"
            id="user-search"
            value={userQuery}
            onChange={(event) => {
              setUserQuery(event.target.value);
            }}
            placeholder="Name, username, bio..."
            aria-label="Search Users"
            className="flex-1 py-2 px-3 border rounded-l focus:rounded-l"
          />
          <button
            type="submit"
            className="py-2 px-3 rounded-r bg-purple-600 hover:bg-purple-700 text-white"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 overflow-auto">
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
      </div>
    </div>
  );
};

export default App;
