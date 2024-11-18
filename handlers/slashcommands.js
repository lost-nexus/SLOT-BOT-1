const {readdirSync} = require('node:fs')
const path = require('node:path')
const foldersPath = ('./slash')
const commandFolders = readdirSync(foldersPath)
const { REST, Routes } = require('discord.js');
const config = require('../config.json');

module.exports = (client) => {
    const commands = []

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(`../` +filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.scommands.set(command.data.name, command);
			commands.push(command.data.toJSON());
            // console.log(`[SUCCESS] Loaded command ${command.data.name}`)
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const clientId = config.bot.clientId
const guildId = config.bot.guildId
const rest = new REST().setToken(config.bot.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

}