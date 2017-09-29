const router = require('express').Router();
const User = require('../../db/models/users.js');
const Struggle = require('../../db/models/struggle.js')
const alias = ['Arendal', 'Bergen', 'Bodø', 'Drammen', 'Egersund', 'Farsund', 'Flekkefjord', 'Florø', 'Fredrikstad', 'Gjøvik'];

router.get('/', function(req,res,next){
	res.send('getting a user');
})

router.post('/login', function(req, res, next){
	User.findOne({
		where:{
			name: req.body.name,
			password: req.body.password
		},
		include: [Struggle]
	})
	.then((user)=>{
		if(user){
			req.session.userId = user.id;
			res.send(user);
		}
		else
			res.sendStatus(400);
	})
	.catch(next);
})

router.get('/onLoad', function(req, res, next){
	if(req.session.userId){
		User.findOne({
			where:{
				id: req.session.userId
			}
		})
		.then((user)=>{
			res.send(user);
		})
		.catch(next);
	} else{
		res.send("not found");
	}
})

router.post('/remove', function(req,res,next){
	req.session.userId = null;
	res.send('removed!')
})

router.post('/signup', function(req,res,next){
	User.create(req.body)
		.then((user)=>{
			req.session.userId = user.id;
			var undercov = alias[user.id-1];
			return user.update({alias: undercov})
		})
		.then((user)=>{
			res.send(user);
		})
		.catch(next);
})

module.exports = router;