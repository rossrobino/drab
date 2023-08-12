// import fs from "fs/promises";
// import path from "path";
// import { parse } from "marked";

// /**
//  * @param {string} dir components directory
//  */
// export const documentComponents = async (dir) => {
// 	const files = await fs.readdir(dir);
// 	/**
// 	 * @type {{componentDocs: string; code: string;}[]}
// 	 */
// 	const docs = [];
// 	for (const file of files) {
// 		if (path.extname(file) === ".svelte") {
// 			const code = await fs.readFile(path.join(dir, file), "utf-8");
// 			const md = code.split("@component")[1].split("-->")[0].trim();
// 			const lines = md.split("\n");
// 			for (let i = 0; i < lines.length; i++) {
// 				if (lines[i].startsWith("@")) {
// 					lines[i] = lines[i].slice(1);
// 					lines[i] = "#### " + lines[i];
// 				}
// 			}
// 			const html = parse(lines.join("\n"));
// 			docs.push({ componentDocs: html });
// 		}
// 	}
// 	console.log(docs);
// 	let s = "";
// 	for (let i = 0; i < docs.length; i++) {
// 		const doc = docs[i];
// 		s += doc.componentDocs;
// 	}
// 	await fs.writeFile("scripts/test.svelte", s);
// };
