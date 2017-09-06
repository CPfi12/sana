const Sequelize = require('sequelize');

var db = require('../db.js');

const User = db.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
  alias: Sequelize.STRING,
  isOnline: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: true
  },
  tags:{
  	type: Sequelize.ARRAY(Sequelize.STRING),
  	defaultValue: [],
  	set(tag) {
      let list = this.getDataValue('tags').slice();
      if(list.indexOf(tag)===-1)
      	list.push(tag);
      else{
      	let index = list.indexOf(tag);
      	list.splice(index,1)
      }
      this.setDataValue('tags', list);
    },
  }
  //role: Sequelize.ENUM('Student', 'Peer Counselor', 'Healthcare Professional', 'Admin')
})

//User.hasOne(Chat);
console.log(User);
module.exports = User;