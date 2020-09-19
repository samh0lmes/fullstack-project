import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Images from '../containers/images/Index';

export default (
  <Router>
    <Switch>
      <Route path='/' exact component={Images} />
    </Switch>
  </Router>
);
