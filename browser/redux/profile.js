import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const GET = 'GET_PROFILE'

/* --------------    ACTION CREATORS    ----------------- */

const get = profile => ({ type: GET, profile });


/* ------------------    REDUCER    --------------------- */

export default function reducer (profile = null, action) {
  let profileNew = profile ? Object.assign({}, profile): null;
  switch (action.type) {

    case GET:
      	return action.profile;

    default:
      return profileNew;
  }
}

export const loadProfile = (id) => dispatch =>{
	return axios.get(`/profile/${id}`)
	    .then(res=>res.data)
		.then(profile=>{
			dispatch(get(profile))
		})
}
