import React from 'react';
import { formatDateString } from '../utils';

const Listing = ({ link, children, joinDate }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="mb-4 pt-4 pb-3 border rounded shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between mb-3 sm:mb-0">
        {children}
      </div>
      <small className="text-gray-500 px-3">
        Joined {formatDateString(joinDate)}
      </small>
    </div>
  </a>
);

export default Listing;
