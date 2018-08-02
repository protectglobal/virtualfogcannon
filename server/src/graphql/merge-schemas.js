const { mergeTypes } = require('merge-graphql-schemas');
const merge = require('lodash/merge');
const FaultCode = require('./fault-code');

// Add all your schemas here
const schemas = {
  FaultCode,
};

// Filter out those schemas for which 'typeDefs' and 'resolvers' are defined. In
// the end we'll get something like the following:
// const allTypeDefs = [Base.typeDefs, User.typeDefs, ...];
// const allResolvers = [Base.resolvers, User.resolvers, ...];
const allTypeDefs = [];
const allResolvers = [];

const keys = Object.keys(schemas);
const { length } = keys;

for (let i = 0; i < length; i += 1) {
  const key = keys[i];
  const { typeDefs, resolvers } = schemas[key];

  if (typeDefs && resolvers) {
    allTypeDefs.push(typeDefs);
    allResolvers.push(resolvers);
  }
}

// Merge all types and resolvers from schemas to create our executable schema
const typeDefs = mergeTypes(allTypeDefs);
const resolvers = merge(...allResolvers);

module.exports = {
  typeDefs,
  resolvers,
};
