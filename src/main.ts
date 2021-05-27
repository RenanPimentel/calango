import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import { Client, Message } from 'discord.js';
import db from './db';
import add from './controllers/default-commands/add';
import all from './controllers/default-commands/all';
import remove from './controllers/default-commands/remove';

interface DefaultCommands {
  [keys: string]: (msg: Message, args: string[]) => string | Promise<string>;
}

const bot = new Client();

const defaultCommands: DefaultCommands = { add, all, remove };

bot.once('ready', async () => {
  console.log('ready');
});

bot.on('guildCreate', async (guild) => {
  const channelId =
    guild.systemChannelID !== null
      ? guild.systemChannelID
      : (
          await guild.channels.create('calango', {
            reason: "Couldn't find system channel",
          })
        ).id;

  guild.setSystemChannel(channelId);

  db.addGuild(guild.id, channelId, guild.ownerID);
});

bot.on('message', async (msg) => {
  if (msg.author.bot || msg.channel.type !== 'text' || !msg.guild) return;
  const [input, ...args] = msg.content
    .slice(process.env.PREFIX?.length)
    .split(' ');

  if (input in defaultCommands) {
    return msg.channel.send(await defaultCommands[input](msg, args));
  }

  const command = await db.findCommand(msg.guild.id, input);

  if (command) {
    msg.channel.send(command.output);
  }
});

bot.login(process.env.TOKEN);
