import { createStore, applyMiddleware } from 'redux';
import rootReducer from './index.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;