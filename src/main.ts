import { config } from 'dotenv';
config({ path: 'src/config/config.env' });

import CreateBotCtrl from './controllers/botCtrl';
import getClient from './utils/get-client';

const bot = getClient();
const botCtrl = CreateBotCtrl.create(bot);

bot.once('ready', () => botCtrl.ready());
bot.on('guildCreate', async (guild) => botCtrl.guildCreate(guild));
bot.on('guildDelete', async (guild) => botCtrl.guildDelete(guild));
bot.on('message', async (msg) => botCtrl.message(msg));
