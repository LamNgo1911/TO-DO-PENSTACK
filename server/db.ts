import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "L@mngo0961014196",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});
