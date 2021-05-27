import { Client } from 'discord.js';

function changeActivity({ user }: Client, activities: string[]): void {
  const status = activities[Math.floor(Math.random() * activities.length)];
  user?.setActivity({
    name: process.env.PREFIX + status,
    type: 'PLAYING',
  });
}

export default changeActivity;
