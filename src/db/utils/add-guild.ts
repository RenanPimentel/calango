import db from '../index';

async function addGuild(guildId: string, mainChannelId: string): Promise<void> {
  const response = await db.query(
    'INSERT INTO guilds (id, main_channel_id) VALUES ($1, $2)',
    [guildId, mainChannelId],
  );

  if (response === null) throw new Error('error while adding guild');
}

export default addGuild;
