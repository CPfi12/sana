import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home.js'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { load } from '../redux/auth';

class Main extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.load();
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

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  load: () => {
    dispatch(load());
  }
});

export default connect(mapProps, mapDispatch)(Main);