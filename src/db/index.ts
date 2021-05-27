import { Pool, QueryResult } from 'pg';

const pool = new Pool();

async function query(
  text: string,
  params: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<QueryResult<any> | null> {
  try {
    return pool.query(text, params);
  } catch (e) {
    return null;
  }
}

async function addGuild(
  guildId: string,
  mainChannelId: string,
  adminId: string,
): Promise<void> {
  const response = await query(
    'INSERT INTO guilds (id, main_channel_id, admin_id) VALUES ($1, $2, $3)',
    [guildId, mainChannelId, adminId],
  );

  if (response === null) throw new Error('error while adding guild');
}

async function updateMainChannelId(
  guildId: string,
  newMainChannelId: string,
): Promise<void> {
  const response = await query(
    'UPDATE guilds SET main_channel_id = $2 WHERE id = $1',
    [guildId, newMainChannelId],
  );

  if (response === null) throw new Error('error while adding guild');
}

async function getCommands(guildId: string): Promise<Command[]> {
  const response = await query('SELECT * FROM commands WHERE guild_id = $1', [
    guildId,
  ]);

  if (response === null) throw new Error('error while adding guild');
  return response.rows as Command[];
}

async function addCommand(
  cmd: Command,
  mainChannelId: string,
  adminId: string,
): Promise<Command> {
  const guild = (
    await query('SELECT * FROM guilds WHERE id = $1', [cmd.guild_id])
  )?.rows[0];

  if (!guild) {
    await query(
      'INSERT INTO guilds (id, main_channel_id, admin_id) VALUES ($1, $2, $3)',
      [cmd.guild_id, mainChannelId, adminId],
    );
  }

  const response = await query(
    'INSERT INTO commands (id, guild_id, input, output, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [cmd.id, cmd.guild_id, cmd.input, cmd.output, cmd.author_id],
  );

  if (response === null) throw new Error('error while adding guild');
  return response.rows[0] as Command;
}

async function createTables() {
  await query(
    `CREATE TABLE IF NOT EXISTS guilds (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    main_channel_id VARCHAR(64) NOT NULl,
    admin_id VARCHAR(64) NOT NULL
  );`,
    [],
  );

  await query(
    `CREATE TABLE IF NOT EXISTS commands (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    guild_id VARCHAR(64) NOT NULL,
    author_id VARCHAR(64) NOT NULL,
    input VARCHAR(128) NOT NULL,
    output VARCHAR(128) NOT NULL,
    FOREIGN KEY (guild_id)
      REFERENCES guilds (id)
      ON DELETE SET NULL
  );
  `,
    [],
  );
}

createTables();

export default {
  query,
  addGuild,
  updateMainChannelId,
  getCommands,
  addCommand,
};
