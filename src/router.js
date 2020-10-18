const express = require('express')
const router = express.Router()
const indexController = require('./controller/indexController')
const personnageControler = require('./controller/personnageController')

router.get('/', (req, res) => {
	indexController.homePage(req, res)
})

router.get('/perso/:name', (req, res) => {
	personnageControler.getCharacterData(req, res)
})

module.exports = router

