const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    dataManga : async (manga) => {
        const body = await ( await fetch(`https://myanimelist.net/search/all?cat=all&q=${manga}`)).text()
        const $ = cheerio.load(body);

        let listManga = $('article').children().map((i, elem) => {
            return {
                judul: $(elem).find('div.information.di-tc.va-t.pl8 a.hoverinfo_trigger.fw-b').text().trim(),
                url: $(elem).find('div.information.di-tc.va-t.pl8 a.hoverinfo_trigger.fw-b').attr('href')
            }
        }).toArray();

        if (listManga.length >= 10) {
            listManga.splice(0, 11)
            listManga.splice(10, 100)
        }
        return listManga
    },
};