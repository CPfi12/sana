import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home.js'
import Signup from './Signup';
import Sidebar from './Sidebar';
import AddChat from './addChat';
import Chat from './Chat';
import Profile from './Profile'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { load } from '../redux/auth';
import {loadStrug} from '../redux/struggles';
import {getFr} from '../redux/friends';
import socket from '../clientSocket.js';

class Main extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    console.log('RERENDERING MAIN AT ALL????')
    this.props.load();
    this.props.loadStrug();
    console.log('MOUNTING IN MAIN')
  }

  componentWillReceiveProps(nextProps){
    console.log('CURRRRR', this.props);
    console.log('CR@@@', nextProps.currentUser);
    let first = this.props;
    let sec = nextProps.currentUser;
    console.log('first', first);
    console.log('sec',sec);
    if(first!==sec)
      this.props.loadFr();
    else
      console.log('NOOOOOOO')
           
  }

  render () {
  
    return (
      <div>
        <div className="row">
        <Router>
            <Navbar/>
        </Router>
        </div>
        <div className="row">
        {this.props.currentUser ? 
          <div className="col-xs-2 sidebar">
          <Router>
            <Sidebar/>
          </Router>
          </div> : null }
          <div className="col-xs-10">
        <Router>
          <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/addChat" component={AddChat}/>
              <Route exact path="/chat/:room" component={Chat}/>
              <Route exact path="/profile" component={Profile}/>  
              <Route component={Home} />
          </Switch>
       </Router>
        </div>
       </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return ({ currentUser: state.auth })};

const mapDispatch = dispatch => ({
  load: () => {
    dispatch(load());
  },
  loadStrug:()=>{
    dispatch(loadStrug())
  },
  loadFr:()=>{
    dispatch(getFr());
  }
});

export default connect(mapState, mapDispatch)(Main);