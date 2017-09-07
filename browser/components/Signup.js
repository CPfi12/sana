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
      (<div className='center'>
      <h3> Sign Up {this.props.currentUser}</h3>
     
       <form onSubmit={this.onSubmit}>
        <label>
            Name:
            <input type="text" name="name" className='form-control'/>
        </label>
        <br/>
         <label>
            Password:
            <input type="text" name="pass" className='form-control'/>
        </label>
        <br/>
        <label>
            Role:
            <select name="role" className='form-control'>
              <option value="Student">Student</option>
              <option value="Peer Counselor">Peer Counselor</option>
              <option value="Healthcare Professional">Healthcare Professional</option>
              <option value="Admin">Admin</option>
            </select>
        </label>
        <br/>
        <input type="submit" value="Submit" className='btn btn-primary'/>
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


