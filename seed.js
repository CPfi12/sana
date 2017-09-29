const Struggle = require('./db/models/struggle.js');
const Promise = require('bluebird');

const strug = [
	{topic:'Anxiety',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Depression',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Gender Identity',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Sexuality',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Divorce',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Economic Insecurity',createdAt:Date.now(),updatedAt:Date.now()},
	{topic:'Immigration Status',createdAt:Date.now(),updatedAt:Date.now()}
]

var promiseStrug = strug.map((str)=>Struggle.create(str));
Promise.all(promiseStrug)
	   .then((allDone)=>{
	   		console.log('added!');
	   })
	   .catch(console.err)

