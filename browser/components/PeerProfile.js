import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {add, load} from '../redux/messages.js';
import socket from '../clientSocket';
import {loadPers, addPers} from '../redux/personal.js'
import {addFr} from '../redux/friends.js'
import {loadDesc,addDesc} from '../redux/description.js'
import {loadProfile} from '../redux/profile.js'

class PeerProfile extends Component {

  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescSubmit = this.onDescSubmit.bind(this);
  }

  componentDidMount(){

    if(this.props.person){
      this.props.loadPers(this.props.person);
      this.props.loadProf(this.props.person)
    }
  }

  /*componentWillReceiveProps(nextProps){
      if(this.props.profile!==nextProps.profile){
        console.log('REC PROPS');
        this.props.loadPers(nextProps.person)
        this.props.loadProf(nextProps.person);
      }
      
  }*/

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
    var user = this.props.profile;
    console.log('PROPS',this.props);
    return(
      
      <div className='center'>
      <h1>Peer Profile</h1>
      {user &&
        <div>
        <div>
          <h1 className='medblue'>{this.props.profile.alias}</h1>
          {
            this.props.profile.tags.map((tag)=>{
              return(<button type="button" className='btn btn-secondary space'>{tag}</button>);
            })
          }
        </div> 
        <br/>
        <br/>
            <h4>About Me:</h4>    
          <br/>
          <p>{this.props.profile.description}</p>
          <br/>
          </div>
        }
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
            description: state.description,
            person: ownProps.match.url.split('/')[2],
            profile: state.profile})};

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
    },
    loadProf(id){
      dispatch(loadProfile(id))
    }

});
 




export default connect(mapState, mapDispatch)(PeerProfile);