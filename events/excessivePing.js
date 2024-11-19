const {Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const config = require('../config.json');
const {QuickDB} = require('quick.db')
const db = new QuickDB()
module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        const client = message.client

        if (message.author.bot) return;
        if (message.channel.parent.id !== config.slotCategory) return;

        const onServer = client.giveawaysManager.giveaways.filter((g) => g.channelId === message.channel.id);
        if (!onServer) return;

        // const ownerId = onServer[0].messages.inviteToParticipate.split(' ')[2].split('>')[0].replace('<@', '')

        if (message.content.toLowerCase().includes("@everyone")) {

            await message.channel.permissionOverwrites.edit(message.author.id, { SendMessages: false });
    
            client.giveawaysManager
                .pause(onServer[0].messageId)
                .then(() => {
                    message.reply({embeds: [{title: `Slot has been paused`, description: `Reason: Use of @everyone`, color: 0xff0000}]});
                })
                .catch((err) => {
                    message.reply({ephemeral: true, content: `An error has occurred, please check and try again.\n\`${err}\``});
            });

        } else if (message.content.toLowerCase().includes('@here')) {
            var count = await db.get(`count.${message.channel.id}`)
            if (!count) {
                await db.set(`count.${message.channel.id}`, 1)
                message.channel.send({embeds: [{description: `You have used 1/3 pings`, color: 0xff0000}]})
            } else if (count === 1) {
                await db.set(`count.${message.channel.id}`, 2)
                message.channel.send({embeds: [{description: `You have used 2/3 pings`, color: 0xff0000}]})
            }  else if (count === 2) {
                await db.set(`count.${message.channel.id}`, 3)
                message.channel.send({embeds: [{description: `You have used 3/3 pings`, color: 0xff0000}]})
} else if (count === 3) {
                await message.channel.permissionOverwrites.edit(message.author.id, { SendMessages: false });
    
                client.giveawaysManager
                    .pause(onServer[0].messageId)
                    .then(() => {
                        message.reply({embeds: [{title: `Slot has been paused`, description: `Reason: Use of More than 3 pings`, color: 0xff0000}]});
                    })
                    .catch((err) => {
                        message.reply({ephemeral: true, content: `An error has occurred, please check and try again.\n\`${err}\``});
                });
            }
        } else return;
    }
}
