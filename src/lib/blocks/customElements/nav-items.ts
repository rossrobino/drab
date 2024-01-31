import type { Block } from "domco";
import fs from "node:fs/promises";

const elements = await fs.readdir("src/docs", {
	withFileTypes: true,
});

export const NavItems: Block = async ({
	document,
	customElements,
	HTMLElement,
}) => {
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
};
