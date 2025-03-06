import { gql } from "apollo-server";

export const typeDefs = gql`
type User {
    id: ID!
    username: String!
    role: String!
  }

  type AuthPayload {
    token: String!
  }

  type Personality {
    id: ID!
    name: String!
    birthYear: Int!
    deathYear: Int
    description: String!
    notableWorks: [String]
  }

  type Event {
    id: ID!
    title: String!
    year: Int!
    description: String!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    personalities: [Personality!]!
    personality(id: ID!): Personality
  }

  type Mutation {
    register(username: String!, password: String!, role: String!): User
    login(username: String!, password: String!): AuthPayload
    addEvent(title: String!, year: Int!, description: String!): Event
    updateEvent(id: ID!, title: String, year: Int, description: String): Event
    deleteEvent(id: ID!): Event
    addPersonality(name: String!, birthYear: Int!, deathYear: Int, description: String!, notableWorks: [String]): Personality!
    updatePersonality(id: ID!, name: String, birthYear: Int, deathYear: Int, description: String, notableWorks: [String]): Personality!
    deletePersonality(id: ID!): Boolean
  }
`;
