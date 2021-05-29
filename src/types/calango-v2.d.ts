declare module 'calango-v2' {
  export interface IBotCtrl {
    client: Client;

    ready(): Promise<void> | void;
    message(msg: Message): Promise<void>;
    guildCreate(guild: Guild): Promise<void>;
    guildDelete(guild: Guild): Promise<void>;
  }

  export interface IBotCtrlFactory {
    botCtrl: IBotCtrl | null;
    create(client: Client): IBotCtrl;
  }
}
