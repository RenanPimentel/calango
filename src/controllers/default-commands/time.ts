import { Message } from 'discord.js';
import getTimeLeft from '../../utils/get-time-left';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flat<T>(arr: any[], stack?: T[]): T[] {
  stack = stack ? stack : [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      flat(arr[i], stack);
    } else {
      stack.push(arr[i]);
    }
  }
  return stack;
}

async function time(msg: Message, args: string[]): Promise<string> {
  if (!msg.guild) return "Couldn't find the guild of the message";
  const time = args.slice(0, 4);
  const timeArgs = flat<string>(time.map((arg) => arg.match(/\d+/g)));

  if (args.length < 5) {
    return `Usage: ${process.env.PREFIX}time <month> <day> <hour> <minute> <message>`;
  }

  const [month, day, hour, minute] = timeArgs.map(Number);

  const now = new Date();
  const date = new Date(now.getFullYear(), month - 1, day, hour, minute, 0, 0);

  const diff = Number(date) - Number(now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  return getTimeLeft({ days, hours, minutes, seconds });
}

export default time;
