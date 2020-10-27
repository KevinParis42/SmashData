const Character = require('../model/CharacterModel')
const scrapingService = require('../services/scrappingService')

exports.getCharacters = async function(req, res) {
	const characters = await scrapingService.getAllChars()
	res.send(characters)
}

// exports.createCharacter = async function(req, res) {
// 	const character = await Character.createAndUpdateCharDb(req.params.name)
// 	res.send(character)
// }

exports.createAllCharacters = async function(req, res) {
	const characters = await scrapingService.getAllChars()
	let id = 1
	for (character of characters) {
		Character.createAndUpdateCharDb(id++, character)
	}
	res.json(characters)
}

exports.getCharacterData = function(req, res) {
	res.send('comming soon')
}