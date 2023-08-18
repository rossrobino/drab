<!--
@component

### ContextMenu

Displays when the `target` element is right clicked, or long pressed on mobile.

@props

- `class` 
- `display` - shows / hides the menu
- `id` 
- `target` - target element to right click, defaults to the parent element
- `transition` - fades the content, set to `false` to remove

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | Context Menu  |

@example

```svelte
<script lang="ts">
	import { ContextMenu } from "drab";

	let target: HTMLButtonElement;
</script>

<div class="mb-8 flex justify-center rounded border border-dashed p-12">
	<div>Parent right click</div>
	<ContextMenu>
		<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
			<div class="font-bold">Context Menu</div>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
		</div>
	</ContextMenu>
</div>

<button class="btn" bind:this={target}>Target Right Click</button>
<ContextMenu {target}>
	<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
		<div class="font-bold">Context Menu</div>
		<button role="menuitem" class="btn">Button</button>
		<button role="menuitem" class="btn">Button</button>
		<button role="menuitem" class="btn">Button</button>
	</div>
</ContextMenu>
```
-->

<script lang="ts">
	import { onMount, tick } from "svelte";
	import { fade, type FadeParams } from "svelte/transition";
	import { duration } from "$lib/util/transition";
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { delay } from "$lib/util/delay";

	let className = "";
	export { className as class };

	export let id = "";

	/** shows / hides the menu */
	export let display = false;

	/** fades the content, set to `false` to remove */
	export let transition: FadeParams | false = { duration };

	/** target element to right click, defaults to the parent element */
	export let target: HTMLElement | null = null;

	let contextMenu: HTMLDivElement;

	let base: HTMLSpanElement;

	let coordinates: { x: number; y: number } = { x: 0, y: 0 };

	const hide = () => (display = false);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	const displayMenu = async (e: MouseEvent | TouchEvent) => {
		e.preventDefault();

		// find coordinates of the click
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;
		const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
		const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
		coordinates.x = clientX + scrollX;
		coordinates.y = clientY + scrollY;

		display = true;

		await tick(); // wait for menu to show

		const offsetWidth = contextMenu.offsetWidth + 24;
		const offsetHeight = contextMenu.offsetHeight + 6;
		const innerWidth = window.innerWidth;
		const innerHeight = window.innerHeight;

		// ensure menu is within view
		if (coordinates.x + offsetWidth > scrollX + innerWidth) {
			coordinates.x = scrollX + innerWidth - offsetWidth;
		}
		if (coordinates.y + offsetHeight > scrollY + innerHeight) {
			coordinates.y = scrollY + innerHeight - offsetHeight;
		}
	};

	let timer: NodeJS.Timeout;

	/** displays after delay - if not cancelled by onTouchEnd */
	const onTouchStart = (e: TouchEvent) => {
		timer = setTimeout(() => {
			displayMenu(e);
		}, delay);
	};

	/** clears the touch timer */
	const onTouchEnd = () => {
		clearTimeout(timer);
	};

	onMount(() => {
		if (prefersReducedMotion()) {
			if (transition) transition.duration = 0;
		}

		if (!target) {
			target = base.parentElement;
		}

		if (target) {
			target.addEventListener("contextmenu", displayMenu);
			target.addEventListener("touchstart", onTouchStart);
			target.addEventListener("touchend", onTouchEnd);
			target.addEventListener("touchcancel", onTouchEnd);
		}
	});
</script>

<svelte:body on:click={hide} on:keydown={onKeyDown} />

<span bind:this={base} role="presentation"></span>

{#if display}
	<div
		role="menu"
		class={className}
		{id}
		bind:this={contextMenu}
		style:top="{coordinates.y}px"
		style:left="{coordinates.x}px"
		transition:fade={transition ? transition : { duration: 0 }}
	>
		<slot>Context Menu</slot>
	</div>
{/if}

<style>
	span {
		width: 0;
		height: 0;
		opacity: 0;
	}
	div {
		position: absolute;
		z-index: 10;
	}
</style>
