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
					<li class="pl-0"><a href="/">Read me</a></li>
					<li class="pl-0"><a href="/getting-started/">Getting started</a></li>
					<li class="pl-2 mt-4 font-semibold">Reference</li>
					<li class="pl-0">
						<ul class="m-0 pl-0 list-none" id="baseElements"></ul>
					</li>
					<li class="pl-2 mt-4 font-semibold">Elements</li>
					<li class="pl-0">
						<ul class="m-0 list-none pl-0" id="elements"></ul>
					</li>
				`;

				for (const el of elements) {
					if (el.isDirectory()) {
						const li = document.createElement("li");
						li.classList.add("p-0", "my-0.5");
						const a = document.createElement("a");
						a.href = `/docs/${el.name}/`;
						a.textContent = el.name;
						li.append(a);
						if (el.name === "base" || el.name === "animate") {
							const baseUl = this.querySelector(
								"#baseElements",
							) as HTMLUListElement;

							// so `base` comes first
							baseUl.prepend(li);
						} else {
							const elementsUl = this.querySelector(
								"#elements",
							) as HTMLUListElement;

							elementsUl.append(li);
						}
					}
				}

				const anchors = this.querySelectorAll("a");
				for (const anchor of anchors) {
					anchor.classList.add(
						"data-[current]:button-secondary",
						"!no-underline",
						"justify-start",
						"button",
						"button-ghost",
					);
				}

				// remove for ally - lighthouse doesn't like custom element as
				// immediate child of ul
				const parent = this.parentElement;
				parent?.append(...this.children);
				this.remove();
			}
		},
	);
};
