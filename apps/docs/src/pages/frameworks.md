---
title: Frameworks
description: How to use drab with a JavaScript Framework
---

# How to use Custom Elements with a Framework

drab can be utilized in [any framework that supports custom elements](https://custom-elements-everywhere.com/). If you are using a server-side rendering (SSR) framework, you will need to ensure the element's code only runs on the client.

Here are a few examples on how to do this in popular JavaScript frameworks with functions like `onMount` or `useEffect`. If you aren't using a SSR framework, you can omit these wrappers since the code will only run on the client.

If you are using TypeScript, you can add a `d.ts` file within your `tsconfig.include` paths to extend the types of your framework's intrinsic elements to get autocomplete for attributes.

_\*If you see a better way to write any of these examples or a framework that is missing, please [create an issue or pull request](https://github.com/rossrobino/drab/issues)!_

## Astro

```astro
---
// dialog.astro
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

## Enhance

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

## React

```tsx
"use client";

// dialog.tsx
import { useEffect } from "react";

export default function Dialog() {
	useEffect(() => {
		import("drab/dialog/define");
	}, []);

	return <drab-dialog>...</drab-dialog>;
}
```

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

## Solid

```tsx
// dialog.tsx
import { onMount } from "solid-js";

export default function Dialog() {
	onMount(() => {
		import("drab/dialog/define");
	});

	return <drab-dialog>...</drab-dialog>;
}
```

```ts
// drab.d.ts
import type { Elements } from "drab/types";
import "solid-js";

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements
			extends Elements<JSX.HTMLAttributes<HTMLElement>> {}
	}
}
```

## Svelte

```svelte
<!-- dialog.svelte -->
<script lang="ts">
	import { onMount } from "svelte";

	onMount(() => {
		import("drab/dialog/define");
	});
</script>

<drab-dialog>...</drab-dialog>
```

```ts
// drab.d.ts
import type { Elements } from "drab/types";

declare module "svelte/elements" {
	export interface SvelteHTMLElements
		extends Elements<HTMLAttributes<HTMLElement>> {}
}

export {};
```

## Vue

```vue
<!-- dialog.vue -->
<script setup>
onMounted(() => {
	import("drab/dialog/define");
});
</script>

<template>
	<drab-dialog>...</drab-dialog>
</template>
```

```js
// nuxt.config.ts
export default defineNuxtConfig({
	vue: { compilerOptions: { isCustomElement: (tag) => tag.includes("-") } },
});
```
