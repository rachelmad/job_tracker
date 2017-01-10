import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, hashHistory } from "react-router";

import JobsOverview from "./components/JobsOverview";

ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={JobsOverview} />
    </Router>
  ),
  document.getElementById('main')
);