const Character = require('../model/Character')

exports.getCharacterData = function(req, res) {
	const data = {
		name : req.params.name,
		tier : 'bg'
	}
	const character = new Character(data)
	res.send(character.getBestOos())
	//character.bestOos()
}