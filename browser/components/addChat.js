import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {loadBuds} from '../redux/buds.js';
import {addChat} from '../redux/chat.js';

class AddChat extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    console.log('MOUNTING', this.props)
    this.props.getBuds();
  }

  render () {
    var peer = this.props.possBuds.filter((bud)=> (bud.role==='Peer Counselor'));
    var med = this.props.possBuds.filter((bud)=> (bud.role==='Healthcare Professional')); 
    return (
      <div>
        <span className='role'>Peer Counselors</span>
        <ul>
        {
          peer.map((bud)=>{
            return (<li onClick={()=>{this.props.addNewChat(bud.id)}} key={bud.id}><a> {bud.alias} </a> </li>)
          })
        }
        </ul>
        <span className='role'>Healthcare Professional</span>
        <ul>
        {
          med.map((bud)=>{
            return (<li onClick={()=>{this.props.addNewChat(bud.id)}} key={bud.id}><a> {bud.alias} </a></li>)
          })
        }
        </ul>
        
        
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
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




export default connect(mapState, mapDispatch)(AddChat);


