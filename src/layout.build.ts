import { type Build } from "domco";
import fs from "node:fs/promises";

const elements = await fs.readdir("src/docs", {
	withFileTypes: true,
});

export const build: Build = async ({
	document,
	customElements,
	HTMLElement,
}) => {
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
				for (const el of elements) {
					if (el.isDirectory()) {
						const li = document.createElement("li");
						li.classList.add("pl-0");
						const a = document.createElement("a");
						a.href = `/docs/${el.name}/`;
						a.textContent = el.name;
						li.append(a);
						this.append(li);
					}
				}
			}
		},
	);

	customElements.define(
		"svg-icon",
		class extends HTMLElement {
			connectedCallback() {
				const icon = this.getAttribute("icon");

				let html: string;

				switch (icon) {
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
};
