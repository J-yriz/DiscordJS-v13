const { MessageEmbed } = require('discord.js');
const translate = require('@vitalets/google-translate-api');
const { result } = require('../../../API/moive-api-imdb/index')

module.exports = {
    name: 'movie',
    description: 'movie information',
    aliases: ['infomovie', 'imovie'],
    userPerms: [],
    botPerms: [],
    run: async (message, client, args, { prefix }) => {
        let movie = args[0];
        let cards = '';
        if (!movie) {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                    `Tolong berikan nama film yang ingin di cari
                    
                    \`${prefix}movie [nama film]\``
                    )
            await message.channel.send({ embeds: [embed] })
        } else {
            result(movie)
            .then(async (mr) => {
                if (mr === undefined) {
                    await message.channel.send(`Movie tidak di temukan.`)
                } else {
                    if (mr.length > 5) {
                        mr.splice(5, 5)
                    }
                    if (mr.length === 1) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${mr[0].Title} | ${mr[0].Year}` })
                            .addFields(
                                { name: `Genre`, value: mr[0].Genre, inline: true },
                                { name: `Bahasa | Negara`, value: `${mr[0].Language} | ${mr[0].Country}`, inline: true },
                                { name: `Waktu Film`, value: mr[0].Runtime, inline: true },
                                { name: `Tanggal Rilis`, value: mr[0].Released, inline: true },
                                { name: `Penulis`, value: mr[0].Writer, inline: true },
                                { name: `Direktur`, value: mr[0].Director, inline: true },
                                { name: `Sinopsis`, value: await translateID(mr[0].Plot) }
                            )
                            .setThumbnail(mr[0].Poster)
                            .setImage(mr[0].Poster)
                            .setColor("RANDOM")
                            .setTimestamp()
                            .setFooter({ text: `result by omdbapi` })
                        message.channel.send({ embeds: [embed] })
                    } else {
                        mr.forEach((e, i) => {
                            i += 1
                            cards += `\`${i}.\` [**${e.Title}**](${e.Poster})
                            Tahun: ${e.Year}
                            \n`
                        })
                        let embed = new MessageEmbed()
                            .setDescription(cards)
                            .setTimestamp()
                            .setFooter({ text: `result by omdbapi` })
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
                            if (SelNumberMSG.content > mr.length) {
                                await message.channel.send('Tolong berikan nomer yang ada di list.')
                            } else {
                                let numberSel = SelNumberMSG.content - 1
                                let embedP = new MessageEmbed()
                                    .setAuthor({ name: `${mr[numberSel].Title} | ${mr[numberSel].Year}` })
                                    .addFields(
                                        { name: `Genre`, value: mr[numberSel].Genre, inline: true },
                                        { name: `Bahasa | Negara`, value: `${mr[numberSel].Language} | ${mr[numberSel].Country}`, inline: true },
                                        { name: `Waktu Film`, value: mr[numberSel].Runtime, inline: true },
                                        { name: `Tanggal Rilis`, value: mr[numberSel].Released, inline: true },
                                        { name: `Penulis`, value: mr[numberSel].Writer, inline: true },
                                        { name: `Direktur`, value: mr[numberSel].Director, inline: true },
                                        { name: `Sinopsis`, value: await translateID(mr[numberSel].Plot) }
                                    )
                                    .setThumbnail(mr[numberSel].Poster)
                                    .setImage(mr[numberSel].Poster)
                                    .setColor("RANDOM")
                                    .setTimestamp()
                                    .setFooter({ text: `result by omdbapi` })
                                msg.delete()
                                msgEmbed.edit({ embeds: [embedP] })
                            }
                        }
                    }
                }
            })
        }
    },
};

function translateID(e) {
    return translate(e, { to: 'id' })
        .then((res) => { return res.text })
}