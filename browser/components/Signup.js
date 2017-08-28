import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {signin} from '../redux/auth.js';


class Signup extends Component {

  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt){

    evt.preventDefault();
    console.log('onSubmit!');
    let info = {
      name: evt.target.name.value,
      password: evt.target.pass.value,
      role: evt.target.role.value,
    }
    evt.target.name.value = '';
    evt.target.pass.value = '';
    console.log('info!', info)
    this.props.signUpFn(info);
  }


  render () {
    console.log('Rendering with ', this.props.currentUser, this.props);
    return (
      <div>
      {!this.props.currentUser ? 
      (<div>
      <h3> Sign Up {this.props.currentUser}</h3>
     
       <form onSubmit={this.onSubmit}>
        <label>
            Name:
            <input type="text" name="name" />
        </label>
         <label>
            Password:
            <input type="text" name="pass" />
        </label>
        <label>
            Role:
            <select name="role">
              <option value="Student">Student</option>
              <option value="Peer Counselor">Peer Counselor</option>
              <option value="Healthcare Professional">Healthcare Professional</option>
              <option value="Admin">Admin</option>
            </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>) :
      (<h1>{this.props.currentUser.name}</h1>)}
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  console.log(state)
  return ({ currentUser: state.auth })};

const mapDispatch = function (dispatch) {
  return {
    signUpFn(info) {
      dispatch(signin(info));
    }
  };
};




export default connect(mapState, mapDispatch)(Signup);


