import { type Build } from "domco";
import fs from "node:fs/promises";
import { process } from "robino/util/md";

export const build: Build = async ({ document }) => {
	const readme = await fs.readFile("README.md", "utf-8");
	const { html } = process(readme);
	const article = document.querySelector("article");
	if (article) {
		article.innerHTML = html;
	}
};
