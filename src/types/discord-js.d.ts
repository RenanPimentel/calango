declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }

  export interface Command {
    name: string;
    description: string;
    execute: (message: Message, args: string[]) => Promise<string>;
  }
}
