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
            adaption: '',
            eps: '',
            type: '',
            season: '',
            trailer: '',
            genre: '',
            studio: ''
        };

        $('#contentWrapper').children().map((i, elem) => {
            dataAnime.gambar = $('div.leftside a img').data('src'),
            dataAnime.sinopsis = $(elem).find('div.rightside.js-scrollfix-bottom-rel td p[itemprop="description"]').text().trim().replace("\n", "").replace("\n", "").replace("[Written by MAL Rewrite]", ""),
            dataAnime.skor = $(elem).find('div.score-label').text(),
            dataAnime.rank = $(elem).find('span.numbers.ranked strong').text().replace("#", "")
            dataAnime.adaption = $(elem).find('td.borderClass a').attr('href')
            dataAnime.eps = $(elem).find('td.spaceit span#curEps').text()
            dataAnime.type = $(elem).find('div.information-block.di-ib.clearfix span.information.type').text()
            dataAnime.season = $(elem).find('div.information-block.di-ib.clearfix span.information.season').text()
            dataAnime.trailer = $(elem).find('div.anime-detail-header-video.di-tc.va-t.pl16 a.iframe.js-fancybox-video.video-unit.promotion').attr('href')
            dataAnime.genre = $(elem).find('span[itemprop="genre"]').text().replace(/[A-Z][a-z]*/g, ' $&').trim()
            dataAnime.studio = $(elem).find('span.information.studio.author').text()
        })

        if(dataAnime.gambar === '' || dataAnime.gambar === undefined) {
            dataAnime.gambar = 'https://cdn.discordapp.com/attachments/740755001453838356/956540476872347648/unknown.png'
        } 
        if (dataAnime.sinopsis === '' || dataAnime.sinopsis === undefined) {
            dataAnime.sinopsis = 'Tidak di ketahui'
        } 
        if (dataAnime.skor === '' || dataAnime.skor === undefined) {
            dataAnime.skor = 'Tidak di ketahui'
        }
        if (dataAnime.rank === '' || dataAnime.rank === undefined) {
            dataAnime.rank = 'Tidak di ketahui'
        }
        if (dataAnime.adaption === '' || dataAnime.adaption === undefined) {
            dataAnime.adaption = 'Tidak di ketahui'
        }
        if (dataAnime.eps === '' || dataAnime.eps === undefined) {
            dataAnime.eps = 'Tidak di ketahui'
        }
        if (dataAnime.type === '' || dataAnime.type === undefined) {
            dataAnime.type = 'Tidak di ketahui'
        }
        if (dataAnime.season === '' || dataAnime.season === undefined) {
            dataAnime.season = 'Tidak di ketahui'
        }
        if (dataAnime.trailer === '' || dataAnime.trailer === undefined) {
            dataAnime.trailer = 'Tidak di ketahui'
        }
        if (dataAnime.genre === '' || dataAnime.genre === undefined) {
            dataAnime.genre = 'Tidak di ketahui'
        }
        if (dataAnime.studio === '' || dataAnime.studio === undefined) {
            dataAnime.studio = 'Tidak di ketahui'
        }
        
        return dataAnime;
    },
};