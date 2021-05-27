import { Pool, QueryResult } from 'pg';
import createTables from './utils/create-tables';
import addGuild from './utils/add-guild';
import updateMainChannelId from './utils/update-main-channel-id';
import getCommands from './utils/get-commands';
import addCommand from './utils/add-commands';

const pool = new Pool();

async function query(
  text: string,
  params?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<QueryResult<any> | null> {
  try {
    return pool.query(text, params);
  } catch (e) {
    return null;
  }
}

createTables();

export default {
  query,
  addGuild,
  updateMainChannelId,
  getCommands,
  addCommand,
};
