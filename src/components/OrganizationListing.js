import React from 'react';
const { formatDateString } = require('../utils');

const OrganizationListing = ({
  login,
  name,
  avatarUrl,
  description,
  location,
  repositories,
  createdAt,
}) => (
  <a
    href={`https://api.github.com/orgs/${login}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="mb-4 pt-4 pb-2 border rounded shadow-md bg-white">
      <div className="flex flex-col sm:flex-row justify-between mb-3 sm:mb-0">
        {/* Details */}
        <div className="sm:w-1/2 mb-3 sm:border-r px-3">
          <div className="flex items-center mb-3">
            <img
              src={avatarUrl}
              alt={`${login}'s avatar`}
              className="h-16 w-16 rounded-full mr-3"
            />
            <div>
              <h2 className="text-xl">{name}</h2>
              <h3 className="font-bold">{login}</h3>
              <h4 className="text-sm">Organization</h4>
            </div>
          </div>
          <p>{description}</p>
          {location && <p className="mt-3">Location: {location}</p>}
        </div>
        {/* Stats */}
        <div className="sm:w-1/2 flex items-center px-3">
          <ul>
            {/* TODO Show membersWithRole */}
            <li>{repositories.totalCount} repositories</li>
          </ul>
        </div>
      </div>
      <small className="text-gray-500 px-3">
        Joined {formatDateString(createdAt)}
      </small>
    </div>
  </a>
);

export default OrganizationListing;
