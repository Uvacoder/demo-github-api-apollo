import React from 'react';
import { PAGE_LENGTH } from '../constants';

const Pagination = ({
  resultCount,
  offset,
  setOffset,
  getPreviousPage,
  getNextPage,
}) => {
  const lowerBound = 1 + offset;
  const upperBound = PAGE_LENGTH + offset;
  const canClickPrevious = offset > 0;
  const canClickNext = upperBound < resultCount;

  const handleClickPrevious = () => {
    if (canClickPrevious) {
      setOffset(offset - PAGE_LENGTH);
      getPreviousPage();
    }
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
        <p className="mb-2">
          Showing{' '}
          <strong>
            {lowerBound} - {canClickNext ? upperBound : resultCount}
          </strong>{' '}
          of <strong>{resultCount}</strong> user{resultCount > 1 ? 's' : null}{' '}
          found
        </p>
      ) : (
        <p>No users to show</p>
      )}
      {resultCount > PAGE_LENGTH && (
        <>
          <button
            onClick={handleClickPrevious}
            disabled={!canClickPrevious}
            className="py-2 px-3 mr-2 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleClickNext}
            disabled={!canClickNext}
            className="py-2 px-3 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </>
      )}
    </>
  );
};

export default Pagination;
