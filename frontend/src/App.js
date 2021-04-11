import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Artists from './Artists';

function App() {
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
            <div style={{ width: 'auto' }} />
            <Link to="/artists">
              <p>Artists</p>
            </Link>
          </nav>
        </div>

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <h2>Home</h2>
          </Route>
          <Route path="/artists">
            <Artists />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
