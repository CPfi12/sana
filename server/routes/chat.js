const router = require('express').Router();
const User = require('../../db/models/users.js');


router.get('/loadBuds', function(req, res, next){
	console.log(req.session.userId);
	User.findAll({
		where:{
			id: {
				$ne: req.session.userId
			},
			role: {
				$ne: 'Student'
			}
		}
	})
	.then((buds)=>{
		res.send(buds);
	})
})
module.exports =  router;