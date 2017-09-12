import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../redux/auth.js';


class Navbar extends Component {

  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this)
  }

  onClick(userId){
      this.props.removeUser(userId);
  }

  render () {
    console.log('RERENDING NAV', this.props.currentUser);
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to='/'><span id='name'>sana.</span></Link>
            </div>
          <ul className="nav navbar-nav">
                <li><Link to="/"><span>Home</span></Link></li>
          </ul>
          {this.props.currentUser ?
          <ul className="nav navbar-nav">
                <li><Link to="/addChat"><span>Talk</span></Link></li>
          </ul> :
          null}
          
          {!this.props.currentUser ?
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span><span> Sign Up</span></Link></li>
                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span><span> Log In</span></Link></li>
            </ul>
            :
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={()=>{this.onClick(this.props.currentUser.id)}}><span className="glyphicon glyphicon-log-out"></span><span>Sign Out</span></a></li>
                <li><span className="navbar-text"><Link to='/profile'><span>{this.props.currentUser.name} ( {this.props.currentUser.alias} )</span></Link></span></li>
            </ul>
          }
            
          
          
          </div>
        </nav>
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  return ({ currentUser: state.auth})};

const mapDispatch = function (dispatch) {
  return {
    removeUser(userId) {
      dispatch(logout(userId));
    }
  };
};




export default connect(mapState, mapDispatch)(Navbar);