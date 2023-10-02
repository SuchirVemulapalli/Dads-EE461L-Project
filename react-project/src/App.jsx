import React from "react";
import Create from "./pages/Create.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
// import {Link} from "react-router-dom"
``;
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/create-user" component={Create} />
      </Switch>
    </Router>
  );
};

export default App;
