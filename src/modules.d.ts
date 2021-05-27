declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    PREFIX: string;
    PGUSER: string;
    PGPORT: number;
    PGHOST: string;
    PGDATABASE: string;
    PGPASSWORD: string;
  }
}

interface Command {
  id: string;
  guild_id: string;
  input: string;
  output: string;
  author_id: string;
}
