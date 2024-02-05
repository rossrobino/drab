import * as elements from "./index.js";

for (const key in elements) {
	customElements.define(
		`drab-${key.toLowerCase()}`,
		elements[key as keyof typeof elements],
	);
}
