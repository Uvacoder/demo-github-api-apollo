import React from 'react';
import Listing from './Listing';

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
  <Listing link={`https://api.github.com/users/${login}`} joinDate={createdAt}>
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
        </div>
      </div>
      <p className="mb-3">{status?.message}</p>
      <p>{bio}</p>
      {location && <p className="mt-3 text-sm">Location: {location}</p>}
    </div>
    {/* Stats */}
    <div className="sm:w-1/2 flex items-center px-3">
      <ul className="w-1/2">
        <li>{followers.totalCount} followers</li>
        <li>{following.totalCount} following</li>
      </ul>
      <ul className="w-1/2">
        <li>{repositories.totalCount} repositories</li>
        <li>{starredRepositories.totalCount} stars</li>
      </ul>
    </div>
  </Listing>
);

export default UserListing;
