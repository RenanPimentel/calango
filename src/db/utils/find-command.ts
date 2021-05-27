import ICommand from '../ICommand';
import db from '../index';

async function findCommand(
  guildId: string,
  cmdInput: string,
): Promise<ICommand> {
  const response = await db.query(
    'SELECT * FROM commands WHERE guild_id = $1 AND input = $2',
    [guildId, cmdInput],
  );

  if (response === null) throw new Error('error while finding command');
  return response.rows[0] as ICommand;
}

export default findCommand;
