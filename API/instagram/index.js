const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = {
    instagram: async (ig) => {
        const body = await ( await fetch(`https://www.instagram.com/${ig}/`) ).text()
        let $ = cheerio.load(body)

        let data = $('div.v9tJq.AAaSh.VfzDr').children().map((i, e) => {
            return {
                profile: $(e).find('span._2dbep img._6q-tv').get('src'),
                name: $(e).find('div.XBGH5 h2._7UhW9fKFbl.yUEEX.KV-D4.fDxYl').text()
            }
        }).toArray()

        console.log(data)
    }
}