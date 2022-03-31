const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    detailAnime: async (url) => {
        const body = await ( await fetch(url) ).text();
        const $ = cheerio.load(body);
        
        let data = {
            gambar: '',
            sinopsis: '',
            skor: '',
            rank: '',
            adaption: '',
            eps: '',
            type: '',
            season: '',
            trailer: '',
            genre: '',
            studio: ''
        };

        $('#contentWrapper').children().map((i, elem) => {
            data.gambar = $('div.leftside a img').data('src'),
            data.sinopsis = $(elem).find('div.rightside.js-scrollfix-bottom-rel td p[itemprop="description"]').text().trim().replace("\n", "").replace("\n", ""),
            data.skor = $(elem).find('div.score-label').text(),
            data.rank = $(elem).find('span.numbers.ranked strong').text().replace("#", "")
            data.adaption = $(elem).find('td.borderClass a').attr('href')
            data.eps = $(elem).find('td.spaceit span#curEps').text() || $(elem).find('td.spaceit span#totalChaps').text()
            data.type = $(elem).find('div.information-block.di-ib.clearfix span.information.type').text()
            data.season = $(elem).find('div.information-block.di-ib.clearfix span.information.season').text()
            data.trailer = $(elem).find('div.anime-detail-header-video.di-tc.va-t.pl16 a.iframe.js-fancybox-video.video-unit.promotion').attr('href')
            data.genre = $(elem).find('span[itemprop="genre"]').text().replace(/[A-Z][a-z]*/g, ' $&').trim()
            data.studio = $(elem).find('span.information.studio.author').text()
        })

        if(data.gambar === '' || data.gambar === undefined) {
            data.gambar = 'https://cdn.discordapp.com/attachments/740755001453838356/956540476872347648/unknown.png'
        } 
        if (data.sinopsis === '' || data.sinopsis === undefined) {
            data.sinopsis = 'Tidak di ketahui'
        } 
        if (data.skor === '' || data.skor === undefined) {
            data.skor = 'Tidak di ketahui'
        }
        if (data.rank === '' || data.rank === undefined) {
            data.rank = 'Tidak di ketahui'
        }
        if (data.adaption === '' || data.adaption === undefined) {
            data.adaption = 'Tidak di ketahui'
        }
        if (data.eps === '' || data.eps === undefined) {
            data.eps = 'Tidak di ketahui'
        }
        if (data.type === '' || data.type === undefined) {
            data.type = 'Tidak di ketahui'
        }
        if (data.season === '' || data.season === undefined) {
            data.season = 'Tidak di ketahui'
        }
        if (data.trailer === '' || data.trailer === undefined) {
            data.trailer = 'Tidak di ketahui'
        }
        if (data.genre === '' || data.genre === undefined) {
            data.genre = 'Tidak di ketahui'
        }
        if (data.studio === '' || data.studio === undefined) {
            data.studio = 'Tidak di ketahui'
        }
        
        return data;
    },
};