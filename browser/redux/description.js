import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const GET = 'GET_DESC'

/* --------------    ACTION CREATORS    ----------------- */

const get = desc => ({ type: GET, desc });


/* ------------------    REDUCER    --------------------- */

export default function reducer (desc = '', action) {
  let newDesc = desc.slice(0);
  switch (action.type) {

    case GET:
    console.log('REDUCER DESC',action.desc)
      	return action.desc;

    default:
      return newDesc;
  }
}

export const loadDesc = () => dispatch =>{
  console.log('loading desc!!!!')
	return axios.get('/description')
	    .then(res=>res.data)
		.then(desc=>{
      console.log('DESC@@@@', desc)
			dispatch(get(desc));
		})
}

export const addDesc = (desc) => dispatch =>{
  return axios.post('/nlp/newDescription',{description: desc})
    .then(res=>res.data)
    .then(desc=>{
      dispatch(get(desc));
    })
}