const mysql = require('mysql')

const dbConnect = () => {

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

const createChar = () => {
	const db = dbConnect()

	let data = ['incineroar']

	console.log('trying to query')
	db.query('INSERT INTO characters SET name=?', data, (err, user, field) => {
		if (err) throw err
	})
}

createChar()
