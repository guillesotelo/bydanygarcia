import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-M92VPE29C8";
ReactGA.initialize(TRACKING_ID);

const isMobile = window.screen.width <= 768

const toastOptions = {
  style: {
    marginTop: isMobile ? '20vw' : '10vw',
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Toaster toastOptions={toastOptions} />
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('root')
);