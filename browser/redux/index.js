import { combineReducers } from 'redux';
import auth from './auth';
import buds from './buds';


export default combineReducers({ auth, buds });