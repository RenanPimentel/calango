import { Message } from 'discord.js';
import db from '../db';

async function remove(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;

  const newInput = args[0];

  if (!newInput) return 'Usage: !remove <input>';

  const toBeRemovedCommand = await db.findCommand(msg.guild.id, newInput);

  if (!toBeRemovedCommand) {
    return `This server doesn't contains the command '${newInput}'`;
  }

  if (
    toBeRemovedCommand.author_id !== msg.author.id &&
    msg.guild.ownerID !== msg.author.id
  ) {
    return 'Only the author of the command or the server owner can remove a command';
  }

  const removedCommand = await db.removeCommand(toBeRemovedCommand.id);

  return `removed '${removedCommand.input}' successfully`;
}

export default {
  name: 'remove',
  description: 'remove a command',
  execute: remove,
};
