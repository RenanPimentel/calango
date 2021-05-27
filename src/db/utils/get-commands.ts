import CommandProtocol from '../command-protocol';
import db from '../index';

export default async function getCommands(
  guildId: string,
): Promise<CommandProtocol[]> {
  const response = await db.query(
    'SELECT * FROM commands WHERE guild_id = $1',
    [guildId],
  );

  if (response === null) throw new Error('error while adding guild');
  return response.rows as CommandProtocol[];
}
