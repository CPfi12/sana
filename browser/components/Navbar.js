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
              <a className="navbar-brand" href="#">Name</a>
            </div>
          <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
          </ul>
          </div>
        </nav>
      </div>
    );
  }
}
