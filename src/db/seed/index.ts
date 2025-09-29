import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "../schema";
import { advocateData } from "../seed/advocates";

// Seed function to populate the database with initial data


async function setup() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }
  

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);

  try {
    // Insert advocate data into the database
    await db.insert(advocates).values(advocateData);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await queryClient.end();
  }

  console.log("Database setup complete");
  
};

setup();
