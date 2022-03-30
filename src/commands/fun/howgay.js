// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name: 'howgay',
//     description: 'hmmmmmmm?!',
//     aliases: ['howg', 'hgay'],
//     userPerms: [],
//     botPerms: [],
//     run: async (message, client, args, { prefix }) => {
//         let numberRes = Math.floor(Math.random() * 100 + 1)
//         if (!args[0]) {
//             let embed = new MessageEmbed()
//                 .setAuthor({ name: `${message.author.username} | Gay : ${numberRes}% 🏳️‍🌈` })
//                 .setColor('RANDOM')
//             message.channel.send({ embeds: [embed] })
//         } else {
//             let user = message.mentions.users.first() || message.author;
//             if (!user) {
//                 message.channel.send('Tidak ada user')
//             } else {
//                 let embed = new MessageEmbed()
//                     .setAuthor({ name: `${user.username} | Gay : ${numberRes}% 🏳️‍🌈` })
//                     .setColor('RANDOM')
//                 message.channel.send({ embeds: [embed] })
//             }
//         }
//     },
// };