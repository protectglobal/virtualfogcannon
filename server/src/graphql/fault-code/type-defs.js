const typeDefs = `
  type FaultCode {
    key: String!
  }

  type Response {
    status: Int!
  }

  type Query {
    getFaultCodes: [FaultCode]
  }

  type Mutation {
    postFaultCode(faultCode: FaultCode!): Response!
  }
`;

module.exports = typeDefs;
