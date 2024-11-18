const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const config = require('../../config.json') 
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('extendslot')
        .setDescription('extends timer for  a slot')
        .addStringOption(option =>
			option
				.setName('duration')
				.setDescription('time period of slot in format 1D / 1H / 1M / 1S')
				.setRequired(true)),
    async execute(interaction) {

        const client = interaction.client
        const channel = interaction.channel
        const duration = interaction.options.getString('duration')

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
            .edit(onServer[0].messageId, {
                addTime: ms(duration)
            })
            .then(() => {
                interaction.reply('Success! Slot timer extended!');
            })
            .catch((err) => {
                interaction.reply({content:`An error has occurred, please check and try again.\n\`${err}\``, ephemeral:true });
            });


    },
}