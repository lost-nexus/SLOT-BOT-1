const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require('discord.js')
const config = require('../../config.json') 
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createslot')
        .setDescription('creates a slot')
        .addUserOption(option =>
			option
				.setName('create_slot_for')
				.setDescription('mention member to create a slot for')
				.setRequired(true))
        .addStringOption(option =>
			option
				.setName('duration')
				.setDescription('time period of slot in format 1D / 1H / 1M / 1S')
				.setRequired(true))
        .addStringOption(option =>
            option
            .setName('slotname')
            .setDescription('name of slot')
             .setRequired(false)),
    async execute(interaction) {

        const client = interaction.client
        const user = interaction.options.getUser('create_slot_for')
        const duration = interaction.options.getString('duration')
        var slotName = interaction.options.getString('slotname') 
        if (!slotName) {
            var slotName = user.username + `'s slot`
        }

        const owners = config.owners
        if (!owners.includes(interaction.user.id)) return interaction.reply({wphemeral: true, embeds: [{
            title: 'its owner only comand ',
            color: 0xff0000
        }]})

        const channel = await interaction.guild.channels.create({
            name: slotName,
            type: 0,
            parent: config.slotCategory,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: [PermissionsBitField.Flags.SendMessages], },
                {
                    id: user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.AttachFiles],
                },
            ],
        })

        const tosEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTimestamp()
        .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`**SLOT RULES :**\n\n• 3 here ping per day\n• No everyone ping\n• Slots are only for buying and selling\n• Any kind of promotion not allowed\n• No refund on pvt slots\n• You can't share your slot\n• You can't sell your slot\n\n• Follow rules . If you disobey any rule your slot will be revoked without refund\n• Scam = slot revoke without refund`)

        await channel.send({embeds: [tosEmbed]})

        client.giveawaysManager
            .start(channel, {
                duration: ms(duration),
                winnerCount: 1,
                prize: `Owner info`,
                messages: {
                    giveaway: '',
                    giveawayEnded: '**SLOT ENDED**',
                    title: '{this.prize}',
                    drawing: '**Drawing:** {timestamp}',
                    dropMessage: 'Be the first to react with 🎉 !',
                    inviteToParticipate: `**Slot Owner:** ${user}`,
                    winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                    embedFooter: `{this.winnerCount} winner(s)`,
                    noWinner: 'Slot cancelled, no valid participations.',
                    hostedBy: '**Manager:** ${interaction.user}',
                    winners: 'Winner(s):',
                    endedAt: 'Ended at'
                }
            })
            .then((data) => {
                console.log(data.messageId); // {...} (messageId, end date and more)
            });

        await interaction.reply({embeds: [{
            title: `${user.username}'s slot created`,
            color: 0xff0000
        }]})

    },
}