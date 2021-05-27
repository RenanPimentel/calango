import db from '../index';

async function updateNewsChannelId(
  guildId: string,
  newsChannelId: string,
): Promise<void> {
  const response = await db.query(
    'UPDATE guilds SET news_channel_id = $2 WHERE id = $1',
    [guildId, newsChannelId],
  );

  if (response === null) {
    throw new Error('error while updating main channel id');
  }
}

export default updateNewsChannelId;
