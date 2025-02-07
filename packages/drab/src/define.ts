import * as elements from "./index.js";

for (const [key, value] of Object.entries(elements)) {
	customElements.define(`drab-${key.toLowerCase()}`, value);
}
