import IGuild from '../IGuild';
import db from '../index';

async function getGuilds(): Promise<IGuild[]> {
  const response = await db.query('SELECT * FROM guilds');

  if (response === null) throw new Error('error while adding guild');

  return response.rows as IGuild[];
}

export default getGuilds;
