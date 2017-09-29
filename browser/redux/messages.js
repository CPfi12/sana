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
	return axios.post('/messages/addMessage/'+room, body)
	    .then(res=>res.data)
		.then(user=>{
			dispatch(addMess(user))
			socket.emit('message', room);
		})
		.catch(console.err)
}

export const load = (room) => dispatch =>{
	return axios.get('/messages/getMessages/'+room)
	    .then(res=>res.data)
		.then(messages=>{
			dispatch(loadMess(messages))
		})
		.catch(console.err)
}
