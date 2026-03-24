---
title: Frameworks
description: How to use drab with a JavaScript Framework
---

# How to use Custom Elements with a Framework

drab can be utilized in [any framework that supports custom elements](https://custom-elements-everywhere.com/).

## TypeScript support

If you are using TypeScript, drab includes types for each attribute of each element so you can get autocomplete and type safety just like you would from a framework component. Add a `d.ts` file within your `tsconfig.include` paths to extend the types of your framework's intrinsic elements (examples below).

## Server rendering

drab is built to be compatible with server-side rendering (SSR). If you are using SSR, you will need to ensure the element's code only runs on the client. Below are examples on how to do this in popular JavaScript frameworks with functions like `onMount` or `useEffect`. If you aren't using SSR, you can omit these wrappers since the code will only run on the client.

## Examples

_\*If you see a better way to write any of these examples or a framework that is missing, please [create an issue or pull request](https://github.com/rossrobino/drab/issues)!_

### Astro

```astro
---
// share.astro
import type { ShareAttributes } from "drab/share";

const attributes: ShareAttributes = {
	// ...
};
---

<script>
	import "drab/share/define";
</script>

<drab-share {...attributes}>...</drab-share>
```

### Enhance

```js
// app/elements/my-share.mjs
export default function MyShare({ html }) {
	return html`
		<drab-share>...</drab-share>
		<script src="/_public/browser/drab-share.mjs" type="module"></script>
	`;
}
```

```js
// app/browser/drab-share.mjs
import "drab/share/define";
```

### React

```tsx
"use client";

// share.tsx
import { useEffect } from "react";

export default function Share() {
	useEffect(() => {
		import("drab/share/define");
	}, []);

	return <drab-share>...</drab-share>;
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

### Solid

```tsx
// share.tsx
import { onMount } from "solid-js";

export default function Share() {
	onMount(() => {
		import("drab/share/define");
	});

	return <drab-share>...</drab-share>;
}
```

```ts
// drab.d.ts
import type { Elements } from "drab/types";
import "solid-js";

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements extends Elements<
			JSX.HTMLAttributes<HTMLElement>
		> {}
	}
}
```

### Svelte

```svelte
<!-- share.svelte -->
<script lang="ts">
	import { onMount } from "svelte";

	onMount(() => {
		import("drab/share/define");
	});
</script>

<drab-share>...</drab-share>
```

```ts
// drab.d.ts
import type { Elements } from "drab/types";

declare module "svelte/elements" {
	export interface SvelteHTMLElements extends Elements<
		HTMLAttributes<HTMLElement>
	> {}
}

export {};
```

### Vue

```vue
<!-- share.vue -->
<script setup>
onMounted(() => {
	import("drab/share/define");
});
</script>

<template>
	<drab-share>...</drab-share>
</template>
```

```js
// nuxt.config.ts
export default defineNuxtConfig({
	vue: { compilerOptions: { isCustomElement: (tag) => tag.includes("-") } },
});
```
