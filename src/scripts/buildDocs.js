import { documentExampleDir } from "./documentExample.js";
import { documentPropsDir } from "./documentProps.js";

await documentPropsDir("src/lib/components");
await documentExampleDir("src/lib/components");
