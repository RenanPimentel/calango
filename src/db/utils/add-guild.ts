import db from '../index';

async function addGuild(
  guildId: string,
  newsChannelId?: string,
): Promise<void> {
  if (newsChannelId) {
    const response = await db.query(
      'INSERT INTO guilds (id, news_channel_id) VALUES ($1, $2)',
      [guildId, newsChannelId],
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
