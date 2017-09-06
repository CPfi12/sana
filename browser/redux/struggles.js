import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket';
/* ------------------    ACTIONS    --------------------- */

const LOAD = 'LOAD_STRUGGLES'


/* --------------    ACTION CREATORS    ----------------- */


const load = struggles => {
	console.log('in load',struggles);
	return ({type: LOAD, struggles})}


/* ------------------    REDUCER    --------------------- */

export default function reducer (struggles = [], action) {
  console.log('in reducer', action)
  var struggles1 = struggles.slice(0);
  switch (action.type) {

    case LOAD:
    	return action.struggles

    default:
      return struggles1;
  }
}

export const loadStrug = () => dispatch =>{
	return axios.get('/strugg/all')
	    .then(res=>res.data)
		.then(str=>{
			console.log('in loadStrug',str)
			dispatch(load(str))
		})
}

