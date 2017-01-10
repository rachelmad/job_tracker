import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, hashHistory } from "react-router";

import Dashboard from "../dashboard/Dashboard";

ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={Dashboard} />
    </Router>
  ),
  document.getElementById('main')
);