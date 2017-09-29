import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------    ACTIONS    --------------------- */

const CHANGE = 'CHANGE_FILTER'

/* --------------    ACTION CREATORS    ----------------- */

export const change = tag => ({ type: CHANGE, tag });


/* ------------------    REDUCER    --------------------- */

export default function reducer (filter = [], action) {
  let newFilter = filter.slice(0);
  switch (action.type) {
    case CHANGE:
        if(filter.indexOf(action.tag)===-1)
          filter.push(action.tag)
        else{
          let index = filter.indexOf(action.tag);
          filter.splice(index,1);
        }
      	return filter;
    default:
      return newFilter;
  }
}

