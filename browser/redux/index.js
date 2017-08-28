import { combineReducers } from 'redux';
import auth from './auth';
import buds from './buds';
import chat from './chat';


export default combineReducers({ auth, buds, chat });