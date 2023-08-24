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
- `transitionSheet` - flies the sheet, set to `false` to remove
- `transition` - blurs the entire component, set to `false` to remove

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

<button type="button" class="btn" on:click={() => (display = true)}>
	Open
</button>

<Sheet
	bind:display
	class="backdrop-blur"
	classSheet="p-4 shadow bg-white"
	position="r"
>
	<div class="mb-4 flex items-center justify-between">
		<h2 class="my-0">Sheet</h2>
		<button type="button" class="btn btn-s" on:click={() => (display = false)}>
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
	import { createEventDispatcher, onMount } from "svelte";
	import {
		blur,
		fly,
		type BlurParams,
		type FlyParams,
	} from "svelte/transition";
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

	/** blurs the entire component, set to `false` to remove */
	export let transition: BlurParams | false = { duration };

	/** determines the position of sheet */
	export let position: "t" | "b" | "l" | "r" = "l";

	/** max width/height of sheet based on the `side` - can also use css instead */
	export let maxSize: number = 488;

	/** flies the sheet, set to `false` to remove */
	export let transitionSheet: FlyParams | false = { duration };

	let sheet: HTMLDivElement;

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

	if (transitionSheet && !transitionSheet.x && !transitionSheet.y) {
		// if there isn't a user assigned value for `x` or `y`
		if (position === "b") {
			transitionSheet.y = maxSize;
		} else if (position === "t") {
			transitionSheet.y = -maxSize;
		} else if (position === "r") {
			transitionSheet.x = maxSize;
		} else {
			transitionSheet.x = -maxSize;
		}
	}

	onMount(() => {
		if (prefersReducedMotion()) {
			transition = false;
			transitionSheet = false;
		}
	});
</script>

<svelte:body on:keydown={onKeyDown} />

{#if display}
	<div
		transition:blur={transition ? transition : { duration: 0 }}
		class="d-backdrop {className}"
		class:d-backdrop-bottom={position === "b"}
		class:d-backdrop-top={position === "t"}
		class:d-backdrop-right={position === "r"}
		{id}
	>
		<div
			bind:this={sheet}
			transition:fly={transitionSheet ? transitionSheet : { duration: 0 }}
			use:lifecycle
			role="dialog"
			tabindex="-1"
			style={position === "t" || position === "b"
				? `max-height: ${maxSize}px;`
				: `max-width: ${maxSize}px`}
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
	.d-backdrop {
		position: fixed;
		display: flex;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.d-backdrop-bottom {
		flex-direction: column-reverse;
	}
	.d-backdrop-top {
		flex-direction: column;
	}
	.d-backdrop-right {
		flex-direction: row-reverse;
	}
</style>
