/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Command } from 'discord.js';

type Readdir = (path: string) => Promise<string[]>;
const readdir = require('fs').promises.readdir as Readdir;

async function setBotCommands(client: Client, path: string): Promise<void> {
  const files = await readdir(path);

  files
    .map((file) => file.split('.')[0])
    .forEach((fileName) => {
      const command = require(`${path}/${fileName}`).default as Command;
      client.commands.set(command.name, { ...command });
    });
}

export default setBotCommands;
