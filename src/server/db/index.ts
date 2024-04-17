import * as schema from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "~/env";
import postgres from "postgres";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
