const got = require("got");

var options = {
  method: "GET",
  headers: {
    authority: "ultimateframedata.com",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "none",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    cookie: "_ga=GA1.2.1582301942.1603039343; _gid=GA1.2.1414431306.1603039343",
  },
};

 function getValueByClassName(html, className) {
  const regex =  new RegExp(`<div class="${className}">[^<]+`, 'g')
  const movesName = html.match(regex)
  .map(elem => elem.replace(`<div class="${className}">`, ''))
  .map(elem => elem.match(/[0-9]+/) !== null &&
  elem.match(/[0-9]+/)[0].length ===  elem.length ? parseInt(elem) : elem)
  .map(elem => elem === '--' || elem === '**' ? null : elem);
  return movesName;
}

async function createObject(html) {
  const formatParams = [
    {className:"movename", name: "move"},
    {className:"startup", name: "startup"},
    {className:"totalframes", name: "totalframes"},
    {className:"landinglag", name: "landinglag"},
    {className:"notes", name: "notes"},
    {className:"basedamage", name: "basedamage"},
    {className:"shieldlag", name: "shieldlag"},
    {className:"shieldstun", name: "shieldstun"},
    {className:"whichhitbox", name: "whichhitbox"},
    {className:"advantage", name: "advantage"},
    {className:"activeframes", name: "activeframes"},
  ]
  const finalObj = {};
  formatParams.forEach((params, idx) => {
    formatParams[idx].values = getValueByClassName(html, params.className)
  })
  formatParams.forEach((params, idx) => {
    if (idx === 0) {
      params.values.forEach(value => {
        finalObj[value] = {};
      })
    }
    else {
      params.values.forEach((value, valueIdx) => {
        finalObj[Object.keys(finalObj)[valueIdx]][params.name] = value
      })
    }
  })
  return finalObj;
}

async function getPageByChar(charName){
  const localOptions = JSON.parse(JSON.stringify(options));
  localOptions.url = `https://ultimateframedata.com/${charName}.php`;
  const response = await got(localOptions);
  const cleanResponse = response.body.replace(/\n|\r|\t/g, '');
  return cleanResponse;
}

async function getInfosByChar(charName) {
  const html = await getPageByChar(charName);
  const responseObj = createObject(html);
  console.log(responseObj);
}

getInfosByChar('byleth');