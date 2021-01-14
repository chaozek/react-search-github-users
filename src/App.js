import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AuthWrapper>
    <Router>
    <Switch>
      <PrivateRoute  path="/" exact={true}>
      <Dashboard></Dashboard>
      </PrivateRoute>
      <Route exact path="/Login">
      <Login > </Login>
      </Route>
      <Route exact path="*">
      <Error >  </Error>

      </Route>
    </Switch>
    </Router>
</AuthWrapper>
  );
}

export default App;
