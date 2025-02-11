import * as elements from "./index.js";
import { define } from "./util/define.js";

for (const Constructor of Object.values(elements)) define(Constructor);
