/**
 * Starts the Apollo Server and Express server.
 *
 * Initializes Apollo Server with the type definitions and resolvers.
 * Adds authentication middleware.
 * Starts the Express server and applies the Apollo middleware.
 * Opens the database connection and listens for requests.
 */
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startServer();
