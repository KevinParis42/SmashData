const got = require('got')

function getCharMoves(move) {
	const classNames = ["movename", "startup", "totalframes", "landinglag", "notes", "basedamage", "shieldlag", "shiedlstun", "wichhitbox", "advantage", "activeframes"]
	let moves = {}
	for (className of classNames) {
		let data = move.match(`<div class="${className}">.*?</`, 'g')
		if (data) {
			data = data[0]
			data = data.replace(`<div class="${className}">`, '')
			data = data.replace('</', '')
			console.log(data)
		}
	}
	console.log('=-=-=-=-=-=-=-=-=-=-=-')
}

exports.getCharPage =  async function(charName) {
	const options = {
		'method': 'GET',
		'url': `https://ultimateframedata.com/${charName}.php`,
		'headers': {
			'authority': 'ultimateframedata.com',
			'cache-control': 'max-age=0',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'sec-fetch-dest': 'document',
			'referer': 'https://ultimateframedata.com/',
			'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
		}
	}
	const charData = {}
	const response = await got(options)
	.catch(error => {
		return false
	})
	if (!response) return 'error with the request'
	const html = response.body.replace(/[\t\n\r]/g, '')
	const moveData = html.match(/<div class="movecontainer">.*?<\/div><\/div>/g)
	.map(elem => {
		getCharMoves(elem)
	})
}

function trimName(elem) {
	let name = elem.replace(/<div class="charactericon /g, '')
	name = name.replace(/">/g, '')
	return name
}

exports.getAllChars = async function() {
	const options = {
		'method': 'GET',
		'url': 'https://ultimateframedata.com/',
		'headers': {
		'authority': 'ultimateframedata.com',
		'cache-control': 'max-age=0',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'navigate',
		'sec-fetch-user': '?1',
		'sec-fetch-dest': 'document',
		'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
		}
	}
	const response = await got(options)
	.catch(error => {
		return false
	})
	const html = response.body.replace(/[\t\n\r]/g, '')
	const names = []
	html.match(/<div class="charactericon (?!stats)\w*">/g)
	.map(elem => {
		names.push(trimName(elem))
	})
	return names.sort()
}