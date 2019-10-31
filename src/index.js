import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store as appStore } from './store';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './css/main.css';
import './css/form.css';
import './css/sidebar.css';
import './css/login.css';
import './css/core.css';

const store = createStore(
    appStore,
    applyMiddleware(
        logger,
        thunkMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>    
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
