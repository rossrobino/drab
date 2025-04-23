---
"drab": minor
---

feat: Base mixins

Creates the `Base` class with mixins to be more composable, thanks to [Carlos Verdes](https://github.com/rossrobino/drab/issues/29) for the suggestion.

Four mixins are now exported from `drab/base`: `Trigger`, `Content`, `Lifecycle`, and `Announce`.

Now users can create their own custom elements using only the features they need:

```ts
import { Trigger, Lifecycle } from "drab/base";

class MyCustomElement extends Trigger(Lifecycle(HTMLElement)) {
	constructor() {
		super();
	}

	override mount() {
		this.triggerListener(() => alert("hello world"));
	}
}
```

No breaking changes for now, in a future major other elements might use these mixins based on the features required and `Base` will be removed.
