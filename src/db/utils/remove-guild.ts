import db from '../index';

async function removeGuild(guildId: string): Promise<void> {
  await db.query('DELETE FROM guilds WHERE id = $1', [guildId]);
}

export default removeGuild;
