import fs from "fs/promises";

await fs.copyFile("src/site/md/README.md", "README.md");

console.log("Copied README");
