import fs from "fs/promises";
import path from "path";

/**
 * Runs `documentExample` over a given directory
 *
 * @param {string} dir path to directory
 */
export const documentExampleDir = async (dir) => {
	const files = await fs.readdir(dir);
	for (const file of files) {
		if (path.extname(file) === ".svelte") {
			documentExample(path.join(dir, file));
		}
	}
};

console.log(await fs.readdir("src/routes/docs"));

/**
 * - Finds "@props" in a component
 * - If found, overwrites the docs with the generated docs
 *
 * @param {string} file path to component
 */
export const documentExample = async (file) => {
	const name = path.basename(file).split(".")[0];
	const code = await fs.readFile(file, "utf-8");
	let example = await fs.readFile(
		`src/routes/docs/${name}/+page.svelte`,
		"utf-8",
	);
	example = "\n```svelte\n" + example + "```";
	example = example.replaceAll(
		/import\s+(.*?)\s+from\s+(.*?);/g,
		"import { $1 } from $2;",
	);
	example = example.replaceAll(/\$lib\/components\/(.*?)\.svelte/g, "drab");
	const lines = code.split("\n");
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith("@example")) {
			for (let j = i + 1; j < lines.length; j++) {
				// for the following lines...
				const checkLine = lines[j].trim();
				if (
					checkLine.startsWith("@") ||
					checkLine.startsWith("-->") ||
					checkLine.startsWith("#") ||
					checkLine.startsWith("|")
				) {
					// delete current / add new
					lines.splice(i + 1, j - i - 1, example);
					// join back together
					const documented = lines.join("\n");
					await fs.writeFile(file, documented);
					console.log("Documented example for " + file);
					break;
				}
			}
			break;
		}
		if (i === lines.length - 1) {
			// last line
			console.log("No `@example` found for " + path);
		}
	}
};
