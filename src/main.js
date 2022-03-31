const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token, prefix } = require('../devconfig.json');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]
});

module.exports = {
	client: client,
	prefix: prefix
};

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.categories = fs.readdirSync('src/commands');

['command'].forEach((handler) => {
	require(`./handler/${handler}`)(client)
});

client.on('ready', () => {
	console.log('Ready!');

	client.user.setPresence(
		{
			activities: [{
				name: 'Alone',
				type: 'LISTENING', // PLAYING, WATCHING, LISTENING, STREAMING
				url: '' // u can paste some link if u use type STREAMING
			}],
			status: 'idle' // "online" "idle" "dnd" "invisible"
		}
	);
});

client.login(token);