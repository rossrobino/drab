---
"drab": major
---

Base

If you are only using drab via HTML none of these changes to `Base` will affect the functionality of any elements. Please read other sections for possible breaking changes as some elements have been merged or removed.

### Mixins

drab now uses mixins to construct each element instead of a singular `Base` class. This ensures each element only includes the base features that it needs.

The main breaking change is the `Base` class has been removed along with the `drab/base/define` entry point.

If you were extending `Base` and creating your own elements you now can use the mixins to use only the features from `Base` that are required. Or, you can recreate `Base` with all the mixins to have the same class as before.

```ts
import { Lifecycle, Trigger, Content, Announce } from "drab/base";

// everything - same as the v6 Base
class Base extends Lifecycle(Trigger(Content(Announce()))) {
	// ...
}

// for example, if only the lifecycle and trigger features are needed
// just extends the mixins that are required
class LifecycleAndTriggerOnly extends Lifecycle(Trigger()) {
	// ...
}
```

There could be an edge case where you were using a feature of `Base` through another element that doesn't require the feature. Since each element only uses the mixins that it needs now, you'll need to add the mixin with your feature to keep using the feature from `Base`. For example, if you were getting some content via the `Prefetch` element, you'll now need to wrap `Prefetch` with the `Content` mixin to maintain the same functionality as before.

```ts
import { Content } from "drab/base";
import { Prefetch } from "drab/prefetch";

class PrefetchWithContent extends Content(Prefetch) {
	content = this.getContent(); // adds the `getContent` method back in

	// ...
}
```

### Renaming

The following methods were renamed within the corresponding mixins of the `Base` class.

- `getTrigger` => `triggers`
- `triggerListener` => `listener`
- `getContent` => `content`
- `swapContent` => `swap`

### listener argument order

In addition to the name change, `listener` has been updated to use overloads so the `type` can be passed in as the first argument instead of the second be more consistent with `addEventListener`.

```diff
- el.triggerListener(() => console.log("hello"), "click", options);
+ el.listener("click", () => console.log("hello"), options);
```

Using without a `type` will still default to `this.event`.
