import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';

class Login extends Component {

  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt){

    evt.preventDefault();
    console.log('onSubmit!');
    let info = {
      name: evt.target.name.value,
      password: evt.target.pass.value
    }
    evt.target.name.value = '';
    evt.target.pass.value = ''
    this.props.loginFn(info);
  }


  render () {
    console.log('Rendering with ', this.props.currentUser, this.props);
    return (
      <div>
      <h3> Log In {this.props.currentUser}</h3>
       <form onSubmit={this.onSubmit}>
        <label>
            Name:
            <input type="text" name="name" />
        </label>
         <label>
            Password:
            <input type="text" name="pass" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => ({ currentUser: state.currentUser });

const mapDispatch = function (dispatch) {
  return {
    loginFn(info) {
      dispatch(login(info));
    }
  };
};




export default connect(mapState, mapDispatch)(Login);


