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
import { AppProvider } from './AppContext';

const App: React.FC = () => {
  const preferedLang = localStorage.getItem('preferedLang')
  const localLang = preferedLang ? preferedLang : navigator.language.startsWith('es') ? 'es' : 'en'
  const isMobile = window.screen.width <= 768
  const [search, setSearch] = useState<string[]>([])
  const [post, setPost] = useState<{ [key: number | string]: any }>({})
  const [lang, setLang] = useState<string>(localLang)

  return (
    <AppProvider lang={lang} setLang={setLang} isMobile={isMobile}>
      <Switch>
        <Route exact path="/">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <Home setPost={setPost} />
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

        <Route path="/editor:new">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <PostEditor />
            <Footer />
          </div>
        </Route>

        <Route path="/post">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <PostViewer post={post} setPost={setPost} />
            <Footer />
          </div>
        </Route>
        <Route path="/post:id">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <PostViewer post={post} setPost={setPost} />
            <Footer />
          </div>
        </Route>

        <Route path="/blog">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <Blog setPost={setPost} />
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
            <Search search={search} setPost={setPost} />
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
            <Home setPost={setPost} />
            <Footer />
          </div>
        </Route>
      </Switch>
    </AppProvider>
  );
}

export default App;
