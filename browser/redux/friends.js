import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const ADD = 'ADD_FRIENDS'

/* --------------    ACTION CREATORS    ----------------- */

export const addFr = fr => ({ type: ADD, fr });


/* ------------------    REDUCER    --------------------- */

export default function reducer (friends = [], action) {
  let newF = friends.slice(0);
  switch (action.type) {

    case ADD:
        newF.push(action.fr);
      	return newF;

    default:
      return newF;
  }
}

