const mysql = require('mysql')

const dbConnect = function() {

	const db = mysql.createConnection({
		host : process.env.DB_HOST,
		user : process.env.DB_USER,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_NAME
	})
	db.connect()
	//console.log('connected')

	return db
}

exports.createAndUpdate = function(id, name) {
	const db = dbConnect()
	return new Promise((resolve, reject) => {
		db.query('INSERT INTO characters SET id=?, name=? ON DUPLICATE KEY UPDATE name=?', [id, name, name], (err, res, field) => {
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
