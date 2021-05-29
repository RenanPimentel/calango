/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Command } from 'discord.js';
import { readdirSync } from 'fs';

function setBotCommands(client: Client, path: string): void {
  const files = readdirSync(path);

  files
    .map((file) => file.split('.')[0])
    .forEach((fileName) => {
      const command = require(`${path}/${fileName}`).default as Command;
      client.commands.set(command.name, { ...command });
    });
}

export default setBotCommands;
