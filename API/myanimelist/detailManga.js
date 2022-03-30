const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    detailManga: async (url) => {
        const body = await ( await fetch(url) ).text();
        const $ = cheerio.load(body);
        
        let dataManga = {
            gambar: '',
            sinopsis: '',
            skor: '',
            rank: '',
            chp: '',
            type: '',
            season: '',
            genre: '',
            studio: ''
        };

        $('#contentWrapper').children().map((i, elem) => {
            dataManga.gambar = $('div.leftside a img').data('src'),
            dataManga.sinopsis = $(elem).find('div.rightside.js-scrollfix-bottom-rel td span[itemprop="description"]').text().trim().replace("\n", "").replace("\n", ""),
            dataManga.skor = $(elem).find('span.score-label').text(),
            dataManga.rank = $(elem).find('span.numbers.ranked strong').text().replace("#", "")
            dataManga.chp = $(elem).find('td.spaceit span#totalChaps').text()
            dataManga.type = $(elem).find('div.information-block.di-ib.clearfix span.information.type').text()
            dataManga.season = $(elem).find('div.information-block.di-ib.clearfix span.information.season').text()
            dataManga.genre = $(elem).find('span[itemprop="genre"]').text().replace(/[A-Z][a-z]*/g, ' $&').trim()
            dataManga.studio = $(elem).find('span.information.studio.author').text()
        })

        if(dataManga.gambar === '' || dataManga.gambar === undefined) {
            dataManga.gambar = 'https://cdn.discordapp.com/attachments/740755001453838356/956540476872347648/unknown.png'
        } 
        if (dataManga.sinopsis === '' || dataManga.sinopsis === undefined) {
            dataManga.sinopsis = 'Tidak di ketahui'
        } 
        if (dataManga.skor === '' || dataManga.skor === undefined) {
            dataManga.skor = 'Tidak di ketahui'
        }
        if (dataManga.rank === '' || dataManga.rank === undefined) {
            dataManga.rank = 'Tidak di ketahui'
        }
        if (dataManga.type === '' || dataManga.type === undefined) {
            dataManga.type = 'Tidak di ketahui'
        }
        if (dataManga.season === '' || dataManga.season === undefined) {
            dataManga.season = 'Tidak di ketahui'
        }
        if (dataManga.genre === '' || dataManga.genre === undefined) {
            dataManga.genre = 'Tidak di ketahui'
        }
        if (dataManga.studio === '' || dataManga.studio === undefined) {
            dataManga.studio = 'Tidak di ketahui'
        }
        
        return dataManga;
    },
};