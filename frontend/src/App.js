import './App.css';
import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Artists from './pages/Artists';
import Songs from './pages/Songs';
import Users from './pages/Users';
import Genres from './pages/Genres';
import Queries from './pages/Queries';
import Home from './pages/Home';

function App() {
  // TODO: add new routes here
  const routes = [
    { route: '/queries', name: 'Queries', page: <Queries /> },
    { route: '/artists', name: 'Artists', page: <Artists /> },
    { route: '/songs', name: 'Songs', page: <Songs /> },
    { route: '/users', name: 'Users', page: <Users /> },
    { route: '/genres', name: 'Genres', page: <Genres /> },
  ];

  return (
    <Router>
      <Box>
        {/* Nav bar */}
        <Box w="100%">
          <Flex w="auto" m={6} justifyContent="space-between">
            <Link to="/">
              <Heading as="h1" fontWeight="black">Tunify</Heading>
            </Link>
            <Box ml="auto" mr="auto" />
            {routes.map(({ route, name }) => (
              <Link key={route} to={route} style={{ marginLeft: '3%' }}>
                <Text mt={2}>{name}</Text>
              </Link>
            ))}
          </Flex>
        </Box>

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {routes.map(({ route, page }) => (
            <Route exact path={route} key={route}>
              {page}
            </Route>
          ))}
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
