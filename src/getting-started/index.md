## Install

You can install **drab** from [npm](https://www.npmjs.com/package/drab) and import the custom elements from the package. Each element's class is exported from `drab/{element}`, or you can import the already defined element from `drab/{element}/define`.

```bash
npm i -D drab
```

```js
// client.js
import { Dialog } from "drab/dialog";

customElements.define("drab-dialog", Dialog);

// or import directly, element will be named `drab-{element}`
import "drab/dialog/define";
```

Alternatively, add a script tag to your HTML that imports the immediately invoked function expression (IIFE) module to avoid naming conflicts. Each element will be named `drab-{element}`.

```html
<script
	type="module"
	src="https://cdn.jsdelivr.net/npm/drab@__VERSION__/dialog/define.iife.js"
></script>
```

## Styling

Elements without styles can appear rather drab. You have the freedom to bring your own styles to these elements. Since **drab** doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind using the [uico](https://uico.robino.dev) and [typography](https://tailwindcss.com/docs/typography-plugin) plugins. Tailwind does **not** have to be used with this library.

## Frameworks

**drab** can be utilized in [any framework that supports custom elements](https://custom-elements-everywhere.com/). If you are using a server-side rendering (SSR) framework and are installing the elements instead of using a CDN/script tag, you will need to ensure the element's code only runs on the client. Here are a few examples on how to do this in popular JavaScript frameworks with functions like `onMount` or `useEffect`. If you aren't using a SSR framework, you can omit these wrappers since the code will only run on the client.

_\*If you see a better way to write any of these examples or a framework that is missing, please [create an issue or pull request](https://github.com/rossrobino/drab/issues)!_

### Astro

[Astro](https://docs.astro.build/en/guides/client-side-scripts/#web-components-with-custom-elements) is the easiest framework to incorporate custom elements into since script tags only run on the client. Astro users also have the most to gain through the usage of custom elements over including another JavaScript framework. You don't have the cost of shipping a framework to the client to achieve interactivity.

```html
---
// Dialog.astro
import type { DialogAttributes } from "drab/dialog";

const dialogProps: DialogAttributes = {
	// type-safe attributes
};
---

<script>
	import { Dialog } from "drab/dialog";
	customElements.define("drab-dialog", Dialog);
</script>

<drab-dialog {...dialogProps}>...</drab-dialog>
```

### Enhance

[Enhance](https://enhance.dev) is an HTML-first full stack web framework that enables anyone to build multi-page dynamic web apps while staying as close to the web platform as possible.

```js
// app/elements/my-dialog.mjs
export default function MyDialog({ html }) {
	return html`
		<drab-dialog>...</drab-dialog>
		<script src="/_public/browser/drab-dialog.mjs" type="module"></script>
	`;
}
```

```js
// app/browser/drab-dialog.mjs
import { Dialog } from "drab/dialog";

customElements.define("drab-dialog", Dialog);
```

### React

```jsx
// dialog.tsx
"use client"; // required for React Server Components

import { useEffect } from "react";

export default function Dialog() {
	useEffect(() => {
		async function importElement() {
			if (!customElements.get("drab-dialog")) {
				const { Dialog } = await import("drab/dialog");
				customElements.define("drab-dialog", Dialog);
			}
		}
		importElement();
	}, []);

	return <drab-dialog>...</drab-dialog>;
}
```

```ts
// add a .d.ts file
import type { DialogAttributes } from "drab";

declare namespace JSX {
	interface IntrinsicElements {
		"drab-dialog": DialogAttributes & { children: any };
	}
}
```

### Solid

```jsx
// dialog.jsx
import { onMount } from "solid-js";

export default function Dialog() {
	onMount(async () => {
		if (!customElements.get("drab-dialog")) {
			const { Dialog } = await import("drab/dialog");
			customElements.define("drab-dialog", Dialog);
		}
	});

	return <drab-dialog>...</drab-dialog>;
}
```

```ts
// global.d.ts
/// <reference types="@solidjs/start/env" />

import "solid-js";
import type { DialogAttributes } from "drab";

type Merge<T, U> = Omit<T, keyof U> & U;

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"drab-dialog": Merge<DialogAttributes, JSX.HTMLAttributes<HTMLElement>>;
		}
	}
}
```

### Svelte

```svelte
<script lang="ts">
	import { onMount } from "svelte";
	import type { DialogAttributes } from "drab/dialog";

	onMount(async () => {
		if (!customElements.get("drab-dialog")) {
			const { Dialog } = await import("drab/dialog");
			customElements.define("drab-dialog", Dialog);
		}
	});

	const dialogProps: DialogAttributes = {
		// type-safe attributes
	};
</script>

<drab-dialog {...dialogProps}>...</drab-dialog>
```

### Vue

```vue
<!-- Dialog.vue -->
<script setup>
onMounted(async () => {
	if (!customElements.get("drab-dialog")) {
		const { Dialog } = await import("drab/dialog");
		customElements.define("drab-dialog", Dialog);
	}
});
</script>

<template>
	<drab-dialog>...</drab-dialog>
</template>
```

```js
// nuxt.config.ts
export default defineNuxtConfig({
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.includes("-"),
		},
	},
});
```
