const CharacterModel = require('../model/CharacterModel')
const scrapingService = require('../services/scrappingService')

exports.getCharacters = async function(req, res) {
	const characters = await scrapingService.getAllChars()
	res.send(characters)
}

exports.createAllCharacters = async function(req, res) {
	const characters = await scrapingService.getAllChars()
	characters.forEach((character, idx) => {
		CharacterModel.createAndUpdate(idx, character)
	})
	res.json(characters)
}

exports.getCharacterData = function(req, res) {
	scrapingService.getCharPage(req.params.name)
}