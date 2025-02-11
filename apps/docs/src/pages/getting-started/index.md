# Getting Started

## Install

You can install drab from [npm](https://www.npmjs.com/package/drab) and import the custom elements from the package.

```bash
npm i drab
```

In a client-side JavaScript module, import the element and define with with a name. Each element's class is exported from `drab/{element}`.

```js
import { Dialog } from "drab/dialog";

customElements.define("drab-dialog", Dialog);
```

Or, import the `drab/{element}/define` module where it's defined for you, in this case the element will be named `drab-{element}`

```js
import "drab/dialog/define";
```

## Script tag

Alternatively, add a script tag to your HTML that imports the immediately invoked function expression (IIFE) module to avoid naming conflicts. Each element will be named `drab-{element}`.

```html
<script type="module" src="https://esm.run/drab@__VERSION__/define"></script>
```

## Styling

Elements without styles can appear rather drab. You have the freedom to bring your own styles to these elements. Since drab doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind and [uico](https://uico.robino.dev). Tailwind does **not** have to be used with this library.

## Frameworks

drab can be utilized in [any framework that supports custom elements](https://custom-elements-everywhere.com/). If you are using a server-side rendering (SSR) framework and are installing the elements instead of using a CDN/script tag, you will need to ensure the element's code only runs on the client. Here are a few examples on how to do this in popular JavaScript frameworks with functions like `onMount` or `useEffect`. If you aren't using a SSR framework, you can omit these wrappers since the code will only run on the client.

_\*If you see a better way to write any of these examples or a framework that is missing, please [create an issue or pull request](https://github.com/rossrobino/drab/issues)!_

### Astro

```astro
---
// Dialog.astro
import type { DialogAttributes } from "drab/dialog";

const attributes: DialogAttributes = {
	// ...
};
---

<script>
	import "drab/dialog/define";
</script>

<drab-dialog {...attributes}>...</drab-dialog>
```

### Enhance

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
import "drab/dialog/define";
```

### React

```tsx
"use client";

// dialog.tsx
import { useEffect } from "react";

export default function Dialog() {
	useEffect(() => {
		import("drab/dialog/define");
	}, []);

	return <drab-dialog {...attributes}>...</drab-dialog>;
}
```

```ts
// add a .d.ts file
import type { DialogAttributes } from "drab";

declare namespace JSX {
	interface IntrinsicElements {
		"drab-dialog": DialogAttributes & { children: ReactNode };
	}
}
```

### Solid

```tsx
// dialog.jsx
import { onMount } from "solid-js";

export default function Dialog() {
	onMount(async () => {
		await import("drab/dialog/define");
	});

	return <drab-dialog>...</drab-dialog>;
}
```

```ts
// global.d.ts
/// <reference types="@solidjs/start/env" />
import type { DialogAttributes } from "drab";
import "solid-js";

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"drab-dialog": DialogAttributes & JSX.HTMLAttributes<HTMLElement>;
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
		await import("drab/dialog/define");
	});

	const dialogProps: DialogAttributes = {
		// ...
	};
</script>

<drab-dialog {...dialogProps}>...</drab-dialog>
```

### Vue

```vue
<!-- Dialog.vue -->
<script setup>
onMounted(async () => {
	await import("drab/dialog/define");
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
