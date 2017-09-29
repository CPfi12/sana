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
  description: Sequelize.TEXT,
  tags:{
  	type: Sequelize.ARRAY(Sequelize.STRING),
  	defaultValue: [],
  	set(tag) {  
      let list = this.getDataValue('tags').slice();
      if((typeof tag)==='string'){
          if(list.indexOf(tag)===-1)
      	     list.push(tag);
          else{
      	     let index = list.indexOf(tag);
      	     list.splice(index,1)
          }
          this.setDataValue('tags', list);
      }
      else{
          let newTags = list.slice();
          for(var i=0;i<tag.length;i++){
            if(list.indexOf(tag[i])===-1)
              newTags.push(tag[i]);
          }
          this.setDataValue('tags', newTags);
      }
    },
  }
})


module.exports = User;