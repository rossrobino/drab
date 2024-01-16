import fs from "node:fs/promises";

const doc = async () => {
	const files = await fs.readdir("src/lib/docs/classes");

	for (const fileName of files) {
		const filePath = `src/lib/docs/classes/${fileName}`;

		let md = await fs.readFile(filePath, "utf-8");

		let lines = md.split("\n");

		for (let i = 0; i < lines.length; i++) {
			if (lines[i]?.startsWith("node_modules")) {
				let j = i - 1;
				while (
					typeof lines[j] === "string" &&
					!lines[j]?.startsWith("___") &&
					!lines[j]?.startsWith("## ")
				) {
					lines[j] = "";
					j--;
				}
				lines[i] = "";
			}
		}

		// remove first two lines - the title
		lines = lines.slice(2);

		md = lines.join("\n");

		// remove extra hrs
		md = md.replaceAll(`___\n\n`, "");

		md = md.replaceAll(`\n## `, `\n---\n\n## `);

		// TODO - remove h2s that do not have anything under them...

		await fs.writeFile(filePath, md);
	}
};

doc();
