import React from 'react';
import Listing from './Listing';

const OrganizationListing = ({
  login,
  name,
  avatarUrl,
  description,
  location,
  membersWithRole,
  repositories,
  createdAt,
}) => (
  // TODO Consolidate this and UserListing into one component
  <Listing link={`https://api.github.com/orgs/${login}`} joinDate={createdAt}>
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
      {location && <p className="mt-3 text-sm">Location: {location}</p>}
    </div>
    {/* Stats */}
    <div className="sm:w-1/2 flex items-center px-3">
      <ul className="sm:mx-auto">
        <li>{membersWithRole.totalCount} members</li>
        <li>{repositories.totalCount} repositories</li>
      </ul>
    </div>
  </Listing>
);

export default OrganizationListing;
