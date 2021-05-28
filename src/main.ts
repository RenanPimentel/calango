import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import { Client, Message } from 'discord.js';
import db from './db';
import add from './controllers/default-commands/add';
import all from './controllers/default-commands/all';
import remove from './controllers/default-commands/remove';
import changeActivity from './utils/change-activity';
import addAllGuilds from './db/utils/add-all-guilds';
import time from './controllers/default-commands/time';

interface DefaultCommands {
  [keys: string]: (msg: Message, args: string[]) => string | Promise<string>;
}

const bot = new Client();

const defaultCommands: DefaultCommands = { add, all, remove, time };

bot.once('ready', () => {
  const cmdInputs = Object.keys(defaultCommands);

  addAllGuilds(bot.guilds);
  changeActivity(bot, cmdInputs);
  setInterval(() => changeActivity(bot, cmdInputs), 60 * 1000);

  console.log('ready');
});

bot.on('guildCreate', async (guild) => {
  const newsChannel = guild.channels.cache.find(
    (guild) => guild.type === 'text',
  );

  const channelId = newsChannel
    ? newsChannel.id
    : (
        await guild.channels.create('calango-news', {
          reason: "Couldn't find news channel",
          type: 'text',
        })
      ).id;

  db.addGuild(guild.id, channelId);
});

bot.on('guildDelete', async (guild) => {
  db.removeGuild(guild.id);
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
    return msg.channel.send(command.output);
  }
});

bot.login(process.env.TOKEN);
