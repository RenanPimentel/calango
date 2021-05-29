import { Client, Collection } from 'discord.js';

function getClient(token = process.env.TOKEN): Client {
  const client = new Client();
  client.commands = new Collection();

  client.login(token);

  return client;
}

export default getClient;
