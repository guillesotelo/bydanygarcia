import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './scss/app.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import PostEditor from './components/PostEditor/PostEditor';
import PostViewer from './pages/PostViewer/PostViewer';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Subscribe from './pages/Subscribe/Subscribe';

const App: React.FC = () => {
  const [search, setSearch] = useState<string[]>([])

  return (
    <Switch>
      <Route exact path="/">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Home />
          <Footer />
        </div>
      </Route>

      <Route path="/privacyPolicy">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <PrivacyPolicy />
          <Footer />
        </div>
      </Route>

      <Route path="/about">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <About />
          <Footer />
        </div>
      </Route>

      <Route path="/contact">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Contact />
          <Footer />
        </div>
      </Route>

      <Route path="/editor">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <PostEditor />
          <Footer />
        </div>
      </Route>

      <Route path="/post">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <PostViewer />
          <Footer />
        </div>
      </Route>
      <Route path="/post:id">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <PostViewer />
          <Footer />
        </div>
      </Route>

      <Route path="/blog">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Blog />
          <Footer />
        </div>
      </Route>

      <Route path="/login">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Login />
          <Footer />
        </div>
      </Route>

      <Route path="/search">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Search search={search} />
          <Footer />
        </div>
      </Route>

      <Route path="/subscribe">
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Subscribe />
          <Footer />
        </div>
      </Route>

      <Route>
        <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} />
          <Home />
          <Footer />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
