import React, { Component } from 'react';


export default class Login extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
      <h3> Log In </h3>
       <form>
        <label>
            Name:
            <input type="text" name="name" />
        </label>
         <label>
            Password:
            <input type="text" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}