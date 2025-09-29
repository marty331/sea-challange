import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create a connection pool for queries
const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle(queryClient);

export default db;