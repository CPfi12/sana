import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../redux/auth.js';


class Navbar extends Component {

  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this)
  }

  onClick(){
      this.props.removeUser();
  }

  render () {
    console.log('RERENDING NAV', this.props.currentUser);
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to='/'>ikke.</Link>
            </div>
          <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
          </ul>
          {this.props.currentUser ?
          <ul className="nav navbar-nav">
                <li><Link to="/addChat">Talk</Link></li>
          </ul> :
          null}
          
          {!this.props.currentUser ?
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log In</Link></li>
            </ul>
            :
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.onClick}><span className="glyphicon glyphicon-log-out"></span> Sign Out</a></li>
                <li><span className="navbar-text">{this.props.currentUser.name} ( {this.props.currentUser.alias} )</span></li>
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
    removeUser() {
      dispatch(logout());
    }
  };
};




export default connect(mapState, mapDispatch)(Navbar);