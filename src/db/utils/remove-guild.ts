import db from '../index';

async function removeGuild(guildId: string): Promise<void> {
  const promises = [
    db.query('DELETE FROM guilds WHERE id = $1', [guildId]),
    db.query('DELETE FROM commands WHERE guild_id = $1', [guildId]),
  ];

  await Promise.all(promises);
}

export default removeGuild;
