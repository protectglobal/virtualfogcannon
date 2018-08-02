const typeDefs = `
  type Response {
    status: Int!
  }

  type Event {
    cannonId: String!
    eventType: String!
    eventValue: String!
  }

  input EventInput {
    cannonId: String!
    eventType: String!
    eventValue: String!
  }

  type Query {
    getEvents: [Event]
  }

  type Mutation {
    postEvent(event: EventInput!): Response!
  }
`;

module.exports = typeDefs;
