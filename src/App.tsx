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
import ReactGA from 'react-ga4';
import { postType } from './types';
import Notifications from './pages/Notifications/Notifications';
import Store from './pages/Store/Store';
import Product from './pages/Product/Product';
import EditStore from './pages/EditStore/EditStore';

const App: React.FC = () => {
  const preferedLang = localStorage.getItem('preferedLang')
  const localLang = preferedLang ? preferedLang : navigator.language.startsWith('es') ? 'es' : 'en'
  const isInstagram = (navigator.userAgent.indexOf('Instagram') > -1) ? true : false
  const [search, setSearch] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(isInstagram || window.screen.width <= 768)
  const [lang, setLang] = useState<string>(localLang)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [isStoreSubdomain, setIsStoreSubdomain] = useState<boolean | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname
    })

    setIsStoreSubdomain(window.location.hostname.startsWith('store.'))
  }, [location, window.location.pathname])

  return (
    <AppProvider
      lang={lang}
      setLang={setLang}
      search={search}
      setSearch={setSearch}
      isMobile={isMobile}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      darkMode={darkMode}
    >
      <RouteTracker />
      <Switch>

        {isStoreSubdomain ?
          <Route path="/">
            <div className='page__wrapper'>
              <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
              <Store />
              <Footer />
            </div>
          </Route>
          :
          <Route exact path="/">
            <div className='page__wrapper'>
              <Header search={search} setSearch={setSearch} />
              <Home />
              <Footer />
            </div>
          </Route>
        }

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
            <PostViewer />
            <Footer />
          </div>
        </Route>
        <Route path="/post/:title">
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

        <Route path="/bespoken">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='HOME' />
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/home">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='HOME' />
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/story">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='STORY' />
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/values">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='VALUES' />
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/products">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='PRODUCTS' />
            <Footer />
          </div>
        </Route>
        <Route path="/bespoken/products:category">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='PRODUCTS' />
            <Footer />
          </div>
        </Route>

        <Route path="/bespoken/our_handcrafted_wedding">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Bespoken page='OUR HANDCRAFTED WEDDING' />
            <Footer />
          </div>
        </Route>

        <Route exact path="/store">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Store />
            <Footer />
          </div>
        </Route>

        <Route path="/store/edit">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <EditStore />
            <Footer />
          </div>
        </Route>

        <Route path="/store/product">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Product />
            <Footer />
          </div>
        </Route>
        <Route path="/store/product:id">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} bespokenLogo={BespokenLogo} />
            <Product />
            <Footer />
          </div>
        </Route>

        <Route path="/notifications">
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <Notifications />
            <Footer />
          </div>
        </Route>

        {/* <Route>
          <div className='page__wrapper'>
            <Header search={search} setSearch={setSearch} />
            <Home />
            <Footer />
          </div>
        </Route> */}
      </Switch>
    </AppProvider>
  );
}

export default App;
