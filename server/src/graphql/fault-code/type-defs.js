const typeDefs = `
  type Response {
    status: Int!
  }

  type Query {
    getFaultCodes: [String]
  }

  type Mutation {
    postFaultCode(faultCode: String!): Response!
  }
`;

module.exports = typeDefs;
