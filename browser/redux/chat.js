import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket';
/* ------------------    ACTIONS    --------------------- */

const ADD = 'ADD_CHAT'
const LOAD = 'LOAD_CHAT'

/* --------------    ACTION CREATORS    ----------------- */

const add = chat => ({ type: ADD, chat });
const load = chats => ({type: LOAD, chats})


/* ------------------    REDUCER    --------------------- */

export default function reducer (chats = [], action) {
  var newChat = chats.slice(0);
  switch (action.type) {

    case ADD:
      	newChat.push(action.chat);
      	return newChat;
    case LOAD:
    	return action.chats

    default:
      return newChat;
  }
}

export const addChat = (mentorId) => dispatch =>{
	return axios.post(`/chat/addChat/${mentorId}`)
	    .then(res=>res.data)
		.then(chat=>{
			dispatch(add(chat))
			socket.emit('add-chat');
		})
}

export const loadChats = () => dispatch =>{
	console.log('in LOAD CHATS')
	return axios.get('/chat/loadChat')
		.then(res=> res.data)
		.then(chats=>{
			dispatch(load(chats))
		})
}
