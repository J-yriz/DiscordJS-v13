const fetch = require('node-fetch');
const cheerio = require('cheerio')

module.exports = {
    dataAnime: async (anime) => {
        const body = await ( await fetch(`https://myanimelist.net/search/all?cat=all&q=${anime}`)).text()
        const $ = cheerio.load(body)

        const listAnime = $('article').children().map((i, elem) => {
            return {
                judul: $(elem).find('.hoverinfo_trigger').text().trim(),
                url: $(elem).find('.hoverinfo_trigger').attr('href')
            }
        }).toArray()
        if (listAnime.length >= 10) {
            listAnime.splice(10, 100)
        }
        return listAnime
    },
};