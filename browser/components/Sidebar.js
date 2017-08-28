import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Sidebar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    
    return (
      <div id="sidebar-wrapper">
       <sidebar>
        <section>
          <h4 className="menu-item">
            CHATS
          </h4>
        </section>
        
      </sidebar> 
        
    </div>
    )
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  return ({ currentUser: state.auth })};

const mapDispatch = dispatch => ({})




export default connect(mapState, mapDispatch)(Sidebar);