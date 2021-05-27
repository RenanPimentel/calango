import { Message } from 'discord.js';
import db from '../db';

export default async function all(msg: Message): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;
  const commands = await db.getCommands(msg.guild.id);

  return `this guild commands are: ${commands
    .map((cmd) => cmd.input)
    .join(', ')}`;
}
