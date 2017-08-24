import React, { Component } from 'react';


export default class Login extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
       <h1>Login HERE</h1>
       <form>
        <label>
            Login
            <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}