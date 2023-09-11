<!--
@component

### Sheet

Creates a sheet element based on the `position` provided. `maxSize` is set to width or height of the sheet depending on the `position` provided. The `transition` is calculated based on the `position` and `maxSize` of the sheet.

@props

- `classSheet` - sheet class - not the backdrop
- `class` 
- `display` - controls whether the sheet is displayed
- `id` 
- `maxSize` - max width/height of sheet based on the `side` - can also use css instead
- `position` - determines the position of sheet
- `transition` - flies the sheet, set to `false` to remove

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | content                         | `Content`     |

@events

| name      | event              |
| --------- | ------------------ |
| `mount`   | sheet is mounted   | 
| `destroy` | sheet is destroyed | 

@example

```svelte
<script lang="ts">
	import { Sheet } from "drab";

	let display = false;
</script>

<button
	type="button"
	class="button button-primary"
	on:click={() => (display = true)}
>
	Open
</button>

<Sheet
	bind:display
	class="z-40 backdrop-blur"
	classSheet="card rounded-none border-none"
	position="r"
>
	<div class="mb-4 flex items-center justify-between">
		<h2 class="my-0">Sheet</h2>
		<button
			type="button"
			class="button button-ghost"
			on:click={() => (display = false)}
		>
			Close
		</button>
	</div>
	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur.
	</div>
</Sheet>
```
-->

<script lang="ts">
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { fly, type FlyParams } from "svelte/transition";
	import type { Action } from "svelte/action";
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { duration } from "$lib/util/transition";

	let className = "";
	export { className as class };

	export let id = "";

	/** sheet class - not the backdrop */
	export let classSheet = "";

	/** controls whether the sheet is displayed*/
	export let display = false;

	/** determines the position of sheet */
	export let position: "t" | "b" | "l" | "r" = "l";

	/** max width/height of sheet based on the `side` - can also use css instead */
	export let maxSize: number = 488;

	/** flies the sheet, set to `false` to remove */
	export let transition: FlyParams | false = { duration, opacity: 1 };

	let sheet: HTMLDivElement;

	/** removes styles from backdrop if `true` */
	let backdropNone = false;

	/** see `displayController` */
	let displaySheet = false;

	const dispatch = createEventDispatcher();

	const close = () => (display = false);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") close();
	};

	const lifecycle: Action = (node: Node) => {
		dispatch("mount");
		if (node instanceof HTMLElement) node.focus();
		return { destroy: () => dispatch("destroy") };
	};

	/**
	 * - removes the backdrop styles before the transition occurs
	 * - keeps `display` and `displaySheet` in sync
	 * @param display user controlled `display` prop
	 */
	const displayController = async (display: boolean) => {
		if (display) {
			backdropNone = false;
			displaySheet = true;
		} else {
			backdropNone = true;
			await tick();
			displaySheet = false;
		}
	};

	// calculates the transition based on the `maxSize` and `position`
	// if the user does not define their own transition
	if (transition && !transition.x && !transition.y) {
		// if there isn't a user assigned value for `x` or `y`
		if (position === "b") {
			transition.y = maxSize;
		} else if (position === "t") {
			transition.y = -maxSize;
		} else if (position === "r") {
			transition.x = maxSize;
		} else {
			transition.x = -maxSize;
		}
	}

	onMount(() => {
		if (prefersReducedMotion()) transition = false;
	});

	$: displayController(display);
</script>

<svelte:body on:keydown={onKeyDown} />

{#if displaySheet}
	<div
		class="backdrop {className}"
		class:backdrop-bottom={position === "b"}
		class:backdrop-top={position === "t"}
		class:backdrop-right={position === "r"}
		class:backdrop-none={backdropNone}
		{id}
	>
		<div
			bind:this={sheet}
			transition:fly={transition ? transition : { duration: 0 }}
			use:lifecycle
			role="dialog"
			tabindex="-1"
			style="outline: none; {position === 't' || position === 'b'
				? `max-height: ${maxSize}px;`
				: `max-width: ${maxSize}px`}"
			class={classSheet}
		>
			<slot>Content</slot>
		</div>
		<button title="Close" on:click={close}></button>
	</div>
{/if}

<style>
	button {
		flex-grow: 1;
	}
	.backdrop {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
	.backdrop-bottom {
		flex-direction: column-reverse;
	}
	.backdrop-top {
		flex-direction: column;
	}
	.backdrop-right {
		flex-direction: row-reverse;
	}
	.backdrop-none {
		backdrop-filter: none;
		background: none;
	}
</style>
