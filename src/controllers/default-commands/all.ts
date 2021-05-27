import { Message } from 'discord.js';
import db from '../../db';
import fs from 'fs';

async function all(msg: Message): Promise<string> {
  if (!msg.guild) return "Couldn't find the guild of the message";

  const defaultCommands = await fs.promises.readdir(__dirname);

  const commands = await db.getCommands(msg.guild.id);
  const allInputs = commands.map((cmd) => cmd.input).join(', ');
  return allInputs === ''
    ? 'No commands in this server, to add one type: !add <input> <output>'
    : `Default commands: ${defaultCommands
        .map((cmd) => cmd.split('.')[0])
        .join(', ')}\nServer commands: ${allInputs}`;
}

export default all;
