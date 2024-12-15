import { gql } from "apollo-server-express";

export const repositoryTypeDef = gql`
  type Repository {
    id: Int!
    name: String!
    stars: Int
    forks: Int
    latestRelease: Release
  }

  type Release {
    id: Int!
    version: String!
    publishedAt: String!
    seen: Boolean!
    releaseNotes: String
  }

  type Query {
    repositories: [Repository!]!
    repositoryDetails(name: String!): Repository
  }

  type Mutation {
    addRepository(name: String!): Repository!
    markReleaseAsSeen(releaseId: Int!): Boolean!
    refreshRepositories: Boolean!
  }
`;
