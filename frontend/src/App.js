import './App.css';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SearchMusic from './pages/SearchMusic';
import Matchmaking from './pages/Matchmaking';
import Admin from './pages/admin/Admin';
import Profile from './pages/account/Profile';
import SignIn from './pages/account/SignIn';
import SignUp from './pages/account/SignUp';

function App() {
  const NAVBAR_ROUTES = [
    { route: '/search', name: 'Search music', page: <SearchMusic /> },
    { route: '/matchmaking', name: 'Matchmaking', page: <Matchmaking /> },
    { route: '/admin', name: 'Admin', page: <Admin /> },
  ];

  const ACCOUNT_ROUTES = [
    { route: '/profile', name: 'Profile', page: <Profile /> },
    { route: '/sign-in', name: 'Sign in', page: <SignIn /> },
    { route: '/sign-up', name: 'Sign up', page: <SignUp /> }
  ]; 
  return (
    <Router>
      <Box>
        {/* Nav bar */}
        <Navbar navbarRoutes={NAVBAR_ROUTES} accountRoutes={ACCOUNT_ROUTES} />

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {[...NAVBAR_ROUTES, ...ACCOUNT_ROUTES].map(({ route, page }) => (
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
