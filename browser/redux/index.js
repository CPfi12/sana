import { combineReducers } from 'redux';
import auth from './auth';
import buds from './buds';
import chat from './chat';
import messages from './messages';
import struggles from './struggles';
import pers from './personal';
import filter from './filter';


export default combineReducers({ auth, buds, chat, messages, struggles, pers, filter });