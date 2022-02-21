import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import store from './store.js';
import { Provider } from 'react-redux';
import Header from './components/header'
import ContentBody from './components/contentBody'

// ========================================
  
  ReactDOM.render(
      <div className="container" id="app">
          <Provider store={store}>
              <Header/>
              <ContentBody />
          </Provider>
      </div>,
    document.getElementById('root')
  );
  
