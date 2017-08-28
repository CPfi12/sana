import io from 'socket.io-client';

const socket = io(window.location.origin);
console.log('IN DA FE SOCKET FILE');

socket.on('connect', () => {

  console.log('I am now connected to the server!');

});

export default socket;