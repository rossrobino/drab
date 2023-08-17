<!--
@component

### Sheet

Creates a sheet element based on the `position` provided.

@props

- `classSheet` - sheet class - not the backdrop
- `class` 
- `display` - controls whether the sheet is displayed
- `id` 
- `maxSize` - max width/height of sheet based on the `side` - can also use css instead
- `position` - determines the position of sheet
- `transitionSheet` - slides the sheet, set to `false` to remove
- `transition` - blurs the entire component, set to `false` to remove

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | content                         | `Content`     |

@example

```svelte
<script lang="ts">
	import { Sheet } from "drab";

	let display = false;
</script>

<div>
	<button type="button" class="btn" on:click={() => (display = true)}>
		Open
	</button>
</div>

<Sheet
	bind:display
	class="bg-neutral-50/80 backdrop-blur"
	classSheet="p-4 shadow bg-white"
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
	import { onMount } from "svelte";
	import {
		blur,
		fly,
		type BlurParams,
		type FlyParams,
	} from "svelte/transition";
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
	export let position: "top" | "bottom" | "left" | "right" = "left";

	/** max width/height of sheet based on the `side` - can also use css instead */
	export let maxSize: number = 488;

	/** slides the sheet, set to `false` to remove */
	export let transitionSheet: FlyParams | false = { duration };

	let sheet: HTMLDivElement;

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	if (transitionSheet && !transitionSheet.x && !transitionSheet.y) {
		// if there isn't a user assigned value for `x` or `y`
		if (position === "bottom") {
			transitionSheet.y = maxSize;
		} else if (position === "top") {
			transitionSheet.y = -maxSize;
		} else if (position === "right") {
			transitionSheet.x = maxSize;
		} else {
			transitionSheet.x = -maxSize;
		}
	}

	onMount(() => {
		if (prefersReducedMotion()) {
			if (transition) transition.duration = 0;
			if (transitionSheet) transitionSheet.duration = 0;
		}
	});
</script>

<svelte:body on:keydown={onKeyDown} />

{#if display}
	<div
		transition:blur={transition ? transition : { duration: 0 }}
		class="d-backdrop {className}"
		class:d-backdrop-bottom={position === "bottom"}
		class:d-backdrop-top={position === "top"}
		class:d-backdrop-right={position === "right"}
		{id}
	>
		<div
			role="dialog"
			bind:this={sheet}
			transition:fly={transitionSheet ? transitionSheet : { duration: 0 }}
			style={position === "top" || position === "bottom"
				? `max-height: ${maxSize}px;`
				: `max-width: ${maxSize}px`}
			class={classSheet}
		>
			<slot>Content</slot>
		</div>
		<button title="Close" on:click={() => (display = false)}></button>
	</div>
{/if}

<style>
	button {
		flex-grow: 1;
	}
	.d-backdrop {
		position: fixed;
		display: flex;
		z-index: 40;
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
