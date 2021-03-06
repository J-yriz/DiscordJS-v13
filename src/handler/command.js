const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Commands Failed');
table.setHeading('Commands', 'Folders');

module.exports = (client) => {
    readdirSync('src/commands/').forEach(dir => {
        const commands = readdirSync(`src/commands/${dir}/`).filter(file => file.endsWith('.js'))
        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                table.addRow(file, capFirst(dir))
                // console.log(`${file} failed to load in ${dir}`);
                console.log(table.toString());
                continue;
            } if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    })
    readdirSync(`src/events/`).forEach((file) => {
        const events = readdirSync(`src/events/`).filter((file) => file.endsWith('.js'));
        for(let file of events) {
            let pull = require(`../events/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
            }
        }
        console.log(`${file} Events Loaded`)
    })
};

function capFirst(args) {
    return args[0].toUpperCase() + args.slice(1);
}