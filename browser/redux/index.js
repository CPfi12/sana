import { combineReducers } from 'redux';
import auth from './auth';
import buds from './buds';
import chat from './chat';
import messages from './messages';


export default combineReducers({ auth, buds, chat, messages });