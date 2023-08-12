<!--
@component

### Accordion

Displays a list of `details` elements.

@props

- `autoClose` - if `true`, other items close when a new one is opened
- `classDetails` - class of the `div` around each `details` element
- `classIcon` - class of the `div` around the icon
- `classSlot` - class of all the `slot` elements
- `classSummary` - class of all the `summary` elements
- `class` 
- `content` - array of `AccordionContent` elements
- `icon` 
- `id` 
- `transition` - rotates the icon, slides the content, defaults to empty object, set to false to remove

@slots

Pass components into the `content` prop if needed. `AccordionContent` has `summary` and `slot` attributes of type `string | ComponentType`.

@example

```svelte
<script>
    import { Accordion } from "drab";
</script>

<Accordion
	content={[
		{ summary: "Is it accessible?", slot: "Yes." },
		{
			summary: "Is it styled?",
			slot: "Nope, style with global styles.",
		},
		{
			summary: "Is it animated?",
			slot: "Yes, with the transition prop.",
		},
		{ summary: "Does it work without Javascript?", slot: "Yes." },
	]}
/>
```
-->

<script context="module" lang="ts">
	import type { ComponentType } from "svelte";

	export interface AccordionContent {
		/** `details` element class */
		classContentDetails?: string;

		/** content of the `summary` element */
		summary: string | ComponentType;

		/** `summary` element class */
		classContentSummary?: string;

		/** content of the `slot` */
		slot: string | ComponentType;

		/** `slot` element class */
		classContentSlot?: string;

		/** controls whether the slotted content is displayed */
		open?: boolean;
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { slide, type SlideParams } from "svelte/transition";
	import { prefersReducedMotion } from "$lib/util/accessibility";

	let className = "";
	export { className as class };

	export let id = "";

	/** array of `AccordionContent` elements */
	export let content: AccordionContent[];

	export let icon: string | ComponentType = "";

	/** class of the `div` around each `details` element */
	export let classDetails = "";

	/** class of all the `summary` elements */
	export let classSummary = "";

	/** class of all the `slot` elements */
	export let classSlot = "";

	/** class of the `div` around the icon */
	export let classIcon = "";

	/** rotates the icon, slides the content, defaults to empty object, set to false to remove */
	export let transition: SlideParams | false = {};

	/** if `true`, other items close when a new one is opened */
	export let autoClose = true;

	/** set to `true` on the client */
	let clientJs = false;

	for (const item of content) {
		if (!item.classContentDetails) item.classContentDetails = "";
		if (!item.classContentSlot) item.classContentSlot = "";
		if (!item.classContentSummary) item.classContentSummary = "";
	}

	const toggleOpen = (i: number) => {
		content[i].open = !content[i].open;
		if (autoClose) {
			for (let j = 0; j < content.length; j++) {
				const item = content[j];
				if (j !== i) item.open = false;
			}
		}
	};

	onMount(() => {
		clientJs = true;
		if (prefersReducedMotion()) transition = false;
	});
</script>

<div class="transition"></div>

<div class={className} {id}>
	{#each content as { classContentDetails, summary, classContentSummary, slot, classContentSlot, open }, i}
		<div class="{classDetails} {classContentDetails}">
			<details bind:open>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary
					role="button"
					tabindex="0"
					class={classSummary}
					on:click={(e) => {
						e.preventDefault();
						toggleOpen(i);
					}}
					on:keydown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							toggleOpen(i);
						}
					}}
				>
					{#if typeof summary !== "string"}
						<svelte:component this={summary} class={classContentSummary} />
					{:else}
						<span class={classContentSummary}>{summary}</span>
					{/if}
					{#if icon}
						<div
							class={classIcon}
							class:db-rotate-180={open}
							class:db-transition={transition}
						>
							{#if typeof icon !== "string"}
								<svelte:component this={icon} />
							{:else}
								<span>{icon}</span>
							{/if}
						</div>
					{/if}
				</summary>
				{#if !clientJs || !transition}
					<div class={classSlot}>
						{#if typeof slot !== "string"}
							<svelte:component this={slot} class={classContentSlot} />
						{:else}
							<div class={classContentSlot}>{slot}</div>
						{/if}
					</div>
				{/if}
			</details>
			{#if clientJs && open && transition}
				<div transition:slide={transition} class={classSlot}>
					{#if typeof slot !== "string"}
						<svelte:component this={slot} class={classContentSlot} />
					{:else}
						<div class={classContentSlot}>{slot}</div>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	summary {
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	.db-rotate-180 {
		transform: rotate(180deg);
	}
	.db-transition {
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
