const { readdirSync } = require('fs');

const eventFiles = readdirSync(`./events/`).filter(file => file.endsWith('.js'));

module.exports = (client) => {
    
for (const file of eventFiles) {
	// const filePath = `./events/`+ file;
	const event = require(`../events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
};