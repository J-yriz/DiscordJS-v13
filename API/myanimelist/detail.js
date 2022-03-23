const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    detailAnime: async (url) => {
        const body = await ( await fetch(url) ).text();
        const $ = cheerio.load(body);
        
        let dataAnime = {
            judul: '',
            gambar: '',
            sinopsis: ''
        };

        $('#contentWrapper').children().map((i, elem) => {
            dataAnime.judul = $(elem).find('h1.title-name.h1_bold_none strong').text().trim(),
            dataAnime.gambar = $(elem).find('img.lazyloaded').attr('src'),
            dataAnime.sinopsis = $(elem).find('div.rightside.js-scrollfix-bottom-rel td p[itemprop="description"]').text().trim()
        })
        console.log(dataAnime)
    },
};