---
"drab": minor
---

feat: `drab/types`

Easily define all custom elements JSX types + attributes with the new `Elements` type exported from `drab/types`.

React example:

```ts
// drab.d.ts
import type { Elements } from "drab/types";
import type { HTMLAttributes } from "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements extends Elements<HTMLAttributes<HTMLElement>> {}
	}
}
```
