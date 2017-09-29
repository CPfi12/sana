import io from 'socket.io-client';
import store from './redux/store.js';
import {load} from './redux/messages';
import {loadChats} from './redux/chat';

const socket = io(window.location.origin);


var userId;

socket.on('connect', () => {

  socket.on('message', function(room){
  		store.dispatch(load(room));
  })

  socket.on('add-chat', function(){
     store.dispatch(loadChats());
  })

  socket.on('have-user', function(user){
  	 userId = user.id;
  	 console.log('User with id '+ userId + ' is connected to socket ' + socket.id);
  	 
  });

  socket.on('toggle', function(){
  	store.dispatch(loadChats());
  })

});

export default socket;

