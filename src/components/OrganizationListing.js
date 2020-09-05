import React from 'react';
import Listing from './Listing';
import ListingDetails from './ListingDetails';
import ListingStats from './ListingStats';

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
  <Listing link={`https://api.github.com/orgs/${login}`} joinDate={createdAt}>
    <ListingDetails
      {...{
        name,
        login,
        avatarUrl,
        description,
        location,
        isOrganization: true,
      }}
    />
    <ListingStats>
      <ul className="sm:mx-auto">
        <li>{membersWithRole.totalCount} members</li>
        <li>{repositories.totalCount} repositories</li>
      </ul>
    </ListingStats>
  </Listing>
);

export default OrganizationListing;
