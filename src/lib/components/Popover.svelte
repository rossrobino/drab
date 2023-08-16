<!--
@component

### Popover

Displays a popover relatively positioned to the target.

@props

- `class` 
- `display` - if `eventType="click"`, controls the display
- `id` 
- `position` - where the popover is displayed in relation to the target
- `target` - target element to position the popover in relation to
- `transition` - fades in and out, set to false to disable

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | Popover       |
| `button`   | button contents                 | Open          |

@example

```svelte
<script lang="ts">
	import { Popover } from "drab";

	let button: HTMLButtonElement;
	let hoverButton: HTMLButtonElement;

	let display = false;
</script>

<button
	class="btn"
	type="button"
	bind:this={button}
	on:click={() => (display = !display)}
>
	{display ? "Close" : "Open"}
</button>

<Popover target={button} bind:display class="p-2">
	<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
		<div class="font-bold">Bottom</div>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
	</div>
</Popover>
```
-->

<script lang="ts">
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { duration } from "$lib/util/transition";
	import { onMount, tick } from "svelte";
	import { fade, type FadeParams } from "svelte/transition";

	let className = "";
	export { className as class };

	export let id = "";

	/** if `eventType="click"`, controls the display */
	export let display = true;

	/** where the popover is displayed in relation to the target */
	export let position: "top" | "bottom" | "left" | "right" = "bottom";

	/** target element to position the popover in relation to */
	export let target: HTMLElement;

	/** fades in and out, set to false to disable */
	export let transition: FadeParams | false = { duration };

	let popover: HTMLDivElement;

	let coordinates: { x: number; y: number } = { x: 0, y: 0 };

	const setPosition = async () => {
		if (position === "top" || position === "bottom") {
			coordinates.x = target.offsetWidth / 2 - popover.offsetWidth / 2;
			if (position === "top") {
				coordinates.y = -popover.offsetHeight;
			} else {
				coordinates.y = target.offsetHeight;
			}
		} else {
			coordinates.y = target.offsetHeight / 2 - popover.offsetHeight / 2;
			if (position === "left") {
				coordinates.x = -popover.offsetWidth;
			} else {
				coordinates.x = target.offsetWidth;
			}
		}
		const targetRect = target.getBoundingClientRect();

		coordinates.x += targetRect.x;
		coordinates.y += targetRect.y;

		await tick();

		const popoverRect = popover.getBoundingClientRect();

		// correct position if not visible
		if (popoverRect.x < 0) {
			coordinates.x += Math.abs(popoverRect.x);
		} else if (popoverRect.x + popover.offsetWidth > window.innerWidth) {
			coordinates.x -=
				popoverRect.x + popover.offsetWidth - window.innerWidth + 16;
		}
		if (popoverRect.y < 0) {
			coordinates.y += Math.abs(popoverRect.y);
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
		if (prefersReducedMotion()) {
			if (transition) transition.duration = 0;
		}
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
		transition:fade={transition ? transition : { duration: 0 }}
	>
		<slot>Popover</slot>
	</div>
{/if}

<style>
	div {
		position: absolute;
	}
</style>
