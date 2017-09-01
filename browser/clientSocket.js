import io from 'socket.io-client';
import store from './redux/store.js';
import {load} from './redux/messages';
import {loadChats} from './redux/chat';

const socket = io(window.location.origin);
console.log('IN DA FE SOCKET FILE');

var userId;

socket.on('connect', () => {

  console.log('I am now connected to the server!');

  socket.on('message', function(room){
  	    console.log('console has received message');
  		store.dispatch(load(room))
  })

  socket.on('add-chat', function(){
  	 console.log('3!!!!')
     store.dispatch(loadChats())
  })

  socket.on('have-user', function(user){
  	 userId = user.id;
  	 console.log('User with id '+ userId + ' is connected to socket ' + socket.id)
  	 
  });

  socket.on('toggle', function(){
  	store.dispatch(loadChats());
  })

});

export default socket;

//have isOnline in model

//onLogin,
// dispatch to updatebackend 
// put user in clientSocket
// emit a load sidebar 
//on Disconnect, dispatch thunk that updates backend
//then emit a load sidebar
//broadcast load siebar
//