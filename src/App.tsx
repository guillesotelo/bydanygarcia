import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './scss/app.scss'
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Header/>
        <Home />
      </Route>
     
      <Route>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
