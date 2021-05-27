import db from '../index';

async function getNewsChannelId(id: string): Promise<string> {
  const response = await db.query('SELECT * FROM guilds WHERE id = $1', [id]);

  if (response === null) throw new Error('error while adding guild');

  return response.rows[0].news_channel_id;
}

export default getNewsChannelId;
