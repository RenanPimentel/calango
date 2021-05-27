import { Guild, Message, TextChannel } from 'discord.js';
import db from '../db';

async function createSystemChannel(
  guild: Guild,
  msg?: Message,
): Promise<TextChannel> {
  if (guild.systemChannel !== null) return guild.systemChannel;
  const firstChannel = guild.channels.cache.find(
    (guild) => guild.type === 'text',
  ) as TextChannel;

  try {
    if (firstChannel) {
      guild.setSystemChannel(firstChannel.id ?? null);
      return msg ? (msg.channel as TextChannel) : firstChannel;
    } else {
      const createdChannel = await guild.channels.create('calango', {
        reason: "couldn't find a system channel",
      });
      guild.setSystemChannel(createdChannel.id);
      db.updateMainChannelId(guild.id, createdChannel.id);

      createdChannel.send(
        "I noticed that this server doesn't contain a system channel, so I created one!",
      );
      return msg ? (msg.channel as TextChannel) : createdChannel;
    }
  } catch (e) {
    throw new Error("Couldn't create system channel");
  }
}

export default createSystemChannel;
