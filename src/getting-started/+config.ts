import type { Config } from "domco";
import fs from "node:fs/promises";
import { processMarkdown } from "robino/util/md";

export const config: Config = {
	build: async ({ document }, { route }) => {
		const md = await fs.readFile(`src/${route}index.md`, "utf-8");
		const article = document.querySelector("article");

		if (article) {
			article.insertAdjacentHTML("beforeend", (await processMarkdown(md)).html);
		}
	},
};
