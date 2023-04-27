import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <BrowserRouter>
    <Toaster />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);