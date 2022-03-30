const { MessageEmbed } = require('discord.js');
const { imageIG } = require('../../../API/instagram/dataCanvas/index.js');

module.exports = {
    name: 'instagram',
    description: 'Get profile data from instagram',
    aliases: ['ig', 'Instagram'],
    userPerms: [],
    botPerms: [],
    run: async (message, client, args, { prefix }) => {
        imageIG(args[0])
            .then((dataIG) => {
                if (!args[0]) {
                    let embed = new MessageEmbed()
                        .setDescription(`Tolong masukan nama Instagram untuk mencari
                    
                    \`${prefix}ig\` [nama profile]`)
                        .setColor('RANDOM')
                    message.channel.send({ embeds: [embed] })
                } else {
                    if (dataIG === 'error') {
                        let embed = new MessageEmbed()
                            .setDescription(`Tidak dapat menemukan profile \`${args[0]}\``)
                            .setColor('RANDOM')
                        message.channel.send({ embeds: [embed] })
                    } else {
                        let embed = new MessageEmbed()
                            .setDescription(`
                            [**${args[0]}**](https://www.instagram.com/${args[0]}/)
                            `)
                            .setColor('RANDOM')
                            .setFooter({ text: `bug?, dm Jariz-chan#7706 || Jariz#7706` })
                            message.channel.send({ embeds: [embed] })
                        setTimeout(
                            () => {
                                message.channel.send({ files: ['src/commands/google/image.png'] })
                            },
                            100
                        )
                    }
                }
            })
    }
}