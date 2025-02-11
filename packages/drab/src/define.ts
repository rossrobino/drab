import * as elements from "./index.js";
import { define } from "./util/define.js";

for (const [name, Constructor] of Object.entries(elements)) {
	define(`drab-${name.toLowerCase()}`, Constructor);
}
