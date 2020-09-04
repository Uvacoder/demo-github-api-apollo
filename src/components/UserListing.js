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
    <h2>{login}</h2>
    <h3>{name}</h3>
    <img src={avatarUrl} alt={`${login}'s avatar`} />
    <p>{status?.message}</p>
    <p>{bio}</p>
    <ul>
      <li>{followers.totalCount} followers</li>
      <li>{following.totalCount} following</li>
      <li>{repositories.totalCount} repositories</li>
      <li>{starredRepositories.totalCount} stars</li>
      <li>Location: {location}</li>
      <li>Joined {formatDateString(createdAt)}</li>
    </ul>
  </a>
);

export default UserListing;
