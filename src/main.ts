import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import { Client, Collection } from 'discord.js';
import db from './db';
import changeActivity from './utils/change-activity';
import addAllGuilds from './db/utils/add-all-guilds';
import setBotCommands from './utils/set-bot-commands';
import path from 'path';

const bot = new Client();
bot.commands = new Collection();

bot.once('ready', async () => {
  await setBotCommands(bot, path.resolve('dist', 'commands'));
  const cmdInputs = bot.commands.array().map((cmd) => cmd.name);

  addAllGuilds(bot.guilds);
  changeActivity(bot, cmdInputs);
  setInterval(() => changeActivity(bot, cmdInputs), 60 * 1000);

  console.log('ready');
});

bot.on('guildCreate', async (guild) => {
  const newsChannel = guild.channels.cache.find(({ type }) => type === 'text');

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
    .split(/\s+/g);

  if (bot.commands.has(input)) {
    const output = await bot.commands.get(input)?.execute(msg, args);
    return msg.channel.send(output ?? 'Not able to access this command');
  }

  const command = await db.findCommand(msg.guild.id, input);

  if (command) return msg.channel.send(command.output);
});

bot.login(process.env.TOKEN);
