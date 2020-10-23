const got = require('got')

const charName = 'incineroar'
var options = {
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
};

async function getHtmlPage(options) {
	const response = await got(options)
	const html = response.body.replace(/[\t\n\r]/g, '')
	const regex = new RegExp('<div class="movecontainer">.*?<\/div><\/div>', 'g')
	const moveData = html.match(regex)
	.map(elem => {
		const classNames = ["movename", "startup", "totalframes", "landinglag", "notes", "basedamage", "shieldlag", "shiedlstun", "wichhitbox", "advantage", "activeframes"]
		for (className of classNames) {
			let data = elem.match(`<div class="${className}">.*?</`, 'g')
			if (data) {
				data = data[0]
				data = data.replace(`<div class="${className}">`, '')
				data = data.replace('</', '')
				console.log(className +' : ' + data)
			}
		}
		console.log('_-_-_-_-_-_-_-_')
	})
}

getHtmlPage(options)
