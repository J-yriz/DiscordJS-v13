const { MessageEmbed } = require('discord.js');
const { dataAnime } = require('../../../API/myanimelist/anime')
const { detailAnime } = require('../../../API/myanimelist/detail')
const translate = require('@vitalets/google-translate-api')

module.exports = {
    name: 'anime',
    description: 'give the anime information by myanimelist',
    aliases: ['anim', 'infoanime', 'ianime'],
    userPerms: [],
    botPerms: [],
    run: async (message, channel, args, { prefix }) => {
        let anime = args[0];
        let cards = '';
        if (!anime) {
            let embed = new MessageEmbed()
                .setDescription(`Tolong masukan nama Anime untuk mencari
                
                \`${prefix}anime\` [nama anime]`)
                .setColor('RANDOM')
            message.channel.send({ embeds: [embed] })
        } else {
            dataAnime(anime)
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
                            detailAnime(ar[numberSel].url)
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
                                        .setAuthor({ name: ar[numberSel].judul, url: e.trailer })
                                        .addFields(
                                            { name: 'Genre', value: e.genre, inline: true },
                                            { name: 'Peringkat', value: e.rank, inline: true },
                                            { name: 'Episode', value: e.eps, inline: true },
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