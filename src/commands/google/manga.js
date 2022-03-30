const { MessageEmbed } = require('discord.js');
const { dataManga } = require('../../../API/myanimelist/manga')
const { detailManga } = require('../../../API/myanimelist/detailManga')
const translate = require('@vitalets/google-translate-api')

module.exports = {
    name: 'manga',
    description: 'give the manga information by myanimelist',
    aliases: ['manga', 'komik', 'infomanga', 'imanga'],
    userPerms: [],
    botPerms: [],
    run: async (message, channel, args, { prefix }) => {
        let manga = args[0];
        let cards = '';
        if (!manga) {
            let embed = new MessageEmbed()
                .setDescription(`Tolong masukan nama Manga untuk mencari
                
                \`${prefix}manga\` [nama manga]`)
                .setColor('RANDOM')
            message.channel.send({ embeds: [embed] })
        } else {
            dataManga(manga)
                .then(async (ar) => {
                    ar.forEach((e, i) => {
                        cards += `\`${i += 1}.\` [${e.judul}](${e.url})
                    `
                    })
                    let embed = new MessageEmbed()
                        .setDescription(cards)
                        .setTimestamp()
                        .setFooter({ text: `myanimelist`, iconURL: 'https://cdn.discordapp.com/attachments/740755001453838356/956455227698077736/1BZ7QO7cZv4LPLHpewX8p4Ba84JDBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GH8Bws1hSkVtF7oAAAAASUVORK5CYII.png' })
                        .setColor("RANDOM")
                    let msgEmbed = await message.channel.send({ embeds: [embed] })
                    let msg = await message.channel.send({ content: 'Silahkan pilih angka yang ada di daftar | **Batas Waktu Sampai 30 Detik**' })

                    let x = false;
                    let SelectNumber = await message.channel
                        .awaitMessages({
                            filter: (msg) => message.author.id === msg.author.id,
                            max: 1,
                            errors: ["time"],
                            time: 30000,
                        })
                        .catch(() => {
                            x = true;
                            msg.edit({ content: "❌Kamu terlalu lama❌ | **ketik ulang kembali Command untuk memilih!**" })
                        });
                    if (x) return;

                    let SelNumberMSG = SelectNumber.first();
                    if (!parseInt(SelNumberMSG.content)) {
                        await message.channel.send('Tolong berikan nomer jangan huruf.')
                    } else {
                        if (SelNumberMSG.content > ar.length) {
                            await message.channel.send('Tolong berikan nomer yang ada di list.')
                        } else {
                            let numberSel = SelNumberMSG.content - 1
                            detailManga(ar[numberSel].url)
                                .then(async (e) => {
                                    let ea
                                    if (e.sinopsis !== 'Tidak di ketahui' || e.sinopsis !== undefined) {
                                        ea = await translateID(e.sinopsis);
                                        if (ea.length > 1024) {
                                            ea = ea.substring(0, 1024)
                                        }
                                    } else {
                                        ea = e.sinopsis
                                    }

                                    let embed = new MessageEmbed()
                                        .setAuthor({ name: ar[numberSel].judul})
                                        .addFields(
                                            { name: 'Genre', value: e.genre, inline: true },
                                            { name: 'Peringkat', value: e.rank, inline: true },
                                            { name: 'Chapter', value: e.chp, inline: true },
                                            { name: 'Type', value: e.type, inline: true },
                                            { name: 'Season', value: e.season, inline: true },
                                            { name: 'Studio', value: e.studio, inline: true },
                                            { name: 'Sinopsis', value: ea, inline: false }
                                        )
                                        .setFooter({ text: `myanimelist`, iconURL: 'https://cdn.discordapp.com/attachments/740755001453838356/956455227698077736/1BZ7QO7cZv4LPLHpewX8p4Ba84JDBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GH8Bws1hSkVtF7oAAAAASUVORK5CYII.png' })
                                        .setColor('RANDOM')
                                        .setImage(e.gambar)
                                    msg.delete()
                                    msgEmbed.edit({ embeds: [embed] })
                                })
                        }
                    }
                })
        }
    }
}

function translateID(e) {
    return translate(e, { to: 'id' })
        .then((res) => { return res.text })
}