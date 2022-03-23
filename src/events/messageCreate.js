const { client, prefix } = require('../main')
const { MessageEmbed } = require('discord.js');

// messageCreate evets
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return; // berfungsi ketika menggunakan prefix di depan command
  if (!message.guild) return; // command dapat berfungsi untuk DM member
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if (!message.member.permissions.has(command.userPerms || [])) {
        let embed = new MessageEmbed()
        .setAuthor({ name: `Izin akses command tidak dimiliki!.` })
        .setDescription(
          `Kamu dapat melihat izin untuk command ini
          \`${prefix}perm (nama command)\`
          
          
          Jika kamu berfikir ini adalah bug tolong kontak
          KonoWaatshiGa Jariz-sama da#7706 / Jariz#7706`
        )
        .setColor("RANDOM")
        return message.channel.send({ embeds: [embed] })
    }
    if (!message.guild.me.permissions.has(command.botPerms || [])) {
      let embed = new MessageEmbed()
      .setAuthor({ name: `Bot tidak memiliki izin akses command!.` })
      .setDescription(
        `Kamu dapat menambahkan izin ke bot
        Izin yang di perlukan: \`${command.botPerms}\`
        
        
        Jika kamu berfikir ini adalah bug tolong kontak
        KonoWaatshiGa Jariz-sama da#7706 / Jariz#7706`
      )
      .setColor("RANDOM")
      return message.channel.send({ embeds: [embed] })
    }
    // if (
    //   (command.permissions &&
    //     command.permissions.member &&
    //     !message.channel
    //       .permissionsFor(message.member)
    //       .has(command.permissions.member) &&
    //     !message.member.roles.cache.has(command.permissions.member))
    // ) {
    //   let embed = new MessageEmbed()
    //     .setAuthor({ name: `Izin akses command tidak dimiliki!.` })
    //     .setDescription(
    //       `Jika kamu berfikir ini adalah bug silahkan Contact pembuat BOT
    //         KonoWaatshiGa Jariz-sama da#7706 / Jariz#7706`
    //     )
    //     .setTimestamp()
    //   return message.channel.send({ embeds: [embed] })
    // }
    command.run(message, client, args, { prefix })
  } else return;
});
