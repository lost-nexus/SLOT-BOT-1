const {SlashCommandBuilder} = require('discord.js') 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with bots ping latency'),
    async execute(interaction) {
        const client = interaction.client
        await interaction.reply({embeds: [{color: 5763719, description: `Latency is **${Date.now() - interaction.createdTimestamp}ms**.\nAPI Latency is **${Math.round(client.ws.ping)}ms**`}]});
    },
}