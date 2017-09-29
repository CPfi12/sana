import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const ADD = 'ADD_FRIENDS'

/* --------------    ACTION CREATORS    ----------------- */

export const Fr = fr => ({ type: ADD, fr });


/* ------------------    REDUCER    --------------------- */

export default function reducer (friends = [], action) {
  let newF = friends.slice(0);
  switch (action.type) {
    case ADD:
      	return action.fr;
    default:
      return newF;
  }
}

export const addFr = (name) => dispatch =>{
  return axios.post('/friend',{name: name})
      .then(res=>res.data)
      .then(friends=>{
         dispatch(Fr(friends))
      })
      .catch(console.err)
}

export const getFr = (name) => dispatch =>{
  return axios.get('/friend')
     .then(res=>res.data)
     .then(friends=>{
       if(friends!=='not found')
          dispatch(Fr(friends))
     })
     .catch(console.err)
}
