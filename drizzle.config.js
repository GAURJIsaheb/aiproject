import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://neondb_owner:9daMEHynCFo4@ep-aged-silence-a8xqub59.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});