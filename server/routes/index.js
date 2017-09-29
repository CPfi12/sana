const router = require('express').Router();
const Struggle = require('../../db/models/struggle.js')

router.get('/test', (req, res, next)=>{
	Struggle.findOrCreate({where: {topic: 'sdepold'}})
		.then((th)=>{
			res.send('ble');
		})
		.catch(next);
		
})

module.exports = router; 