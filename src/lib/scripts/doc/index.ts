import fs from "node:fs/promises";

const doc = async () => {
	const files = await fs.readdir("src/lib/docs/classes");

	for (const fileName of files) {
		const filePath = `src/lib/docs/classes/${fileName}`;

		let md = await fs.readFile(filePath, "utf-8");

		let lines = md.split("\n");

		for (let i = 0; i < lines.length; i++) {
			if (lines[i]?.startsWith("node\\_modules")) {
				let j = i - 1;
				while (typeof lines[j] === "string" && !lines[j]?.startsWith("***")) {
					lines[j] = "";
					j--;
				}
				lines[i] = "";
			}
		}

		// remove first 6 lines - the titles
		lines = lines.slice(6);

		md = lines.join("\n");

		// remove extra hrs
		md = md.replaceAll(`***\n\n`, "");

		md = md.replaceAll(`\n## `, `\n---\n\n## `);

		md = replaceCamelCaseDocs(md);

		// TODO - remove h2s that do not have anything under them...

		await fs.writeFile(filePath, md);

		await fs.rename(filePath, filePath.toLowerCase());
	}
};

doc();

const replaceCamelCaseDocs = (text: string): string => {
	const regex = /\/docs\/classes\/([A-Z][a-z]*)+\.md/g;
	return text.replace(regex, (match) => {
		const lowercased =
			match.split("/").pop()?.replace(".md", "").toLowerCase() ?? "";
		return `/docs/${lowercased}/`;
	});
};
