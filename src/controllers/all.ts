import { Message } from 'discord.js';
import db from '../db';

async function all(msg: Message): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;

  const commands = await db.getCommands(msg.guild.id);
  const allInputs = commands.map((cmd) => cmd.input).join(', ');
  return allInputs === ''
    ? 'No commands in this server, to add one type: !add <input> <output>'
    : `this server commands are: ${allInputs}`;
}

export default all;
