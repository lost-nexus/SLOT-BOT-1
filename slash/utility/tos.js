const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const config = require('../../config.json') 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tos')
        .setDescription('provides must follow rules'),
    async execute(interaction) {

            const embed = new EmbedBuilder()
                .setDescription(`**SLOT RULES :**\n\n• 3 here ping per day\n• No everyone ping\n• Slots are only for buying and selling\n• Any kind of promotion not allowed\n• No refund on pvt slots\n• You can't share your slot\n• You can't sell your slot\n\n• Follow rules . If you disobey any rule your slot will be revoked without refund\n• Scam = slot revoke without refund`)
            await interaction.reply({ephemeral: true, embeds: [embed] })               

    },
}