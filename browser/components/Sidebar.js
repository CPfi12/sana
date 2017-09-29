import React, { Component } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
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
                let Mentor = chat.Mentor;
                let Mentee = chat.Mentee;
                let budObj = (Mentee.alias===name) ? Mentee : Mentor;
                if(this.props.friends.indexOf(budObj.name)!==-1)
                  name+='**'
                let status = (budObj.isOnline) ? '+' : '-';
                let classNom = (status==='+') ? 'online' : 'offline'; 
                var exp = `/chat/${chat.thing}`
                return (<li key={chat.thing} className={classNom}><NavLink to={exp}><span className='buds'>{name}</span></NavLink></li>) 
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
            currentChats: state.chat,
            friends: state.friends})};

const mapDispatch = dispatch => ({
      loadingChats: ()=>{
        dispatch(loadChats());
      }
})




export default withRouter(connect(mapState, mapDispatch)(Sidebar));