import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import { Client, GuildManager, Message } from 'discord.js';
import db from './db';
import add from './controllers/default-commands/add';
import all from './controllers/default-commands/all';
import remove from './controllers/default-commands/remove';
import changeActivity from './utils/change-activity';

interface DefaultCommands {
  [keys: string]: (msg: Message, args: string[]) => string | Promise<string>;
}

const bot = new Client();

const defaultCommands: DefaultCommands = { add, all, remove };

const addAllGuilds = async (guilds: GuildManager) => {
  const dbGuilds = await db.getGuilds();
  guilds.cache.forEach((guild) => {
    if (!dbGuilds.find((dbGuild) => dbGuild.id === guild.id)) {
      db.addGuild(guild.id);
    }
  });
};

bot.once('ready', () => {
  const cmdInputs = Object.keys(defaultCommands);

  addAllGuilds(bot.guilds);
  changeActivity(bot, cmdInputs);
  setInterval(() => changeActivity(bot, cmdInputs), 60 * 1000);

  console.log('ready');
});

bot.on('guildCreate', async (guild) => {
  const newsChannel = guild.channels.cache.find(
    (guild) => guild.type === 'news',
  );

  const channelId = newsChannel
    ? newsChannel.id
    : (
        await guild.channels.create('calango', {
          reason: "Couldn't find news channel",
          type: 'news',
        })
      ).id;

  guild.setPublicUpdatesChannel(channelId);

  db.addGuild(guild.id, channelId);
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
