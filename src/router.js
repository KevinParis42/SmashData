const express = require('express')
const router = express.Router()
const indexController = require('./controller/indexController')
const personnageControler = require('./controller/personnageController')

router.get('/', (req, res) => {
	indexController.homePage(req, res)
})

router.get('/characters/', (req, res) => {
	personnageControler.getCharacters(req, res)
})

router.get('/characters/:name', (req, res) => {
	personnageControler.getCharacterData(req, res)
})

router.put('/characters/:name', (req, res) => {
	personnageControler.createCharacter(req, res)
})

module.exports = router

