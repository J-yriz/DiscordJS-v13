const { MessageEmbed } = require('discord.js');
const { dataAnime } = require('../../../API/myanimelist/anime')
const { detailAnime } = require('../../../API/myanimelist/detail')

module.exports = {
    name: 'anime',
    description: 'give the anime information by myanimelist',
    aliases: ['anim', 'infoanime', 'ianime'],
    userPerms: [],
    botPerms: [],
    run: async (message, channel, args, { prefix }) => {
        let anime = args[0];
        let cards = '';
        dataAnime(anime)
            .then((ar) => {
                ar.forEach((e, i) => {
                    cards += `\`${i += 1}.\` [${e.judul}](${e.url})
                    `
                })
                message.channel.send({ content: cards })
            })
    }
}