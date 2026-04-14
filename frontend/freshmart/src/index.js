// import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from './redux/store';
import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
   <GoogleOAuthProvider clientId="881290507510-402qhusgu22j41cklrvmknht3a8v8k5u.apps.googleusercontent.com">
  <BrowserRouter>
    <App />
  </BrowserRouter>
</GoogleOAuthProvider>
  </Provider>
);