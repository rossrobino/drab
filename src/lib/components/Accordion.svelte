<!--
@component

### Accordion

Displays a list of `details` elements.

@props

- `autoClose` - if `true`, other items close when a new one is opened
- `classContent` - class of all the `div`s that wrap the `content` slot
- `classDetails` - class of the `div` around each `details` element
- `classHeader` - class of all the `summary` elements
- `classIcon` - class of the `div` that wrap the icon if displayed
- `classSummary` - class of all the `div`s that wrap the `summary` slot
- `class` 
- `icon` 
- `id` 
- `items` - array of `AccordionItem` elements
- `transition` - rotates the icon, slides the content, defaults to empty object, set to false to remove

@slots

| name      | purpose                       | default value  | slot props      |
| --------- | ----------------------------- | -------------- | --------------- |
| `summary` | summary element               | `item.summary` | `item`, `index` |
| `icon`    | icon element                  | `icon` prop    | `item`, `index` |
| `content` | content of the accordion item | `item.content` | `item`, `index` |

@example

```svelte
<script>
    import { Accordion } from "drab";
</script>

<Accordion 
	items={[
		{ summary: "Is it accessible?", content: "Yes." },
		{
			summary: "Is it styled?",
			content: "Nope, style with global styles.",
		},
		{
			summary: "Is it animated?",
			content: "Yes, with the transition prop.",
		},
		{ summary: "Does it work without Javascript?", content: "Yes." },
	]}
>
	<div slot="content" let:item let:index>
		<span>{index + 1}.</span>
		<span>{item.content}</span>
	</div>
</Accordion>

<Accordion
	items={[
		{
			summary: "A Component",
			content: "Rendered only on this item.",
			data: { component: FullscreenButton },
		},
		{ summary: "Summary", content: "Some other content" },
	]}
>
	<svelte:fragment slot="content" let:item>
		{item.content}
		{#if item.data?.component}
			<svelte:component this={item.data.component} />
		{/if}
	</svelte:fragment>
</Accordion>
```
-->

<script context="module" lang="ts">
	export interface AccordionItem<T = any> {
		/** text summary of the item */
		summary?: string;

		/** text content of the item */
		content?: string;

		/** controls whether the content is displayed */
		open?: boolean;

		/** any data to pass back to the parent */
		data?: T;
	}
</script>

<script lang="ts">
	import { onMount, type ComponentType } from "svelte";
	import { slide, type SlideParams } from "svelte/transition";
	import { prefersReducedMotion } from "$lib/util/accessibility";

	let className = "";
	export { className as class };

	export let id = "";

	/** array of `AccordionItem` elements */
	export let items: AccordionItem[];

	export let icon: string | ComponentType = "";

	/** class of the `div` around each `details` element */
	export let classDetails = "";

	/** class of all the `summary` elements */
	export let classHeader = "";

	/** class of all the `div`s that wrap the `summary` slot */
	export let classSummary = "";

	/** class of all the `div`s that wrap the `content` slot */
	export let classContent = "";

	/** class of the `div` that wrap the icon if displayed */
	export let classIcon = "";

	/** rotates the icon, slides the content, defaults to empty object, set to false to remove */
	export let transition: SlideParams | false = {};

	/** if `true`, other items close when a new one is opened */
	export let autoClose = true;

	/** set to `true` on the client */
	let clientJs = false;

	const toggleOpen = (i: number) => {
		items[i].open = !items[i].open;
		if (autoClose) {
			for (let j = 0; j < items.length; j++) {
				const item = items[j];
				if (j !== i) item.open = false;
			}
		}
	};

	onMount(() => {
		clientJs = true;
		if (prefersReducedMotion()) transition = false;
	});
</script>

<div class={className} {id}>
	{#each items as item, index}
		<div class={classDetails}>
			<details bind:open={item.open}>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary
					role="button"
					tabindex="0"
					class={classHeader}
					on:click|preventDefault={() => toggleOpen(index)}
					on:keydown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							toggleOpen(index);
						}
					}}
				>
					<div class={classSummary}>
						<slot name="summary" {item} {index}>{item.summary}</slot>
					</div>
					<slot name="icon" {item} {index}>
						{#if icon}
							<div
								class={classIcon}
								class:d-rotate-180={item.open}
								class:d-transition={transition}
							>
								{#if typeof icon !== "string"}
									<svelte:component this={icon} />
								{:else}
									<span>{icon}</span>
								{/if}
							</div>
						{/if}
					</slot>
				</summary>
				{#if !clientJs || !transition}
					<div class={classContent}>
						<slot name="content" {item} {index}>{item.content}</slot>
					</div>
				{/if}
			</details>
			{#if clientJs && item.open && transition}
				<div class={classContent} transition:slide={transition}>
					<slot name="content" {item} {index}>{item.content}</slot>
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
	.d-rotate-180 {
		transform: rotate(180deg);
	}
	.d-transition {
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
