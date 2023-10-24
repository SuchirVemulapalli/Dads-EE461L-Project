import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./pages/Create.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import Landing from "./pages/Landing.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} />
        <Route path="/create-user" component={Create} />
        <Route path="/landing" component={Landing} />
      </Switch>
    </Router>
  );
};

export default App;
