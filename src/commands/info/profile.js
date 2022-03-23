const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "profile",
    description: "get the profile member discord",
    aliases: ["profil", "prof"],
    userPerms: [],
    botPerms: [],
    run: async (message, client, args, { prefix }) => {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setImage(message.author.displayAvatarURL({ size: 1024 }))
            message.channel.send({ embeds: [embed] })
        } else {
            let user = message.mentions.users.first() || message.author;
            console.log(user)
            if (!user) {
                message.channel.send('Tidak ada user')
            } else {
                let embed = new MessageEmbed()
                    .setImage(user.displayAvatarURL({ size: 1024 }))
                message.channel.send({ embeds: [embed] })
            }
        }
    }, 
};