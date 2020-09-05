import React from 'react';
import Listing from './Listing';
import ListingDetails from './ListingDetails';
import ListingStats from './ListingStats';

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
    <ListingDetails {...{ name, login, avatarUrl, bio, status, location }} />
    <ListingStats>
      <ul className="w-1/2">
        <li>{followers.totalCount} followers</li>
        <li>{following.totalCount} following</li>
      </ul>
      <ul className="w-1/2">
        <li>{repositories.totalCount} repositories</li>
        <li>{starredRepositories.totalCount} stars</li>
      </ul>
    </ListingStats>
  </Listing>
);

export default UserListing;
