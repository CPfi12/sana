import io from 'socket.io-client';
import store from './redux/store.js';
import {load} from './redux/messages';

const socket = io(window.location.origin);
console.log('IN DA FE SOCKET FILE');

socket.on('connect', () => {

  console.log('I am now connected to the server!');

  socket.on('message', function(room){
  	    console.log('console has received message');
  		store.dispatch(load(room))
  })
});

export default socket;