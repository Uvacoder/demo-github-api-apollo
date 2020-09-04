import React from 'react';
import { PAGE_LENGTH } from '../constants';

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

export default Pagination;
