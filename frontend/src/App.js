import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Artists from './pages/Artists';
import Songs from './pages/Songs';
import Users from './pages/Users';
import Genres from './pages/Genres';
import Queries from './pages/Queries';

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
      <div>
        {/* Nav bar */}
        <div style={{ width: '100%' }}>
          <nav
            style={{
              width: 'auto',
              paddingLeft: 15,
              paddingRight: 15,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/">
              <h1>Tunify</h1>
            </Link>
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            {routes.map(({ route, name }) => (
              <Link key={route} to={route} style={{ marginLeft: '3%' }}>
                <p>{name}</p>
              </Link>
            ))}
          </nav>
        </div>

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <h2>Home</h2>
          </Route>
          {routes.map(({ route, page }) => (
            <Route exact path={route} key={route}>
              {page}
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
