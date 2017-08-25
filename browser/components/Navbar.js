import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log('RERENDING NAV', this.props.currentUser);
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to='/'>Name</Link>
            </div>
          <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
          </ul>
          
          {!this.props.currentUser ?
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
            :
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#"><span className="glyphicon glyphicon-log-out"></span> Sign Out</a></li>
                <li><span className="navbar-text">{this.props.currentUser.name}</span></li>
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
  return ({ currentUser: state.auth })};

const mapDispatch = dispatch => {return ({})};




export default connect(mapState, mapDispatch)(Navbar);