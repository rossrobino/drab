import type { Block } from "domco";

export const SvgIcon: Block = async ({
	customElements,
	HTMLElement,
}) => {
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
};
