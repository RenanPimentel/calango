import { Pool, QueryResult } from 'pg';
import createTables from './utils/create-tables';
import addGuild from './utils/add-guild';
import updateMainChannelId from './utils/update-main-channel-id';
import getCommands from './utils/get-commands';
import addCommand from './utils/add-commands';
import removeCommand from './utils/remove-command';
import findCommand from './utils/find-command';

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
  updateMainChannelId,
  getCommands,
  addCommand,
  removeCommand,
  findCommand,
};
