import { Message } from 'discord.js';
import db from '../db';
import fs from 'fs';

async function all(msg: Message): Promise<string> {
  if (!msg.guild) return "Couldn't find the guild of the message";
  const commands = await db.getCommands(msg.guild.id);

  if (commands.length === 0) {
    return 'No commands in this server, to add one type: !add <input> <output>';
  }

  const files = await fs.promises.readdir(__dirname);
  const cmdNames = files.map((cmd) => cmd.split('.')[0]).join(', ');
  const allInputs = commands.map((cmd) => cmd.input).join(', ');

  return `Default commands: ${cmdNames}\nServer commands: ${allInputs}`;
}

export default { name: 'all', description: 'get all command', execute: all };
