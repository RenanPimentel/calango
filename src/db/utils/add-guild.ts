import db from '../index';

async function addGuild(
  guildId: string,
  mainChannelId?: string,
): Promise<void> {
  if (mainChannelId) {
    const response = await db.query(
      'INSERT INTO guilds (id, main_channel_id) VALUES ($1, $2)',
      [guildId, mainChannelId],
    );
    if (response === null) throw new Error('error while adding guild');
  } else {
    const response = await db.query('INSERT INTO guilds (id) VALUES ($1)', [
      guildId,
    ]);
    if (response === null) throw new Error('error while adding guild');
  }
}

export default addGuild;
