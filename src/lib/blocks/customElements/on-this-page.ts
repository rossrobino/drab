import type { Block } from "domco";

export const OnThisPage: Block = async ({
	document,
	customElements,
	HTMLElement,
}) => {
	customElements.define(
		"on-this-page",
		class extends HTMLElement {
			connectedCallback() {
				const ul = this.querySelector("ul");
				if (ul) {
					document.querySelectorAll("h2, h3").forEach((heading) => {
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
};
