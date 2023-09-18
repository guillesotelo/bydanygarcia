import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Home from "./pages/Home/Home";
import './scss/app.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import PostEditor from './pages/PostEditor/PostEditor';
import PostViewer from './pages/PostViewer/PostViewer';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Subscribe from './pages/Subscribe/Subscribe';
import Bespoken from './pages/Bespoken/Bespoken';
import BespokenLogo from './assets/logos/bespoken_logo.png'
import { AppProvider } from './AppContext';
import RouteTracker from './components/RouteTracker/RouteTracker';
import ReactGA from 'react-ga';

const App: React.FC = () => {
  const preferedLang = localStorage.getItem('preferedLang')
  const localLang = preferedLang ? preferedLang : navigator.language.startsWith('es') ? 'es' : 'en'
  const isMobile = window.screen.width <= 768
  const [search, setSearch] = useState<string[]>([])
  const [post, setPost] = useState<{ [key: number | string]: any }>({})
  const [lang, setLang] = useState<string>(localLang)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    ReactGA.pageview(location.pathname)
  }, [location, document.location.search])

  return (
    <AppProvider
      lang={lang}
      setLang={setLang}
      search={search}
      setSearch={setSearch}
      isMobile={isMobile}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    >
      <RouteTracker />
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

        <Route path="/bespoken/story">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} logo={BespokenLogo}/>
            <Bespoken page='STORY'/>
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/products">
          <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} logo={BespokenLogo}/>
            <Bespoken page='PRODUCTS'/>
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/diy-wedding">
          <div className='page__wrapper'>
          <Header search={search} setSearch={setSearch} logo={BespokenLogo}/>
            <Bespoken page='DIY WEDDING'/>
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
    </AppProvider>
  );
}

export default App;
