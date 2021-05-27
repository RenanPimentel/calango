import db from '../index';

export default async function createTables(): Promise<void> {
  await db.query(
    `CREATE TABLE IF NOT EXISTS guilds (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    main_channel_id VARCHAR(64) NOT NULl,
    admin_id VARCHAR(64) NOT NULL
  );`,
  );

  await db.query(
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
  );
}
