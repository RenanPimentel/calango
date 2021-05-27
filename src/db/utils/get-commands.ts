import ICommand from '../ICommand';
import db from '../index';

async function getCommands(guildId: string): Promise<ICommand[]> {
  const response = await db.query(
    'SELECT * FROM commands WHERE guild_id = $1',
    [guildId],
  );

  if (response === null) throw new Error('error while getting commands');
  return response.rows as ICommand[];
}

export default getCommands;
