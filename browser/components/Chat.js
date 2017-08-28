import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {loadBuds} from '../redux/buds.js';
import {addChat} from '../redux/chat.js';

class Chat extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    console.log('MOUNTING', this.props)
    this.props.getBuds();
  }

  render () {
      <div>
        <input placeholder={'type here!'}/>
        
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  console.log(state)
  return ({ possBuds: state.buds })};

const mapDispatch = function (dispatch) {
  return {
    getBuds: () =>{
      dispatch(loadBuds())
    },
    addNewChat: (mentorId)=>{
      dispatch(addChat(mentorId))
    }
  };
};




export default connect(mapState, mapDispatch)(Chat);


