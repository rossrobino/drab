import fs from "fs/promises";
import path from "path";

/**
 * Runs `documentProps` over a given directory
 *
 * @param {string} dir path to directory
 */
export const documentPropsDir = async (dir) => {
	const files = await fs.readdir(dir);
	for (const file of files) {
		if (path.extname(file) === ".svelte") {
			documentProps(path.join(dir, file));
		}
	}
};

/**
 * - Finds "@props" in a component
 * - If found, overwrites the docs with the generated docs
 *
 * @param {string} path path to component
 */
export const documentProps = async (path) => {
	const code = await fs.readFile(path, "utf-8");
	const lines = code.split("\n");
	const docs = getPropDocs(lines);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith("@props")) {
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
					lines.splice(i + 1, j - i - 1, docs);
					// join back together
					const documented = lines.join("\n");
					await fs.writeFile(path, documented);
					console.log("Documented props for " + path);
					break;
				}
			}
			break;
		}
		if (i === lines.length - 1) {
			// last line
			console.log("No `@props` found for " + path);
		}
	}
};

/**
 * - Finds the props and JSDoc comments
 *
 * @param {string[]} lines lines of code
 */
const getPropDocs = (lines) => {
	const docs = ["\n"];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		const isClass = line === "export { className as class };";
		if (line.startsWith("export let ") || isClass) {
			let propName = line.split(" ")[2];
			if (isClass) {
				propName = "class";
			}
			if (propName.endsWith(":")) propName = propName.slice(0, -1);
			const previousLine = lines[i - 1].trim();
			let jsDoc = "";
			if (previousLine.endsWith("*/")) {
				if (previousLine.startsWith("/**")) {
					jsDoc = "- " + previousLine.slice(3, -2).trim();
				}
			}
			docs.push(`- \`${propName}\` ${jsDoc}\n`);
		}
	}
	docs.sort();
	return docs.join("");
};
