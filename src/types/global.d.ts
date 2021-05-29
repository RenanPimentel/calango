declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    PREFIX: string;
    PGUSER: string;
    PGPORT: string;
    PGHOST: string;
    PGDATABASE: string;
    PGPASSWORD: string;
  }
}
