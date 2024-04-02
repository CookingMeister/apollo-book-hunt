/**
 * Apollo Client setup and provider for GraphQL requests
 *
 * Imports necessary Apollo Client dependencies and creates an Apollo Client instance configured to make requests to the GraphQL API at '/graphql'.
 * Includes an auth middleware that adds the JWT token to requests if present.
 * Renders the App component wrapped in an ApolloProvider to make the client available to connected components.
 */
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
  ApolloProvider,
} from '@apollo/client';


// create an http link endpoint
const httpLink = new HttpLink({
  uri: '/graphql',
});
// create an auth middleware to add the token to the headers
const authMiddleware = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// Create policy to merge new savedBooks cache data
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedBooks: {
          // eslint-disable-next-line no-unused-vars
          merge(_existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
// execute the auth middleware before GraphQL requests
const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
