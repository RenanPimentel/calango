import { Message } from 'discord.js';
import db from '../../db';

async function remove(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return `Couldn't find the guild of the message`;

  const input = args[0];

  if (input === '') {
    return 'Usage: !remove <input>';
  }

  const toBeRemovedCommand = await db.findCommand(msg.guild.id, input);

  if (!toBeRemovedCommand) {
    return `This server doesn't contains the command '${input}'`;
  }

  if (
    toBeRemovedCommand.author_id !== msg.author.id &&
    msg.guild.ownerID !== msg.author.id
  ) {
    return 'you are not allowed to remove this command';
  }

  const removedCommand = await db.removeCommand(toBeRemovedCommand.id);

  return `removed '${removedCommand.input}' successfully`;
}

export default remove;
