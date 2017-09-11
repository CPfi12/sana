const router = require('express').Router();
const Struggle = require('../../db/models/struggle.js')

router.get('/test', (req, res, next)=>{
	Struggle
  .findOrCreate({where: {topic: 'sdepold'}})
		.then((th)=>{
			console.log(th)
			res.send('ble');
		})
		
})

module.exports = router; 