module.exports  = {
    name: 'ping',
    description: 'Ping command.',
    run: async (client, message, args) => {
        message.channel.send('Pong');
    }
}