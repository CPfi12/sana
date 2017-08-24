import React, { Component } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home.js'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class Main extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log('render???')
    return (
      <div>
        <Router>
      
            <Navbar/>
        </Router>
        <Router>
          <Switch>
              <Route exact path="/login" component={Login} />
              <Route component={Home} />
          </Switch>
       </Router>
      </div>
    );
  }
}
