import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {add, load} from '../redux/messages.js';
import socket from '../clientSocket';


class Chat extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    this.props.loadMessages(this.props.room);
    socket.emit('joinRoom', this.props.room);
  }

  componentWillReceiveProps(nextProps){
      if(this.props.room!==nextProps.room){
        this.props.loadMessages(nextProps.room);
        socket.emit('joinRoom', nextProps.room);
      }
  }


  render () { 
    let budName='';
    if(this.props.room && this.props.currentUser){
      let roomName = this.props.room.split('_');
      budName = (roomName[0]===this.props.currentUser.alias) ? roomName[1] : roomName[0]; 
    }
    return(
      <div>
      <h3>{budName}</h3>
      <div id='chatchat' className='chat'> 
      <ul>
      {
        this.props.messages.map((message)=>{
          return (
                <div key={message.id}>
                  <li className='chatMess'><span className='authorName'>{message.authorAlias}:</span></li>
                  <li className='chatMess'><span className='authorMess'> {message.content}</span></li>
                </div>
               )
              
        })
      }
      </ul>
      </div>
        <form onSubmit={(evt)=>{this.props.onSubmit(evt, this.props.currentUser.alias, this.props.room)}}>
          <label className='role'>
          Message:
              <input type="text" name="mess" className='form-control'/>
          </label>
          <input type="submit" value="Submit" className='btn btn-info space'/>
        </form>
     </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state, ownProps) => {
  return ({ currentUser: state.auth,
  messages: state.messages,
  room: ownProps.match.url.split('/')[2] })};

const mapDispatch = function (dispatch) {
  return {
    onSubmit: (evt, userName, room) =>{
      evt.preventDefault();
      var message = {authorAlias: userName, content: evt.target.mess.value}
      evt.target.mess.value = '';
      dispatch(add(message, room));
    },
    loadMessages: (room) =>{
      dispatch(load(room));
    }
  };
};




export default connect(mapState, mapDispatch)(Chat);


