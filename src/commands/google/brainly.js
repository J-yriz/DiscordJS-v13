const { MessageEmbed } = require('discord.js');
const brainly = require('brainly-scraper');

module.exports = {
    name: "brainly",
    description: "get the answer of a your question",
    aliases: ["brain", "brainly"],
    userPerms: [],
    botPerms: [],
    run: async (message, client, args, { prefix }) => {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setDescription(`Tolong masukan pertanyaan untuk mencari jawaban
                
                \`${prefix}brainly\` [pertanyaan]`)
                .setColor('RANDOM')
            message.channel.send({ embeds: [embed] })
        } else {
            let cards = ''
            brainly(args[0])
                .then( async (res) => {
                    res.data.forEach((e, i) => {
                        cards += `\`${i += 1}.\` ${e.pertanyaan}`.replace(/\n/g, '').split(0, 1) + '\n'})
                    let embed = new MessageEmbed()
                        .setDescription(`${cards}`)
                        .setColor('RANDOM')
                        .setFooter({ text: 'brainly', iconURL: 'https://seeklogo.com/images/B/brainly-logo-00BBA8B54B-seeklogo.com.png' })
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
                        if (SelNumberMSG.content > res.data.length) {
                            await message.channel.send('Tolong berikan nomer yang ada di list.')
                        } else {
                            let numberSel = SelNumberMSG.content - 1
                            let jawaban = res.data[numberSel].jawaban[0].text;
                            let embed = new MessageEmbed()
                                .setDescription(`Pertanyaan : ${res.data[numberSel].pertanyaan}
                                
                                Jawaban : ${jawaban}`)
                                .setColor('RANDOM')
                                .setFooter({ text: 'brainly', iconURL: 'https://seeklogo.com/images/B/brainly-logo-00BBA8B54B-seeklogo.com.png' })
                            msgEmbed.edit({ embeds: [embed] })
                            msg.delete()
                        }
                    }
                })
        }
    },
}