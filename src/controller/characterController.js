const Character = require('../model/CharacterModel')
const scrapingService = require('../services/scrappingService')

exports.getCharacters = async function(req, res) {
	const characters = await scrapingService.getAllChars()
	res.send(characters)
}

exports.createCharacter = async function(req, res) {
	const character = await Character.createChardb(req.params.name)
	res.send(character)
}

exports.getCharacterData = function(req, res) {
	res.send('comming soon')
}