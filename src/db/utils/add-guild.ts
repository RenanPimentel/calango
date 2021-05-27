import db from '../index';

async function addGuild(
  guildId: string,
  mainChannelId: string,
  adminId: string,
): Promise<void> {
  const response = await db.query(
    'INSERT INTO guilds (id, main_channel_id, admin_id) VALUES ($1, $2, $3)',
    [guildId, mainChannelId, adminId],
  );

  if (response === null) throw new Error('error while adding guild');
}

export default addGuild;
