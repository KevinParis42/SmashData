const express = require('express')
const app = express()
const router = require('./router')

app.use('/', router)

app.listen(3000, () => {
	console.log(`app launched on port 3000`)
})