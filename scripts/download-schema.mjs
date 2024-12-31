import fs from "fs/promises";
import path from "path";

const SCHEMA_URL =
  "https://raw.githubusercontent.com/neptun-software/neptun.web/main/backup/schema/schema.png";
const OUTPUT_DIR = "docs/assets/schema";
const OUTPUT_FILE = "schema.png";

async function downloadSchema() {
  try {
    console.log("Downloading schema...");
    const response = await fetch(SCHEMA_URL);

    if (!response.ok) {
      throw new Error(`Failed to download schema: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(path.join(OUTPUT_DIR, OUTPUT_FILE), buffer);

    console.log("Schema downloaded successfully!");
  } catch (error) {
    console.error("Error downloading schema:", error);
    process.exit(1);
  }
}

downloadSchema();
