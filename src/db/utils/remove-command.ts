import ICommand from '../ICommand';
import db from '../index';

async function removeCommand(id: string): Promise<ICommand> {
  const response = await db.query(
    'DELETE FROM commands WHERE id = $1 RETURNING *',
    [id],
  );

  if (response === null) throw new Error('error while removing command');
  return response.rows[0] as ICommand;
}

export default removeCommand;
