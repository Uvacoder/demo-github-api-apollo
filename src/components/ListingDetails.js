import React from 'react';

const ListingDetails = ({
  name,
  login,
  avatarUrl,
  status,
  bio,
  description,
  location,
  isOrganization,
}) => (
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
        {isOrganization && <h4 className="text-sm">Organization</h4>}
      </div>
    </div>
    {status && <p className="mb-3">{status?.message}</p>}
    {bio && <p>{bio}</p>}
    {description && <p>{description}</p>}
    {location && <p className="mt-3 text-sm">Location: {location}</p>}
  </div>
);

export default ListingDetails;
