import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {add, load} from '../redux/messages.js';
import socket from '../clientSocket';
import {loadPers, addPers} from '../redux/personal.js'

class Profile extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    if(this.props.currentUser)
      this.props.loadPers(this.props.currentUser.id);
  }

  componentWillReceiveProps(nextProps){
    console.log('RECEIVING THE PROPS')
      if(this.props.currentUser!==nextProps.currentUser){
        this.props.loadPers(nextProps.currentUser.id)
      }
  }


  render () {
    console.log('PROFIL PROPS',this.props)
    var user = this.props.currentUser;
    return(
      
      <div className='center'>
      {user &&
        <div>
         <h1>{this.props.currentUser.name}</h1>
          <h4 className='medblue'>Alias:{this.props.currentUser.alias}</h4>
          {
            this.props.struggles.map((strug)=>{
              var btnType = (this.props.pers.indexOf(strug.topic)!==-1) ? 'btn btn-primary space' : 'btn btn-secondary space';
              console.log('btnType', btnType)
              return(<button type="button" onClick={()=>{this.props.addPers(this.props.currentUser.id,strug.id)}} className={btnType}>{strug.topic}</button>);
            })
          }
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
            pers: state.pers})};

const mapDispatch = (dispatch) => ({
    loadPers(info) {
      dispatch(loadPers(info));
    },
    addPers(user,strug){
      dispatch(addPers(user,strug))
    }

});
 




export default connect(mapState, mapDispatch)(Profile);
