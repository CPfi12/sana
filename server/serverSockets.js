
let socketId = {};
let axios = require('axios');
let User = require('../db/models/').User

module.exports = io => {

  io.on('connection', socket => {

    socket.on('disconnect', function(){
        if(socketId[socket.id]){
            User.findById(socketId[socket.id])
                .then((user)=>{
                    return user.update({isOnline: !user.isOnline})
                })
                .then((updatedUser)=>{
                    io.emit('toggle');
                })
                .catch(console.err);
        }
    })

    socket.on('message', room => {	
      socket.broadcast.to(room).emit('message', room)
    });

    socket.on('joinRoom', function(roomName){
    	socket.join(roomName);
    	console.log('joined room:', roomName)
    })

    socket.on('add-chat', function(){
    	socket.broadcast.emit('add-chat');
    })

    socket.on('have-user', function(user){
        socketId[socket.id] = user.id;
        socket.emit('have-user', user)
        
    })

    socket.on('toggle', function( ){
        io.emit('toggle')
    })
    

  });

};