const router = require('express').Router();
const User = require('../../db/models/users.js');
const Struggles = require('../../db/models/struggle.js');
const secrets = require('../../secret.js');
const Promise = require('bluebird');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': secrets.username,
  'password': secrets.password,
  'version_date': '2017-02-27'
});

router.get('/',(req,res,next)=>{
	var parameters = {
        'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
        'features': {
        'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 10
    },
        'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 10
    }
  }
}
User.findById(1)
	.then((user)=>{
		let x = 'hi';
		natural_language_understanding.analyze(parameters, function(err, response) {
  				if (err)
    				console.log('error:', err);
  				else{
    				//x = JSON.stringify(response, null, 2);
    				console.log('x', x[0]);
    				//console.log('user', user)
    				user.update({description: response.language})
    					.then((newUser)=>{
    						console.log('should have updated!!!')
    						res.send(response);
    					})
  				}
		});
	})
	

})

router.post('/newDescription', (req,res,next)=>{
	let user = User.findById(req.session.userId);
	let struggles = Struggles.findAll();
	let parameters = {'text':req.body.description,'features':{'keywords':{'limit':2}}};
	Promise.all([user,struggles])
		.spread((user,struggles)=>{
			let struggs = struggles.map((strugg)=>strugg.topic);
			natural_language_understanding.analyze(parameters, function(err, response) {
  				if (err)
    				console.log('error:', err);
  				else{
  					let newStrugg = [];
  					let foundStrugs = response.keywords.map((keywordObj)=>keywordObj.text);
  					console.log(foundStrugs);
  					for(var i=0;i<struggs.length;i++){
  						for(var j=0;j<foundStrugs.length;j++){
  							if(foundStrugs[j]===struggs[i]){
  								newStrugg.push(foundStrugs[j]);
  							}
  						}
  					}
    				user.update({description: req.body.description, tags: newStrugg})
    					.then((newUser)=>{
    						res.send(req.body.description);
    					})
  				}
		});
		})
})

module.exports = router;