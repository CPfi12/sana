import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {add, load} from '../redux/messages.js';
import socket from '../clientSocket';
import {loadPers, addPers} from '../redux/personal.js'
import {addFr} from '../redux/friends.js'
import {loadDesc,addDesc} from '../redux/description.js'

class Profile extends Component {

  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescSubmit = this.onDescSubmit.bind(this);
  }

  componentDidMount(){
    console.log('MOUNTING PROFILE???')
    if(this.props.currentUser){
      this.props.loadPers(this.props.currentUser.id);
      this.props.loadDesc();
    }
  }

  componentWillReceiveProps(nextProps){
      if(this.props.currentUser!==nextProps.currentUser){
        this.props.loadPers(nextProps.currentUser.id)
        this.props.loadDesc();
      }
  }

  onSubmit(evt){
    evt.preventDefault();
    let name = evt.target.name.value;
    this.props.addFr(name);

  }

  onDescSubmit(evt){
    evt.preventDefault();
    let desc = evt.target.desc.value;
    evt.target.desc.value = '';
    this.props.addDesc(desc);
  }


  render () {
    var user = this.props.currentUser;
    console.log('PROPS',this.props);
    return(
      
      <div className='center'>
      {user &&
        <div>
         <h1>{this.props.currentUser.name}</h1>
          <h4 className='medblue'>Alias:{this.props.currentUser.alias}</h4>
          {
            this.props.struggles.map((strug)=>{
              var btnType = (this.props.pers.indexOf(strug.topic)!==-1) ? 'btn btn-primary space' : 'btn btn-secondary space';
              return(<button type="button" onClick={()=>{this.props.addPers(this.props.currentUser.id,strug.id)}} className={btnType}>{strug.topic}</button>);
            })
          }
          </div>
        } 
        <br/>
        <br/>
        <form onSubmit={this.onSubmit}>
          <label>
            Friend Name:
                <input type="text" name="name" className='form-control' />
          </label>
          <br/>
          <input type="submit" value="Submit" className='btn btn-primary' />
        </form>
        <ul>
        {
          this.props.friends.map((fr)=>{
            return(<li>{fr}</li>)
          })
        }
        </ul>
        <form onSubmit={this.onDescSubmit}>
          <label>
            About Me:    
          </label>
          <br/>
          <textarea name='desc' placeholder={this.props.description}/>
          <br/>
          <input type="submit" value="Submit" className='btn btn-primary' />
        </form>
        
        </div>
    
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state, ownProps) => {
  console.log(state)
  return ({ currentUser: state.auth,
            struggles: state.struggles,
            pers: state.pers,
            friends: state.friends,
            description: state.description})};

const mapDispatch = (dispatch) => ({
    loadPers(info) {
      dispatch(loadPers(info));
    },
    addPers(user,strug){
      dispatch(addPers(user,strug))
    },
    addFr(friend){
      dispatch(addFr(friend))
    },
    loadDesc(){
      dispatch(loadDesc());
    },
    addDesc(desc){
      dispatch(addDesc(desc));
    }

});
 




export default connect(mapState, mapDispatch)(Profile);
