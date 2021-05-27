async function createTables(query: CallableFunction): Promise<void> {
  await query(
    `CREATE TABLE IF NOT EXISTS guilds (
      id VARCHAR(64) NOT NULL PRIMARY KEY,
      news_channel_id VARCHAR(64)
    );`,
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
    );`,
  );
}

export default createTables;
