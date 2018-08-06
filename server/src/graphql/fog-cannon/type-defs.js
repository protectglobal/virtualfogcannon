const typeDefs = `
  type FogCannon {
    _id: ID!
    cannonId: String!
    state: String!
  }

  type Query {
    fogCannon(cannonId: String!): FogCannon!
  }
`;

module.exports = typeDefs;
