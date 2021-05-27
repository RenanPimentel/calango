import { Guild } from 'discord.js';
import db from '../db';

async function createSystemChannel(guild: Guild): Promise<void> {
  if (guild.systemChannel !== null) return;

  try {
    const createdChannel = await guild.channels.create('calango', {
      reason: "couldn't find a system channel",
    });
    guild.setSystemChannel(createdChannel.id);
    db.updateMainChannelId(guild.id, createdChannel.id);

    createdChannel.send(
      "I noticed that this server doesn't contain a system channel, so I created one!",
    );
  } catch (e) {
    throw new Error("couldn't create system channel");
  }
}

export default createSystemChannel;
