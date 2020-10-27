const express = require('express')
const router = express.Router()
const indexController = require('./controller/indexController')
const characterControler = require('./controller/characterController')

router.get('/', (req, res) => {
	indexController.homePage(req, res)
})

router.get('/characters/', (req, res) => {
	characterControler.getCharacters(req, res)
})

router.post('/characters', (req, res) => {
	characterControler.createAllCharacters(req, res)
})

router.get('/characters/:name', (req, res) => {
	characterControler.getCharacterData(req, res)
})

// router.put('/characters/:name', (req, res) => {
// 	characterControler.createCharacter(req, res)
// })

module.exports = router

