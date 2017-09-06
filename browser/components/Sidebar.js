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

  /*componentWillUpdate(){
    console.log('UPDATING', this.props);
    this.props.loadingChats();
  }*/

  

  render () {
    console.log('SIDEBAR RERENDERING', this.props.currentChats);
    return (

      <div id="sidebar-wrapper">
       <sidebar>
        <section>
          <h4 className="menu-item">
            CHATS
            <ul>
          {
            //this.props.currentChats.length && this.props.currentChats.map((chat)=>{
              this.props.currentChats.map((chat)=>{
                //console.log('IN LOOP', chat)
                //console.log('chat', chat);
                var nameArr = chat.thing.split('_');
                var name = (nameArr[0]===this.props.currentUser.alias) ? nameArr[1] : nameArr[0];
                let Mentor = chat.Mentor;
                let Mentee = chat.Mentee;
                //console.log('Mentee', Mentee);
                //console.log('Mentor', Mentor);
                let budObj = (Mentee.alias===name) ? Mentee : Mentor;
                let status = (budObj.isOnline) ? '+' : '-';
                let classNom = (status==='+') ? 'online' : 'offline';
                //console.log('NAME: ', name);
                //console.log('budObj: ', budObj); 
                var exp = `/chat/${chat.thing}`
                //console.log(exp);
                //let status = '+'
                
                return (<li key={chat.thing} className={classNom}><NavLink to={exp}><span className='buds'>{name}{status}</span></NavLink></li>) 
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




export default withRouter(connect(mapState, mapDispatch)(Sidebar));