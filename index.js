const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const distube = new DisTube(client, { searchSongs: true });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('/play')) {
    const args = message.content.split(' ').slice(1);
    if (!message.member.voice.channel) {
      return message.channel.send('You need to be in a voice channel to use this command!');
    }
    distube.play(message.member.voice.channel, args.join(' '), { textChannel: message.channel, member: message.member });
  }
});

client.login('YOUR_BOT_TOKEN');

