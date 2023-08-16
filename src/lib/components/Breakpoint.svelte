<!--
@component

### Breakpoints

Displays the current breakpoint and `window.innerWidth`, based on the `breakpoints` provided. Defaults to [TailwindCSS breakpoint sizes](https://tailwindcss.com/docs/responsive-design).

With SvelteKit, this component can be wrapped in an `{#if dev}` block that checks for the [dev module](https://kit.svelte.dev/docs/modules#$app-environment-dev), to show only during development.

@props

- `breakpoints` - array of objects representing the breakpoints of the application
- `class` 
- `id` 

@example

```svelte
<script lang="ts">
	import { Breakpoint } from "drab";
</script>

<div>
	<Breakpoint
		class="inline-block rounded border px-2 py-1 font-mono tabular-nums shadow"
	/>
</div>
```
-->

<script lang="ts">
	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	/** array of objects representing the breakpoints of the application */
	export let breakpoints: { name: string; width: number }[] = [
		{ name: "sm", width: 640 },
		{ name: "md", width: 768 },
		{ name: "lg", width: 1024 },
		{ name: "xl", width: 1280 },
		{ name: "2xl", width: 1536 },
	];

	breakpoints.sort((a, b) => b.width - a.width);

	let innerWidth: number = 0;

	$: breakpoint = getBreakpoint(innerWidth);

	/**
	 * finds the current breakpoint
	 * @param innerWidth window.innerWidth
	 */
	const getBreakpoint = (innerWidth: number) => {
		for (let i = 0; i < breakpoints.length; i++) {
			if (innerWidth > breakpoints[i].width) {
				return breakpoints[i].name;
			}
		}
		return "none";
	};
</script>

<svelte:window bind:innerWidth />

<div class={className} {id}>
	{breakpoint}:{innerWidth}
	<noscript>{messageNoScript}</noscript>
</div>
