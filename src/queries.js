import { gql } from '@apollo/client';

export const USERS = gql`
  query GetUsers($userQuery: String!, $pageLength: Int!, $cursor: String) {
    search(query: $userQuery, type: USER, first: $pageLength, after: $cursor) {
      userCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          __typename
          ... on User {
            id
            login
            name
            avatarUrl
            bio
            status {
              message
            }
            location
            starredRepositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories {
              totalCount
            }
            createdAt
          }
          ... on Organization {
            id
            login
            name
            avatarUrl
            description
            location
            repositories {
              totalCount
            }
            createdAt
          }
        }
        cursor
      }
    }
  }
`;
