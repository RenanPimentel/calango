import { Message } from 'discord.js';
import db from '../db';
import CommandProtocol from '../db/command-protocol';

export default async function add(
  msg: Message,
  args: string[],
): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;
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

  if (!msg.guild.systemChannelID) return `Couldn't find the system channel`;

  const dbCommand = await db.addCommand(
    command,
    msg.guild.systemChannelID,
    msg.guild.ownerID,
  );

  return `Added command '${dbCommand.input}' successfully`;
}
