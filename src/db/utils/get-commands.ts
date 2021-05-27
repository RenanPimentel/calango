import CommandProtocol from '../command-protocol';
import db from '../index';

async function getCommands(guildId: string): Promise<CommandProtocol[]> {
  const response = await db.query(
    'SELECT * FROM commands WHERE guild_id = $1',
    [guildId],
  );

  if (response === null) throw new Error('error while getting commands');
  return response.rows as CommandProtocol[];
}

export default getCommands;
