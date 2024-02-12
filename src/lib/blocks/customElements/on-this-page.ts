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
								const nestedLi = document.createElement("li");
								nestedLi.classList.add("list-none");
								const nestedUl = document.createElement("ul");
								nestedUl.classList.add("my-0");
								nestedUl.append(li);
								nestedLi.append(nestedUl);
								ul.append(nestedLi);
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
