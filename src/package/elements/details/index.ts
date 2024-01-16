export class Details extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const elements = this.querySelectorAll("details");

		for (const el of elements) {
			el.addEventListener("click", (e) => {
				e.preventDefault();
			});
		}
	}
}
