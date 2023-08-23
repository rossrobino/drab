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
- `title` - title of the sheet

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
	import {
		blur,
		fly,
		type BlurParams,
		type FlyParams,
	} from "svelte/transition";
	import { createEventDispatcher, onMount } from 'svelte';
  import { prefersReducedMotion } from "$lib/util/accessibility";
	import { duration } from "$lib/util/transition";
	import type { Action } from "svelte/action";

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

  /** if set to a value, the sheet will have a heading section with a close button */
 	export let title = '';

	 let sheet: HTMLDivElement;
	 const dispatch = createEventDispatcher();
	
	 const closeSheet = () => {
		display = false;
		dispatch('closed');
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
						closeSheet();
		}
	};

	const focusElement: Action = (node: Node) => {
		if (node instanceof HTMLElement) node.focus();
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
		use:focusElement
		class="d-backdrop {className}"
		class:d-backdrop-bottom={position === "b"}
		class:d-backdrop-top={position === "t"}
		class:d-backdrop-right={position === "r"}
		{id}
		tabindex="-1"
	>
		<div
			role="dialog"
			bind:this={sheet}
			transition:fly={transitionSheet ? transitionSheet : { duration: 0 }}
			style={position === "t" || position === "b"
				? `max-height: ${maxSize}px;`
				: `max-width: ${maxSize}px`}
			class={classSheet}
		>
    {#if title}
			<div class="header-container">
				<div>
					{title}
				</div>
				<button
					class="header-button"
					on:click={closeSheet}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="30px"
						width="30px"
						viewBox="0 0 24 24"
						fill="#000000"
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
						/></svg
					>
				</button>
			</div>
    
    {/if}
			<slot>Content</slot>
		</div>
		<button title="Close" on:click={closeSheet}></button>
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


	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-right: 1rem;
		font-size: 1.5rem;
		font-weight: 800;
	}

	.header-button {
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 38px;
		max-height: 38px;
		background-color: #e5e7eb;
		border-radius: 9999px;
		margin-left: 1rem;
	}

	.header-button:hover {
		background-color: #d1d5db;
	}
</style>