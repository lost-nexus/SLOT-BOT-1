const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const config = require('../../config.json') 
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('revokeslot')
        .setDescription('revoke a slot and deletes slot channel'),
    async execute(interaction) {

        const client = interaction.client
        const channel = interaction.channel

        const owners = config.owners
        if (!owners.includes(interaction.user.id)) return interaction.reply({wphemeral: true, embeds: [{
            title: 'its owner only comand ',
            color: 0xff0000
        }]})

        const onServer = client.giveawaysManager.giveaways.filter((g) => g.channelId === channel.id);
        if (!onServer) return interaction.reply({ephemeral: true, embeds: [{
            title: 'this channel is not a slot',
            color: 0xff0000
        }]})

        client.giveawaysManager
            .delete(onServer[0].messageId)
            .then(() => {
                interaction.reply('Success! revoked Slot!');
            })
            .catch((err) => {
                interaction.reply({ephemeral: true, content: `An error has occurred, please check and try again.\n\`${err}\``});
            });

            setTimeout(async() => {
        await channel.delete()
            }, 5000)

    },
}