import CommandProtocol from '../command-protocol';
import db from '../index';

async function findCommand(
  guildId: string,
  input: string,
): Promise<CommandProtocol> {
  const response = await db.query(
    'SELECT * FROM commands WHERE guild_id = $1 AND input = $2',
    [guildId, input],
  );

  if (response === null) throw new Error('error while finding command');
  return response.rows[0] as CommandProtocol;
}

export default findCommand;
