// import React from 'react';
// import SearchBooks from './pages/SearchBooks';
// import SavedBooks from './pages/SavedBooks';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
// import { setContext } from "@apollo/client/link/context";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
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
