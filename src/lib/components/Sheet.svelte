<!--
@component

### Sheet

Creates a sheet element based on the `position` provided.

@props

- `classSheet` - sheet class - not the backdrop
- `class` 
- `display` - controls whether the sheet is displayed
- `id` 
- `onClickClose` - close on click, defaults to `false` - only closes if clicked outside
- `position` - determines the position of sheet
- `size` - width/height of sheet based on the `side` - can also use css instead
- `transitionSheet` - slides the sheet, set to `false` to remove
- `transition` - fades the entire component, set to `false` to remove

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | content                         | `Content`     |

@example

```svelte
<script lang="ts">
	import { Sheet } from "drab";
	import { X } from "$site/svg/X.svelte";

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
		<button
			type="button"
			title="Close"
			class="btn btn-s"
			on:click={() => (display = false)}
		>
			<X />
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
		fade,
		fly,
		type FadeParams,
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

	/** fades the entire component, set to `false` to remove */
	export let transition: FadeParams | false = { duration };

	/** determines the position of sheet */
	export let position: "top" | "bottom" | "left" | "right" = "right";

	/** width/height of sheet based on the `side` - can also use css instead */
	export let size: number = 488;

	/** slides the sheet, set to `false` to remove */
	export let transitionSheet: FlyParams | false = { duration };

	/** close on click, defaults to `false` - only closes if clicked outside */
	export let onClickClose = false;

	let sheet: HTMLDivElement;

	const clickOutside = (e: MouseEvent) => {
		if (
			(e.target instanceof Node && !sheet.contains(e.target)) ||
			onClickClose
		) {
			display = false;
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	if (transitionSheet && !transitionSheet.x && !transitionSheet.y) {
		// if there isn't a user assigned value for `x` or `y`
		if (position === "bottom") {
			transitionSheet.y = size;
		} else if (position === "top") {
			transitionSheet.y = -size;
		} else if (position === "right") {
			transitionSheet.x = size;
		} else {
			transitionSheet.x = -size;
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
		role="button"
		tabindex="0"
		on:click={clickOutside}
		on:keydown={onKeyDown}
		transition:fade={transition ? transition : { duration: 0 }}
		class="d-backdrop {className}"
		{id}
	>
		<div
			role="dialog"
			bind:this={sheet}
			transition:fly={transitionSheet ? transitionSheet : { duration: 0 }}
			style={position === "top" || position === "bottom"
				? `max-height: ${size}px;`
				: `max-width: ${size}px`}
			class="d-sheet {classSheet}"
			class:d-bottom={position === "bottom"}
			class:d-top={position === "top"}
			class:d-left={position === "left"}
			class:d-right={position === "right"}
		>
			<slot>Content</slot>
		</div>
	</div>
{/if}

<style>
	.d-backdrop {
		position: fixed;
		display: grid;
		z-index: 40;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		cursor: default;
	}
	.d-sheet {
		margin: auto;
	}
	.d-bottom {
		margin-bottom: 0;
		width: 100%;
	}
	.d-top {
		margin-top: 0;
		width: 100%;
	}
	.d-right {
		margin-right: 0;
		height: 100%;
	}
	.d-left {
		margin-left: 0;
		height: 100%;
	}
</style>
