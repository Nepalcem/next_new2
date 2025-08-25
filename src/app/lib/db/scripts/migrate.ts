// Added script to run migrations for an empty database
import fs from "fs";
import path from "path";
import sql from "../db";

async function migrate() {
  try {
    const filePath = path.join(process.cwd(), "migrations.sql");
    const queries = fs.readFileSync(filePath, "utf8");

    await sql.unsafe(queries); // run entire file
    console.log("✅ Migration complete");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();
