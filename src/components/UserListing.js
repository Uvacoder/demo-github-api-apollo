import React from 'react';
const { formatDateString } = require('../utils');

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
    href={`https://api.github.com/users/${login}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="mb-4 pt-4 pb-2 border rounded shadow-md bg-white">
      <div className="flex justify-between px-3">
        <div className="w-1/2 mb-2 border-r">
          <div className="flex items-center mb-3">
            <img
              src={avatarUrl}
              alt={`${login}'s avatar`}
              className="h-16 w-16 rounded-full mr-3"
            />
            <div>
              <h2 className="text-xl">{name}</h2>
              <h3 className="font-bold">{login}</h3>
            </div>
          </div>
          <p>{status?.message}</p>
          <p>{bio}</p>
          {location && <p className="mt-2">Location: {location}</p>}
        </div>
        <div className="w-1/2 flex items-center px-3">
          <ul className="w-1/2">
            <li>{followers.totalCount} followers</li>
            <li>{following.totalCount} following</li>
          </ul>
          <ul className="w-1/2">
            <li>{repositories.totalCount} repositories</li>
            <li>{starredRepositories.totalCount} stars</li>
          </ul>
        </div>
      </div>
      <small className="text-gray-500 px-3">
        Joined {formatDateString(createdAt)}
      </small>
    </div>
  </a>
);

export default UserListing;
