import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import { Client, Message } from 'discord.js';
import db from './db';

const bot = new Client();

async function add(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;
  const command: Command = {
    id: msg.id,
    author_id: msg.author.id,
    guild_id: msg.guild.id,
    input: args[0],
    output: args.slice(1).join(' '),
  };

  if (!msg.guild.systemChannelID) return `Couldn't find the system channel`;

  const dbCommand = await db.addCommand(
    command,
    msg.guild.systemChannelID,
    msg.guild.ownerID,
  );

  return `Added command '${dbCommand.input}' successfully`;
}

interface DefaultCommands {
  [keys: string]: CallableFunction;
}

const defaultCommands: DefaultCommands = {
  add,
};

bot.once('ready', async () => {
  bot.guilds.cache.forEach(async (guild) => {
    if (guild.systemChannel !== null) return;

    const createdChannel = await guild.channels.create('calango', {
      reason: `couldn't find system channel`,
      topic: 'this is a required system channel',
    });
    guild.setSystemChannel(createdChannel.id);

    db.updateMainChannelId(guild.id, createdChannel.id);
  });
  console.log('ready');
});

bot.on('guildCreate', async (guild) => {
  const channelId =
    guild.systemChannelID !== null
      ? guild.systemChannelID
      : (
          await guild.channels.create('calango', {
            reason: `couldn't find system channel`,
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
    msg.channel.send(await defaultCommands[input](msg, args));
    return;
  }
  const commands = await db.getCommands(msg.guild.id);
  const command = commands.find((cmd) => cmd.input === input);

  if (command) msg.channel.send(command.output);
});

bot.login(process.env.TOKEN);
