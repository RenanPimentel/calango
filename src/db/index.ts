import { Pool, QueryResult } from 'pg';
import createTables from './utils/create-tables';
import addGuild from './utils/add-guild';
import updateNewsChannelId from './utils/update-news-channel-id';
import getCommands from './utils/get-commands';
import addCommand from './utils/add-command';
import removeCommand from './utils/remove-command';
import findCommand from './utils/find-command';
import getNewsChannelId from './utils/get-news-channel-id';
import getGuilds from './utils/get-guilds';
import removeGuild from './utils/remove-guild';

const pool = new Pool();
async function query(
  text: string,
  params?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<QueryResult<any>> {
  return pool.query(text, params);
}

createTables(query);

export default {
  query,
  addGuild,
  updateNewsChannelId,
  getCommands,
  addCommand,
  removeCommand,
  findCommand,
  getNewsChannelId,
  getGuilds,
  removeGuild,
};
