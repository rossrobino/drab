<!--
@component

### Details

Displays a `details` element with helpful defaults and transitions. Can be used to make an accordion, or a collapse.

@props

- `class` 
- `id` 
- `open` 
- `transition` - slides the content, set to `false` to remove

@slots

| name      | purpose                         | default value  | slot props |
| --------- | ------------------------------- | -------------- | ---------- |
| `summary` | `summary` element contents      | none           | `open`     |
| `content` | contents when details is `open` | none           | none       |

@example

```svelte
<script lang="ts">
	import { Details } from "drab";
	import Chevron from "$site/svg/Chevron.svelte";
</script>

<Details class="border-b">
	<svelte:fragment slot="summary" let:open>
		<div
			class="flex cursor-pointer items-center justify-between gap-8 p-4 underline hover:decoration-dotted"
		>
			<div>Does it work without JavaScript?</div>
			<div class="transition" class:rotate-180={open}>
				<Chevron />
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="px-4 pb-4">Yes.</div>
	</svelte:fragment>
</Details>
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { slide, type SlideParams } from "svelte/transition";
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { duration } from "$lib/util/transition";

	let className = "";
	export { className as class };

	export let id = "";

	/** slides the content, set to `false` to remove */
	export let transition: SlideParams | false = { duration };

	export let open = false;

	/** set to `true` on the client */
	let clientJs = false;

	const toggleOpen = () => {
		open = !open;
	};

	onMount(() => {
		clientJs = true;
		if (prefersReducedMotion()) transition = false;
	});
</script>

<div class={className} {id}>
	<details bind:open>
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary
			role="button"
			tabindex="0"
			on:click|preventDefault={toggleOpen}
			on:keydown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					toggleOpen();
				}
			}}
		>
			<slot name="summary" {open} />
		</summary>
		{#if !clientJs || !transition}
			<slot name="content" />
		{/if}
	</details>
	{#if clientJs && open && transition}
		<!-- outside the details for the transition -->
		<div transition:slide={transition}>
			<slot name="content" />
		</div>
	{/if}
</div>

<style>
	summary {
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
</style>
