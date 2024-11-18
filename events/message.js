const {Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        const client = message.client
        const prefix = config.bot.prefix
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (!args) return;

    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
    }
}