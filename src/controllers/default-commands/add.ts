import { Message, TextChannel } from 'discord.js';
import db from '../../db';
import CommandProtocol from '../../db/command-protocol';
import findCommand from '../../db/utils/find-command';
import createSystemChannel from '../../utils/create-system-channel';

async function add(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return "Couldn't find the guild of the message";

  const command: CommandProtocol = {
    id: msg.id,
    author_id: msg.author.id,
    guild_id: msg.guild.id,
    input: args[0],
    output: args.slice(1).join(' '),
  };

  if (!command.output) {
    return `Usage: ${process.env.PREFIX}add <input> <output>`;
  }

  let newSysChannel: null | TextChannel = null;
  if (!msg.guild.systemChannel) {
    try {
      newSysChannel = await createSystemChannel(msg.guild, msg);
    } catch (e) {
      return e.message;
    }
  } else {
    newSysChannel = msg.guild.systemChannel;
  }

  const findedCommand = await findCommand(msg.guild.id, command.input);

  if (findedCommand) {
    return `This command already exists and it's output is: '${findedCommand.output}'`;
  }

  const dbCommand = await db.addCommand(
    command,
    newSysChannel.id,
    msg.guild.ownerID,
  );

  return `Added command '${dbCommand.input}' successfully`;
}

export default add;
