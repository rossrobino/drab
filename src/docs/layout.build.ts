import { Build } from "domco";
import fs from "node:fs/promises";
import { process } from "robino/util/md";

export const build: Build = async ({ document }, { route }) => {
	const h1 = document.querySelector("h1");
	const name = String(route.split("/").at(-1));
	if (h1) h1.textContent = name;

	document.title = "drab - " + name;

	const sourceLink = document.querySelector<HTMLAnchorElement>("#sourceLink");
	if (sourceLink) {
		sourceLink.href = `https://github.com/rossrobino/drab/tree/main/src/package/${name}/index.ts`;
	}

	const example = await fs.readFile(`src/docs/${name}/index.html`, "utf-8");

	const exampleDiv = document.querySelector("#example");

	if (exampleDiv)
		exampleDiv.innerHTML = process(`\`\`\`html\n${example}\n\`\`\``).html;

	const reference = await fs.readFile(
		`src/lib/docs/classes/${name}.md`,
		"utf-8",
	);

	const referenceDiv = document.querySelector("#reference");

	if (referenceDiv) {
		referenceDiv.innerHTML = process(reference).html;
	}
};
