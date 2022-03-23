const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "get the information guild discord",
    aliases: ['sinfo'],
    userPerms: [],
    botPerms: [],
    run: async (message, client, args, { prefix }) => {
        let toalRolesMen = message.guild.roles.cache.map(e => {return `<@&${e.id}>`})
        let embed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL(), url: message.guild.iconURL() })
            .addFields(
                { name: "Owner Server", value: `<@${message.guild.ownerId}>`, inline: true},
                { name: "Server Disocrd Buat", value: message.guild.createdAt.toDateString(), inline: true },
                { name: "Jumlah Member", value: message.guild.memberCount.toString(), inline: true },
                { name: "Jumlah Member Boost", value: message.guild.premiumSubscriptionCount.toString(), inline: true },
                { name: "Boost Roles", value: message.guild.premiumTier, inline: true },
                { name: `Daftar Roles | ${toalRolesMen.length}`, value: toalRolesMen.join(" "), inline: false }
            )
            .setThumbnail(message.guild.iconURL())
            .setColor("RANDOM")
            .setImage(message.channel.banner)
        await message.channel.send({ embeds: [embed] })
        // console.log(message.guild.fetchOwner())
    },
};