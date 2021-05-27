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
