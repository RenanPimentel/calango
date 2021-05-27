import ICommand from '../ICommand';
import db from '../index';

async function addCommand(
  cmd: ICommand,
  mainChannelId: string,
  adminId: string,
): Promise<ICommand> {
  const guild = (
    await db.query('SELECT * FROM guilds WHERE id = $1', [cmd.guild_id])
  )?.rows[0];

  if (!guild) {
    await db.query(
      'INSERT INTO guilds (id, main_channel_id, admin_id) VALUES ($1, $2, $3)',
      [cmd.guild_id, mainChannelId, adminId],
    );
  }

  const response = await db.query(
    'INSERT INTO commands (id, guild_id, input, output, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [cmd.id, cmd.guild_id, cmd.input, cmd.output, cmd.author_id],
  );

  if (response === null) throw new Error('error while adding guild');
  return response.rows[0] as ICommand;
}

export default addCommand;
