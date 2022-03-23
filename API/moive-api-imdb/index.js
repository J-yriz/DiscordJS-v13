const fetch = require('node-fetch');
const { apikey } = require('../../devconfig.json'); // u can change this || const { token } = require('../config.json'); ||

module.exports = {
    result: async (movie) => {
        let fetched = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${movie}`);
        let json = await fetched.json();
        if (json.Search === undefined) {
            return undefined
        } else {
            return Promise.all(json.Search.map(async (e, i) => {
                let detailResult = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${e.imdbID}`)
                let jsonResult = await detailResult.json()
                return jsonResult
            }))
        }
    }
};