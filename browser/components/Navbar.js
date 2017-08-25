import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
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
          <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
          </ul>
          <span className="navbar-text">
              Person
          </span>
          </div>
        </nav>
      </div>
    );
  }
}
