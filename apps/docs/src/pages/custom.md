---
title: Create Your Own Custom Elements
description: How to create your own custom elements with drab.
---

# Create Your Own Custom Elements

If you want to create your own HTML web components using drab, you can use the mixins from the `drab/base` module.

[Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html) allow you to enhance your own custom elements with any number of drab's base classes. By using mixins each element only includes the features it needs, keeping the bundle size as small as possible.

Each mixin can be used in combination with any of the other mixins by passing one into the next in any order. For example, you can create your own element that uses the members from the `Lifecycle` and `Trigger` mixins:

```ts
import { Lifecycle, Trigger } from "drab/base";

class MyElement extends Lifecycle(Trigger()) {
	// now MyElement has all of the members from the
	// Lifecycle and Trigger mixins
}
```

Each base mixin is outlined in more detail below.

## Lifecycle

Use the `Lifecycle` mixin for easy setup and teardown inside your custom elements. It ensures event listeners are safely removed when your element leaves the DOM, and allows you to override lifecycle hooks.

`mount` is delayed until the next [microtask](https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask) to play nicer with JS frameworks that lazily render HTML. For example, you can add an event listener to the children after this element is client-side rendered.

```ts
import { Lifecycle } from "drab/base";

class MyElement extends Lifecycle() {
	constructor() {
		super();
	}

	override mount() {
		console.log("Connected to the page");

		this.safeListener("keydown", (e) => {
			// global event listener (removed when destroyed)
			console.log("Key down detected!", e.key);
		});
	}

	override destroy() {
		console.log("Removed from the page!");
	}
}

customElements.define("my-element", MyElement);
```

## Trigger

The `Trigger` mixin lets your element easily find, validate, and listen to internal elements (such as buttons that trigger an action).

```ts
import { Lifecycle, Trigger } from "drab/base";

class MyElement extends Lifecycle(Trigger()) {
	constructor() {
		super();
	}

	override mount() {
		this.triggers(); // list of triggers found within the element
		const buttons = this.triggers(HTMLButtonElement); // validated to be buttons

		// helper to add an event listener to all triggers
		this.listener(() => console.log("hello world!"));
		this.listener("mouseover", () => console.log("hovered"));
	}
}
```

## Content

The `Content` mixin helps your component identify (and optionally swap) the main content area. You can swap content out with the `swap` method.

```ts
import { Lifecycle, Trigger, Content } from "drab/base";

class MyElement extends Lifecycle(Trigger(Content())) {
	constructor() {
		super();
	}

	override mount() {
		this.content(); // content found within the element
		const div = this.content(HTMLDivElement); // validated to be a div

		// swaps the content with the swap target element's content
		this.listener(() => this.swap());
	}
}
```

## Announce

The Announce mixin allows your element to broadcast [ARIA live region](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1) announcements, improving accessibility for screen reader users. A single ARIA live region is created with the [`Announcer`](/elements/announcer/) element and reused to create announcements.

This might not be necessary for all elements, be sure to test with a screen reader to see if a custom announcement needed.

```ts
import { Lifecycle, Trigger, Content, Announce } from "drab/base";

class MyElement extends Lifecycle(Trigger(Content(Announce()))) {
	constructor() {
		super();
	}

	override mount() {
		this.listener(() => this.announce("Action confirmed!"));
	}
}
```
