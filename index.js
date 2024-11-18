const {Client, Collection, GatewayIntentBits} = require('discord.js')
const client = new Client({intents: [GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

const config = require('./config.json')

client.login(config.bot.token)

const fs = require("fs");

client.commands = new Collection();
client.aliases = new Collection();
client.scommands = new Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event", "slashcommands"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './database.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;

const cron = require('node-cron');

// Schedule the task to run every day at midnight (12:00 AM)
cron.schedule('0 15 * * *', () => {
    console.log('Running task at midnight');
    runDailyTask();
}, {
    timezone: 'Asia/Kolkata' // Set the timezone to your desired timezone
});

const {QuickDB} = require('quick.db')
const db = new QuickDB()
// Define the function you want to run
async function runDailyTask() {
    const database = await db.startsWith(`count`)
    if (database) {
        await database.forEach(async (data) => {
            const {id} = data
            await db.delete(id)
        })
        console.log(`All Pings reseted`)
    }
    // Add your task logic here
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
