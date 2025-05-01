import fs from "node:fs/promises";
import path from "node:path";

const doc = async () => {
	const files = await fs.readdir("apps/docs/src/pages/docs/generated/classes", {
		withFileTypes: true,
	});

	for (const file of files) {
		const filePath = path.join(file.parentPath, file.name);

		let md = await fs.readFile(filePath, "utf-8");

		md = replaceCamelCaseDocs(md);
		md = removeExtends(md);

		await fs.writeFile(filePath, md);
		await fs.rename(filePath, filePath.toLowerCase());
	}
};

/**
 * @param {string} text
 */
const replaceCamelCaseDocs = (text) => {
	const regex = /\/PUBLIC_PATH\/classes\/([A-Z][a-z]*)+\.md/g;
	return text.replace(regex, (match) => {
		const lowercased =
			match.split("/").pop()?.replace(".md", "").toLowerCase() ?? "";
		return `/elements/${lowercased}/`;
	});
};

/**
 * @param {string} md
 */
const removeExtends = (md) =>
	md.replace(/^##\s+Extends[\s\S]*?(?=^##\s+)/gm, "");

await doc();
