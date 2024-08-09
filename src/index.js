import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import "nprogress/nprogress.css"; // loading
import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-awesome-lightbox/build/style.css";// preview image
import { PersistGate } from 'redux-persist/integration/react' // lưu thông tin local storage
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom";
import LayOut from './LayOut';

// import i18n (needs to be bundled ;))
import i18n from './utils/i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <LayOut />
      </BrowserRouter>
    </PersistGate>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
