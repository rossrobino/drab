import { type Build } from "domco";
import fs from "node:fs/promises";

const elements = await fs.readdir("src/docs", {
	withFileTypes: true,
});

export const build: Build = async (
	{ document, customElements, HTMLElement },
	{ route },
) => {
	const headings = document.querySelectorAll("h2, h3");

	headings.forEach((heading) => {
		if (heading && heading.id) {
			const id = heading.id;
			heading.innerHTML = /*html*/ `
				<a href="#${id}" class="not-prose hover:underline hover:decoration-dotted inline-flex items-center gap-1">
					${heading.innerHTML}
				</a>
			`;
		}
	});

	customElements.define(
		"on-this-page",
		class extends HTMLElement {
			connectedCallback() {
				const ul = this.querySelector("ul");
				if (ul) {
					headings.forEach((heading) => {
						if (heading.id) {
							const li = document.createElement("li");
							li.classList.add("pl-0");
							const a = document.createElement("a");
							a.href = `#${heading.id}`;
							a.textContent = heading.textContent;
							li.append(a);
							if (heading.tagName === "H3") {
								const nested = document.createElement("ul");
								nested.classList.add("my-0");
								nested.append(li);
								ul.append(nested);
							} else {
								li.classList.add("list-none");
								ul.append(li);
							}
						}
					});
				}
			}
		},
	);

	customElements.define(
		"nav-items",
		class extends HTMLElement {
			connectedCallback() {
				this.innerHTML = /* html */ `
					<li><a href="/">Read me</a></li>
					<li><a href="/getting-started/">Getting started</a></li>
					<li>Reference</li>
					<ul class="m-0" id="baseElements"></ul>
					<li>Elements</li>
					<ul class="m-0" id="elements"></ul>
				`;
				for (const el of elements) {
					if (el.isDirectory()) {
						const li = document.createElement("li");
						li.classList.add("pl-0");
						const a = document.createElement("a");
						a.href = `/docs/${el.name}/`;
						a.textContent = el.name;
						li.append(a);
						let ul: HTMLUListElement;
						if (el.name === "base" || el.name === "animate") {
							ul = this.querySelector("#baseElements") as HTMLUListElement;
							// so base comes first
							ul.prepend(li);
						} else {
							ul = this.querySelector("#elements") as HTMLUListElement;
							ul.append(li);
						}
					}
				}
			}
		},
	);

	customElements.define(
		"svg-icon",
		class extends HTMLElement {
			get icon() {
				return this.getAttribute("icon");
			}
			connectedCallback() {
				let html: string;

				switch (this.icon) {
					case "bars":
						html = /*html*/ `
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									fill-rule="evenodd"
									d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
									clip-rule="evenodd"
								/>
							</svg>
						`;
						break;
					case "close":
						html = /*html*/ `
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									fill-rule="evenodd"
									d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						`;
						break;
					case "chevron":
						html = /*html*/ `
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								width="1rem"
								height="1rem"
							>
								<path
									fill-rule="evenodd"
									d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						`;
						break;
					default:
						html = "No icon found";
						break;
				}

				this.innerHTML = html;
			}
		},
	);

	if (route === "/getting-started") {
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
};
