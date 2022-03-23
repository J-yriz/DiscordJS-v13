const { MessageEmbed } = require('discord.js');
const { dataAnime } = require('../../../API/myanimelist/anime')

module.exports = {
    name: 'anime',
    description: 'give the anime information by myanimelist',
    aliases: ['anim', 'infoanime', 'ianime'],
    userPerms: [],
    botPerms: [],
    run: async (message, channel, args, { prefix }) => {
        let anime = args[0]
        dataAnime(anime)
            .then((e) => {
                let cards = '';
                e.forEach((e, i) => {
                    cards += `\`${i += 1}.\` [${e.judul}](${e.url})\n`
                })
                message.channel.send({ content: cards })
            })
    }
}