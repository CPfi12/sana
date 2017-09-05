import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Main from './components/Main.js';
import '../public/index.scss';

console.log(store)

ReactDOM.render(
   <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('app') 
)