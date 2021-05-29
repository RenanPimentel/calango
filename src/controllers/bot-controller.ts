import { readdirSync } from 'fs';
import { IBotCtrl, IBotCtrlFactory } from 'calango-v2';
import { Client, Guild, Message, Command } from 'discord.js';
import path from 'path';
import db from '../db';
import addAllGuilds from '../db/utils/add-all-guilds';
import changeActivity from '../utils/change-activity';

class BotCtrl implements IBotCtrl {
  constructor(public client: Client) {}

  async message(msg: Message): Promise<void> {
    if (msg.author.bot || msg.channel.type !== 'text' || !msg.guild) return;

    const [input, ...args] = msg.content
      .slice(process.env.PREFIX?.length)
      .split(/\s+/g);

    if (this.client.commands.has(input)) {
      const output = await this.client.commands.get(input)?.execute(msg, args);
      msg.channel.send(output ?? 'Not able to access this command');
      return;
    }

    const command = await db.findCommand(msg.guild.id, input);

    if (command) msg.channel.send(command.output);
  }

  async guildDelete(guild: Guild): Promise<void> {
    await db.removeGuild(guild.id);
  }

  ready(): void {
    const cmdPath = path.resolve('dist', 'commands');
    const files = readdirSync(cmdPath);

    files
      .map((file) => file.replace(/\..+/g, ''))
      .forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`${cmdPath}/${file}`).default as Command;
        this.client.commands.set(command.name, { ...command });
      });
    const cmdInputs = this.client.commands.array().map((cmd) => cmd.name);

    addAllGuilds(this.client.guilds);
    changeActivity(this.client, cmdInputs);
    setInterval(() => changeActivity(this.client, cmdInputs), 60 * 1000);

    console.log('ready');
  }

  async guildCreate({ channels, id }: Guild): Promise<void> {
    const newsChannel = channels.cache.find(({ type }) => type === 'text');

    const channelId = newsChannel
      ? newsChannel.id
      : (
          await channels.create('calango-news', {
            reason: "Couldn't find news channel",
            type: 'text',
          })
        ).id;

    db.addGuild(id, channelId);
  }
}

function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

@staticImplements<IBotCtrlFactory>()
class CreateBotCtrl {
  static botCtrl: null | IBotCtrl = null;

  static create(client: Client): IBotCtrl {
    if (CreateBotCtrl.botCtrl === null) {
      CreateBotCtrl.botCtrl = new BotCtrl(client);
    }
    return CreateBotCtrl.botCtrl;
  }
}

export default CreateBotCtrl;
