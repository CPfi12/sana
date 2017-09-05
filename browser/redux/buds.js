import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const GET = 'GET_BUDS'

/* --------------    ACTION CREATORS    ----------------- */

const get = buds => ({ type: GET, buds });


/* ------------------    REDUCER    --------------------- */

export default function reducer (buds = [], action) {
  switch (action.type) {

    case GET:
      	return action.buds;

    default:
      return buds;
  }
}

export const loadBuds = () => dispatch =>{
	return axios.get('/chat/loadBuds')
	    .then(res=>res.data)
		.then(buds=>{
			dispatch(get(buds))
		})
}




