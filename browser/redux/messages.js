import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket';

/* ------------------    ACTIONS    --------------------- */

const ADD = 'ADD_MESSAGES'
const LOAD = 'LOAD_MESSAGES'

/* --------------    ACTION CREATORS    ----------------- */

export const addMess= message => ({ type: ADD, message});
export const loadMess = messages =>({type:LOAD, messages})


/* ------------------    REDUCER    --------------------- */

export default function reducer (messages = [], action) {
  var newMess = messages.slice(0);
  switch (action.type) {
    case ADD:
      	newMess.push(action.message);
      	return newMess;
     case LOAD:	
      	return action.messages;
    default:
      return newMess;
  }
}


export const add = (body, room) => dispatch =>{
	console.log('in signin thunk!')
	return axios.post('/messages/addMessage/'+room, body)
	    .then(res=>res.data)
		.then(user=>{
			console.log('WHAT BACKEND MADE',user);
			dispatch(addMess(user))
			socket.emit('message', room);
		})
}

export const load = (room) => dispatch =>{
	console.log('in loading thunk!', room);
	return axios.get('/messages/getMessages/'+room)
	    .then(res=>res.data)
		.then(messages=>{
			console.log('MESS WE LOADED', messages);
			dispatch(loadMess(messages))
		})
}
