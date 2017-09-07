import React, { Component } from 'react';
import {login} from '../redux/auth.js';
import { connect } from 'react-redux';
import {loadBuds} from '../redux/buds.js';
import {addChat} from '../redux/chat.js';
import {change} from '../redux/filter.js';

class AddChat extends Component {

  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.contains = this.contains.bind(this);
  }

  componentDidMount(){
    console.log('MOUNTING', this.props)
    this.props.getBuds();
  }

  onSubmit(evt){
    evt.preventDefault();
    let val = evt.target.sel.value;
    console.log('ABOUT TO SUBMIT', val)
    this.props.change(val);

  }

  contains(a,b){
      var obj={};
        for(var i=0;i<b.length;i++){
            obj[b[i]]=obj[b[i]]||0;
            obj[b[i]]++;
        }
        for(var i=0;i<a.length;i++){
            if(obj[a[i]])
            obj[a[i]]--
        }
        for(var key in obj){
            if(obj[key]>0)
            return false
        }
        return true;
  }

  render () {
    var peer, med;
    if(this.props.filter.length>0){
        peer = this.props.possBuds.filter((bud)=> (bud.role==='Peer Counselor'&&this.contains(bud.tags,this.props.filter)));
        med = this.props.possBuds.filter((bud)=> (bud.role==='Healthcare Professional'&&this.contains(bud.tags,this.props.filter))); 
    }
    else{
        peer = this.props.possBuds.filter((bud)=> (bud.role==='Peer Counselor'));
        med = this.props.possBuds.filter((bud)=> (bud.role==='Healthcare Professional')); 
    }

    return (
      <div className='row'>
      
      <div className='col-xs-4'>
        <span className='role'>Peer Counselors</span>
        <ul>
        {
          peer.map((bud)=>{
            return (<li className='bud-list' onClick={()=>{this.props.addNewChat(bud.id)}} key={bud.id}><a><span className='bud-list'> {bud.alias} </span></a> </li>)
          })
        }
        </ul>
        <span className='role'>Healthcare Professional</span>
        <ul>
        {
          med.map((bud)=>{
            return (<li onClick={()=>{this.props.addNewChat(bud.id)}} key={bud.id}><a className='bud-list'><span className='bud-list'> {bud.alias}</span></a></li>)
          })
        }
        </ul> 
      </div>
      <div className='col-xs-4'>
        <form onSubmit={this.onSubmit}>
        <label className='role'>
          Sort by:
          <select name='sel'>
            {
              this.props.struggles && this.props.struggles.map((strug)=>{
                return (<option value={strug.topic}>{strug.topic}</option>)
              })
            }  
          </select>
        </label>
        <input type="submit" value="Submit" className='btn btn-primary space'/>
      </form>
      {
        this.props.filter.length ? this.props.filter.map((topic)=>{
          return(<div><button onClick={()=>{this.props.change(topic)}} className='btn btn-info'>{topic} X </button></div>)
        }) : null
      }
      </div>
      </div>
    );
  }
}

//----------- CONTAINER ------------
const mapState = (state) => {
  return ({ possBuds: state.buds,
            struggles: state.struggles,
            filter: state.filter })};

const mapDispatch = function (dispatch) {
  return {
    getBuds: () =>{
      dispatch(loadBuds())
    },
    addNewChat: (mentorId)=>{
      dispatch(addChat(mentorId))
    },
    change: (topic)=>{
      dispatch(change(topic))
    }
  };
};




export default connect(mapState, mapDispatch)(AddChat);


