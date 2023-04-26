import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './scss/app.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Header />
        <Home />
        <Footer />
      </Route>

      <Route path="/privacyPolicy">
        <Header />
        <PrivacyPolicy />
        <Footer />
      </Route>

      <Route path="/about">
        <Header />
        <About />
        <Footer />
      </Route>

      <Route path="/contact">
        <Header />
        <Contact />
        <Footer />
      </Route>

      <Route>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
