import { type Config, addBlocks } from "domco";
import fs from "node:fs/promises";
import { NavItems } from "$lib/blocks/customElements/nav-items";
import { SvgIcon } from "$lib/blocks/customElements/svg-icon";
import { OnThisPage } from "$lib/blocks/customElements/on-this-page";
import { BrandLinks } from "$lib/blocks/customElements/brand-links";
import { processMarkdown } from "robino/util/md";

export const config: Config = {
	layout: await fs.readFile("src/layout.html", "utf-8"),

	build: async ({ document }) => {
		const readme = await fs.readFile("README.md", "utf-8");
		const { html } = await processMarkdown(readme);
		const article = document.querySelector("article");
		if (article) {
			article.insertAdjacentHTML("beforeend", html);
		}
	},

	layoutBuild: async (window, { route }) => {
		addBlocks(window, [NavItems, SvgIcon, OnThisPage, BrandLinks]);

		const { document } = window;

		document.querySelectorAll("h2, h3").forEach((heading) => {
			if (heading && heading.id) {
				const id = heading.id;
				heading.innerHTML = /*html*/ `
					<a href="#${id}" class="not-prose hover:underline hover:decoration-dotted inline-flex items-center gap-1">
						${heading.innerHTML}
					</a>
				`;
			}
		});

		if (route === "/getting-started/") {
			const version = JSON.parse(
				await fs.readFile("package.json", "utf-8"),
			).version;
			const stringSpans = document.querySelectorAll(".hljs-string");
			for (const span of stringSpans) {
				if (span.textContent?.includes("__VERSION__")) {
					span.textContent = `${span.textContent.replace("__VERSION__", version)}`;
				}
			}
		}

		// prevent table overflow causing horizontal scroll
		const tables = document.querySelectorAll("table");
		tables.forEach((table) => {
			const wrapper = document.createElement("div");
			wrapper.classList.add("overflow-x-auto");
			table.parentNode?.insertBefore(wrapper, table);
			wrapper.appendChild(table);
		});

		const anchors = document.querySelectorAll("a");
		for (const anchor of anchors) {
			if (anchor.href === route) {
				anchor.setAttribute("data-current", "");
			}
		}
	},
};
