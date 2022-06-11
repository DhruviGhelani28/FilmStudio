import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';



import RootReducers from './Store/RootReducer';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';

// import store from './Store/Store';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(RootReducers, initialState, applyMiddleware(thunk))
// console.log(store.getState())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
