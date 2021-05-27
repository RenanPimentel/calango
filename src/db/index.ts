import { Pool, QueryResult } from 'pg';
import createTables from './utils/create-tables';
import addGuild from './utils/add-guild';
import updateNewsChannelId from './utils/update-main-channel-id';
import getCommands from './utils/get-commands';
import addCommand from './utils/add-commands';
import removeCommand from './utils/remove-command';
import findCommand from './utils/find-command';
import getNewsChannelId from './utils/get-news-channel-id';
import getGuilds from './utils/get-guilds';

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
};
