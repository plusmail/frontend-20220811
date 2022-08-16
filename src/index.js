import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import axios from "axios";

axios.defaults.baseURL = "https://localhost:8080";
axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    console.log("loadUser try :", user);
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

    const {_id, accessToken, username} = JSON.parse(user);
    console.log("loadUser try 2:", username, accessToken);
    store.dispatch(tempSetUser());
    store.dispatch(check({username, accessToken}));
  } catch (e) {
    console.log('loadUser localStorage is not working', e);
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
 		<CookiesProvider> 
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </CookiesProvider> 
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

