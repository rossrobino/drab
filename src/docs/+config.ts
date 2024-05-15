import type { Config } from "domco";
import fs from "node:fs/promises";
import { processMarkdown } from "robino/util/md";

export const config: Config = {
	layout: await fs.readFile("src/docs/layout.html", "utf-8"),

	layoutBuild: async ({ document }, { route }) => {
		const h1 = document.querySelector("h1");
		const name = String(route.split("/").at(-2));
		if (h1) h1.textContent = name;

		document.title = "drab - " + name;

		const sourceLink = document.querySelector<HTMLAnchorElement>("#sourceLink");
		if (sourceLink) {
			sourceLink.href = `https://github.com/rossrobino/drab/tree/main/src/package/${name}/index.ts`;
		}

		let example = await fs.readFile(`src/docs/${name}/index.html`, "utf-8");

		const exampleDiv = document.querySelector("#example");

		if (exampleDiv)
			exampleDiv.innerHTML = (
				await processMarkdown(
					`\`\`\`html\n${example.split("\n").slice(2).join("\n")}\n\`\`\``,
				)
			).html;

		let reference: string;
		try {
			reference = await fs.readFile(`src/lib/docs/classes/${name}.md`, "utf-8");
		} catch {
			reference =
				"No docs found. Run `bun doc` after exporting the component from `src/package/index.ts`";
		}

		const referenceDiv = document.querySelector("#reference");

		if (referenceDiv) {
			referenceDiv.innerHTML = (
				await processMarkdown(`## Overview\n\n${reference}`)
			).html;

			// set meta description
			const metaDesc = document.head.querySelector("meta[name='description']");

			// selects the first child after the `Overview` heading
			const desc = referenceDiv.children[1]?.textContent;

			if (metaDesc && desc) metaDesc.setAttribute("content", desc);
		}
	},
};
