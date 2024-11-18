const {Events, ActivityType} = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{
                name: `${config.bot.prefix}help`,
                type: ActivityType.Watching
            }],
            status: 'idle'})
    },
}