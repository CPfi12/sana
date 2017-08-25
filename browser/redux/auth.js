import axios from 'axios';

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
    	console.log('action.user', action.user)
      //return action.user;
      	return action.user;

    case REMOVE:
      return null;

    default:
      return currentUser;
  }
}

export const logout = user => dispatch =>{
	return axios.post('/auth/remove')
		.then(res=>res.data)
		.then(res=>{
			console.log(res);
			dispatch(remove())
		})
}

export const load = user => dispatch => {
	return axios.get('/auth/onLoad')
		.then(res=>res.data)
		.then(user=>{
			dispatch(set(user));
		})
}

export const login = credentials => dispatch => {
  return axios.post('/auth/login', credentials)
  .then(res=>res.data)
  .then(user => {
  	console.log('got a user!!')
    dispatch(set(user));
    
  });
};