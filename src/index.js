import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Toaster position="top-center" toastOptions={{duration:5000}}/>
    </React.StrictMode>
  </BrowserRouter>
);
