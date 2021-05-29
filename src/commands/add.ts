import { Message, TextChannel } from 'discord.js';
import db from '../db';
import ICommand from '../db/ICommand';
import findCommand from '../db/utils/find-command';
import createNewsChannel from '../utils/create-news-channel';

async function add(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return "Couldn't find the guild of the message";

  const command: ICommand = {
    id: msg.id,
    author_id: msg.author.id,
    guild_id: msg.guild.id,
    input: args[0],
    output: args.slice(1).join(' ').replace(/\s+/g, ' '),
  };

  if (!command.output) {
    return `Usage: ${process.env.PREFIX}add <input> <output>`;
  }

  const newsChannel = msg.guild.channels.cache.find(
    (guild) => guild.name === 'calango-news',
  ) as TextChannel | undefined;

  if (!newsChannel) {
    try {
      await createNewsChannel(msg.guild);
    } catch (e) {
      return e.message;
    }
  }

  const findedCommand = await findCommand(msg.guild.id, command.input);

  if (findedCommand) {
    return `This command already exists and it's output is '${findedCommand.output}'`;
  }
  try {
    const dbCommand = await db.addCommand(command);
    return `Added command '${dbCommand.input}' successfully`;
  } catch (e) {
    return "Can't create this command, output or input is too long";
  }
}

export default { name: 'add', description: 'Add a command', execute: add };
