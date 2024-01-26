import { Build } from "domco";
import fs from "node:fs/promises";
import { process } from "robino/util/md";
export const build: Build = async ({ document }, { route }) => {
	const md = await fs.readFile(`src/${route}/index.md`, "utf-8");
	const article = document.querySelector("article");

	if (article) {
		article.innerHTML = (await process(md)).html;
	}
};
