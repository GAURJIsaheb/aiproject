import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config({ path: ".env" }); // or .env.local
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_NEON_POSTGRES);
export const db_VAR = drizzle({ client: sql });