/**
 * Exports the GraphQL type definitions and resolvers.
 *
 * The type definitions define the schema and query structure.
 * The resolvers contain the implementation of each query/mutation.
 */
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
