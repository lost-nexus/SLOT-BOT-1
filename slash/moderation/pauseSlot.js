const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const config = require('../../config.json') 
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pauseslot')
        .setDescription('pauses a slot'),
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

        const ownerId = onServer[0].messages.inviteToParticipate.split(' ')[2].split('>')[0].replace('<@', '')

        await channel.permissionOverwrites.edit(ownerId, { SendMessages: false });

        client.giveawaysManager
            .pause(onServer[0].messageId)
            .then(() => {
                interaction.reply('Success! paused Slot!');
            })
            .catch((err) => {
                interaction.reply({ephemeral: true, content: `An error has occurred, please check and try again.\n\`${err}\``});
            });



    },
}