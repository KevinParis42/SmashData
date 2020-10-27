const mysql = require('mysql')

const dbConnect = function() {

	const db = mysql.createConnection({
		host : 'db4free.net',
		user : 'adminsmash',
		password : 'adminSmash',
		database : 'smashdata'
	})
	db.connect()
	console.log('connected')

	return db
}

exports.createCharDb = function(name) {
	const db = dbConnect()
	return new Promise((resolve, reject) => {
		db.query('INSERT INTO characters SET name=?', name, (err, res, field) => {
			if (err) {
				db.destroy()
				reject(err)
			}
			else {
				db.destroy()
				resolve(res)
			}
		})
	})
}

exports.getAllCharsDb = function() {
	const db = dbConnect()
	return new Promise((resolve, reject) => {
		db.query('SELECT * FROM characters', (err, res, field) => {
			if (err) {
				db.destroy()
				reject(err)
			}
			else {
				db.destroy()
				resolve(res)
			}
		})
	})
}
