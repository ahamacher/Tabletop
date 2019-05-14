import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/session_api_util';
import { logout } from './actions/session_actions';

import axios from "axios";
import { fetchMessagesByGameId, createMessage } from "./actions/messages_actions";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { decode } from 'punycode';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: {isAuthenticated: true, user: decodedUser }}
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById('root');

  // BEGIN DEV BLOCK

  window.axios = axios;
  window.fetchMessagesByGameId = fetchMessagesByGameId;
  window.createMessage = createMessage;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // END DEV BLOCK

  ReactDOM.render(<Root store={store} />, root);
})
