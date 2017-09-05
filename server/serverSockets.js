
let socketId = {};
let axios = require('axios');
let User = require('../db/models/').User

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');
    socket.on('disconnect', function(){
        console.log('I out', socket.id, socketId[socket.id] );
        User.findById(socketId[socket.id])
        .then((user)=>{
            console.log('USER', user)
            return user.update({isOnline: !user.isOnline})
        })
        .then((updatedUser)=>{
            console.log('update!')
            io.emit('toggle');
        })
        .catch(console.err);
    })
    socket.on('message', room => {
    	
      socket.broadcast.to(room).emit('message', room)
    });

    socket.on('joinRoom', function(roomName){
    	socket.join(roomName);
    	console.log('joined room:', roomName)
    })

    socket.on('to', function(th){
        console.log('got', th)
    })

    socket.on('add-chat', function(){
    	//socket.broadcast.emit('add-chat');
    	socket.broadcast.emit('add-chat');
    })

    socket.on('have-user', function(user){
        console.log('BACKEND', user.isOnline, user.id)
        socketId[socket.id] = user.id;
        console.log(socketId);
        socket.emit('have-user', user)
        
    })

    socket.on('toggle', function( ){
        io.emit('toggle')
    })
    

  });

};