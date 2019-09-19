import React from 'react';
import {Router,Switch,Route} from 'react-router';
import Page from './Page';



const RoutePage = () => {
  return (
    <Router>
      <Switch>
          <Route path="/" component={Page} />
      </Switch>
    </Router>
  );
}

export default RoutePage;
