import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket'

/* ------------------    ACTIONS    --------------------- */

const SET    = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });
const remove  = () => ({ type: REMOVE });

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser=null, action) {
  switch (action.type) {

    case SET:

      //return action.user;
      	return action.user;

    case REMOVE:
      return null;

    default:
      return currentUser;
  }
}

export const signin = user => dispatch =>{
	console.log('in signin thunk!')
	return axios.post('/auth/signup', user)
	    .then(res=>res.data)
		.then(user=>{
			dispatch(set(user))
			socket.emit('have-user', user);
		})
}
export const logout = userId => dispatch =>{
	console.log('USERID IN REDUX', userId)
	return axios.post('/auth/remove')
		.then(res=>res.data)
		.then(res=>{
			dispatch(remove())
			return axios.put('/online/toggle/'+userId)
		})
		.then(()=>{
			socket.emit('toggle')
		})
}

export const load = user => dispatch => {
	console.log('HERE AT ALL??');
	return axios.get('/auth/onLoad')
		.then(res=>res.data)
		.then(user=>{
			dispatch(set(user));
			socket.emit('have-user', user);
		
			return axios.put('/online/toggle/'+user.id)
  	 })
  	.then(()=>{
  		socket.emit('toggle')
  	});
		
}



export const login = credentials => dispatch => {
  return axios.post('/auth/login', credentials)
  .then(res=>res.data)
  .then(user => {
    dispatch(set(user));
    socket.emit('have-user', user);
    return axios.put('/online/toggle/'+user.id)
  })
  .then(()=>{
  		socket.emit('toggle')

  });
};