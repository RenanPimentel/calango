import db from '../index';

export default async function updateMainChannelId(
  guildId: string,
  newMainChannelId: string,
): Promise<void> {
  const response = await db.query(
    'UPDATE guilds SET main_channel_id = $2 WHERE id = $1',
    [guildId, newMainChannelId],
  );

  if (response === null) throw new Error('error while adding guild');
}