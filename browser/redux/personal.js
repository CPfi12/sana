import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket';
/* ------------------    ACTIONS    --------------------- */

const LOAD = 'LOAD_PERS'


/* --------------    ACTION CREATORS    ----------------- */


const load = pers => {
	return ({type: LOAD, pers})
}


/* ------------------    REDUCER    --------------------- */

export default function reducer (pers = [], action) {
  var newPers = pers.slice(0);
  switch (action.type) {
    case LOAD:
    	return action.pers
    default:
      return newPers;
  }
}

export const loadPers = (id) => dispatch =>{
	return axios.get('/strugg/all/'+id)
	    .then(res=>res.data)
		.then(tags=>{
			dispatch(load(tags))
		})
		.catch(console.err)
}

export const addPers = (user,strug) => dispatch =>{
	return axios.post('/strugg/'+strug+'/'+user)
		.then(res=>res.data)
		.then(user=>{
			dispatch(load(user.tags));
		})
		.catch(console.err)
}