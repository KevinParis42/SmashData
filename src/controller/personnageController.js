const Character = require('../model/CharacterModel')

exports.getCharacterData = function(req, res) {
	console.log('comming soon')
}

exports.getCharacters = async function(req, res) {
	const characters = await Character.getAllChars()
	res.send(characters)
}

exports.createCharacter = async function(req, res) {
	const character = await Character.createChar(req.params.name)
	res.send(character)
}