const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'ping bot',
    aliases: 'Ping',
    userPerms: [],
    botPerms: [],
    run: async(message, client, args, { prefix }) => {
        const msg = await message.channel.send({ content: 'Ping...'})
        await msg.edit({ content: `Pong! **${client.ws.ping}ms** :ping_pong:`})
    },
};