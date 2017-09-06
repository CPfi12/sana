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
      {!this.props.currentUser ? 
      (<div className='center'>
      <h3> Log In {this.props.currentUser}</h3>
     
       <form onSubmit={this.onSubmit}>
        <label>
            Name:
            <input type="text" name="name" className='form-control' />
        </label>
        <br/>
         <label>
            Password:
            <input type="text" name="pass" className='form-control' />
        </label>
        <br/>
        <input type="submit" value="Submit" className='btn' />
      </form>
      </div>) :
      (<h1>Welcome {this.props.currentUser.name}!</h1>)}
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
    loginFn(info) {
      dispatch(login(info));
    }
  };
};




export default connect(mapState, mapDispatch)(Login);


