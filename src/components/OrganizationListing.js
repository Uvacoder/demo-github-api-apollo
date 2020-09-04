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
    <h2>{login}</h2>
    <h3>{name}</h3>
    <h4>Organization</h4>
    <img src={avatarUrl} alt={`${login}'s avatar`} />
    <p>{description}</p>
    <ul>
      <li>Location: {location}</li>
      <li>{repositories.totalCount} repositories</li>
      <li>Joined {formatDateString(createdAt)}</li>
    </ul>
  </a>
);

export default OrganizationListing;
