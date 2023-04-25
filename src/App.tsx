import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
     
      <Route>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
