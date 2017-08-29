import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {loadChats} from '../redux/chat.js';


class Sidebar extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    this.props.loadingChats();
  }

  render () {
    console.log('PROPS',this.props);
    return (
      <div id="sidebar-wrapper">
       <sidebar>
        <section>
          <h4 className="menu-item">
            CHATS
            <ul>
          {
            this.props.currentChats.map((chat)=>{
                var nameArr = chat.thing.split('_');
                var name = (nameArr[0]===this.props.currentUser.alias) ? nameArr[1] : nameArr[0];
                var exp = `/chat/${chat.thing}`
                console.log(exp);
                return (<li key={chat.thing}><NavLink to={exp}>{name}</NavLink></li>) 
            })
          }
          </ul>
          </h4>
        </section>
        
      </sidebar> 
        
    </div>
    )
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  return ({ currentUser: state.auth,
            currentChats: state.chat})};

const mapDispatch = dispatch => ({
      loadingChats: ()=>{
        console.log('in mapDispatch!')
        dispatch(loadChats());
      }
})




export default connect(mapState, mapDispatch)(Sidebar);