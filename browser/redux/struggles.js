import axios from 'axios';
import { browserHistory } from 'react-router';
import socket from '../clientSocket';
/* ------------------    ACTIONS    --------------------- */

const LOAD = 'LOAD_STRUGGLES'


/* --------------    ACTION CREATORS    ----------------- */


const load = struggles => {
	return ({type: LOAD, struggles})
}


/* ------------------    REDUCER    --------------------- */

export default function reducer (struggles = [], action) {
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
			dispatch(load(str))
		})
		.catch(console.err);
}

