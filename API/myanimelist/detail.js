const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    detailAnime: async (url) => {
        const body = await ( await fetch(url) ).text();
        const $ = cheerio.load(body);
        
        let dataAnime = {
            gambar: '',
            sinopsis: '',
            skor: '',
            rank: '',
            adaption: ''
        };

        $('#contentWrapper').children().map((i, elem) => {
            dataAnime.gambar = $(elem).find('img.lazyloaded').attr('src'),
            dataAnime.sinopsis = $(elem).find('div.rightside.js-scrollfix-bottom-rel td p[itemprop="description"]').text().trim().replace("\n", "").replace("\n", "").replace("[Written by MAL Rewrite]", ""),
            dataAnime.skor = $(elem).find('div.score-label').text(),
            dataAnime.rank = $(elem).find('span.numbers.ranked strong').text().replace("#", "")
            dataAnime.adaption = $(elem).find(' td.borderClass a').attr('href')
        })
        return dataAnime;
    },
};