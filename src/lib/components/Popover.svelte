<!--
@component

### Popover

Displays a popover in relation to the `target`. 

- Does not require the target to be `position: relative;`
- Adjusts position in case the popover renders outside of the viewport

@props

- `class` 
- `display` - shows / hides the popover
- `id` 
- `position` - where the popover is displayed in relation to the `target`, ex: `br` is bottom right
- `target` - target element to position the popover in relation to
- `transition` - scales the popover, set to `false` to disable

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | Popover       |

@example

```svelte
<script lang="ts">
	import { Popover } from "drab";

	let target: HTMLButtonElement;

	let display = false;

	const open = () => (display = true);
	const close = () => (display = false);
</script>

<button class="btn" type="button" bind:this={target} on:click={open}>
	Open
</button>

<Popover {target} bind:display class="p-2">
	<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
		<div class="font-bold">Bottom</div>
		<button class="btn" on:click={close}>Close</button>
		<button class="btn" on:click={close}>Close</button>
		<button class="btn" on:click={close}>Close</button>
	</div>
</Popover>
```
-->

<script lang="ts">
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { duration, start } from "$lib/util/transition";
	import { onMount, tick } from "svelte";
	import { scale, type ScaleParams } from "svelte/transition";

	let className = "";
	export { className as class };

	export let id = "";

	/** shows / hides the popover */
	export let display = true;

	type Position =
		| "tl"
		| "t"
		| "tr"
		| "rt"
		| "r"
		| "rb"
		| "br"
		| "b"
		| "bl"
		| "lb"
		| "l"
		| "lt";

	/** where the popover is displayed in relation to the `target`, ex: `br` is bottom, right aligned */
	export let position: Position = "b";

	/** target element to position the popover in relation to */
	export let target: HTMLElement;

	/** scales the popover, set to `false` to disable */
	export let transition: ScaleParams | false = { duration, start };

	let popover: HTMLDivElement;

	let coordinates: { x: number; y: number } = { x: 0, y: 0 };

	const setPosition = async () => {
		if (position.startsWith("t") || position.startsWith("b")) {
			if (position.startsWith("t")) {
				coordinates.y = -popover.offsetHeight;
			} else {
				coordinates.y = target.offsetHeight;
			}

			if (position.endsWith("l")) {
				coordinates.x = 0;
			} else if (position.endsWith("r")) {
				coordinates.x = target.offsetWidth - popover.offsetWidth;
			} else {
				coordinates.x = target.offsetWidth / 2 - popover.offsetWidth / 2;
			}
		} else {
			if (position.startsWith("l")) {
				coordinates.x = -popover.offsetWidth;
			} else {
				coordinates.x = target.offsetWidth;
			}

			if (position.endsWith("t")) {
				coordinates.y = 0;
			} else if (position.endsWith("b")) {
				coordinates.y = target.offsetHeight - popover.offsetHeight;
			} else {
				coordinates.y = target.offsetHeight / 2 - popover.offsetHeight / 2;
			}
		}

		const targetRect = target.getBoundingClientRect();

		// add the position of the `target` and scroll
		coordinates.x += targetRect.x + window.scrollX;
		coordinates.y += targetRect.y + window.scrollY;

		await tick();

		const popoverRect = popover.getBoundingClientRect();

		const extraMargin = 10;

		// correct position if not visible
		if (popoverRect.x < extraMargin) {
			coordinates.x += Math.abs(popoverRect.x) + extraMargin;
		} else if (popoverRect.x + popover.offsetWidth > window.innerWidth) {
			coordinates.x -=
				popoverRect.x + popover.offsetWidth - window.innerWidth + extraMargin;
		}
		if (popoverRect.y < 0) {
			coordinates.y += Math.abs(popoverRect.y) + extraMargin;
		} else if (popoverRect.y + popover.offsetHeight > window.innerHeight) {
			coordinates.y -=
				popoverRect.y + popover.offsetHeight - window.innerHeight;
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	$: if (target && popover) setPosition();

	onMount(() => {
		if (prefersReducedMotion()) transition = false;
	});
</script>

<svelte:body on:keydown={onKeyDown} />

{#if display}
	<div
		role="dialog"
		bind:this={popover}
		class={className}
		{id}
		style:top="{coordinates.y}px"
		style:left="{coordinates.x}px"
		transition:scale={transition ? transition : { duration: 0 }}
	>
		<slot>Popover</slot>
	</div>
{/if}

<style>
	div {
		position: absolute;
		margin: 0;
	}
</style>
