module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('message', room => {
    	
      socket.broadcast.to(room).emit('message', room)
    });

    socket.on('joinRoom', function(roomName){
    	socket.join(roomName);
    	console.log('joined room:', roomName)
    })

    socket.on('add-chat', function(){
    	console.log('2!!!!!!')
    	//socket.broadcast.emit('add-chat');
    	socket.broadcast.emit('add-chat');
    })

    socket.on('have-user', function(user){
        console.log('BACKEND')
        socket.emit('have-user', user)
    })
    

  });

};