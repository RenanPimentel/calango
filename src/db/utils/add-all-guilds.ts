import { GuildManager } from 'discord.js';
import db from '..';
import IGuild from '../IGuild';

async function addAllGuilds(guilds: GuildManager): Promise<void> {
  const dbGuilds = await db.getGuilds();
  guilds.cache.forEach((guild) => {
    if (!dbGuilds.find((dbGuild: IGuild) => dbGuild.id === guild.id)) {
      db.addGuild(guild.id);
    }
  });
}

export default addAllGuilds;
