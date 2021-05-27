import { Guild, TextChannel } from 'discord.js';
import db from '../db';

async function createNewsChannel(guild: Guild): Promise<TextChannel> {
  const newsChannelId = await db.getNewsChannelId(guild.id);
  const newsChannel = guild.channels.resolve(newsChannelId) as TextChannel;

  if (newsChannel) {
    return newsChannel;
  } else {
    try {
      const findedCategory = guild.channels.cache.find(
        (channel) => channel.type === 'category' && channel.name === 'news',
      );

      const createdCategory = findedCategory
        ? findedCategory
        : await guild.channels.create('news', { type: 'category' });

      const createdChannel = (await guild.channels.create('calango-news', {
        reason: "couldn't find a news channel",
        topic: 'Calango news channel',
        type: 'text',
      })) as TextChannel;

      createdChannel.setParent(createdCategory.id);
      createdCategory.updateOverwrite(guild.roles.everyone, {
        SEND_MESSAGES: false,
      });

      guild.owner?.send(
        `automatically added news category and channel called ${createdCategory.name} and '${createdChannel.name}' respectively in your server, you can modify it but not delete it`,
      );
      createdChannel.send(
        "I noticed that this server doesn't contain a news channel, so I created one!",
      );
      return createdChannel;
    } catch (e) {
      throw new Error("Couldn't create news channel");
    }
  }
}

export default createNewsChannel;
