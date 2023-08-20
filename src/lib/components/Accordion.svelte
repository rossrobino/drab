<!--
@component

### Accordion

Displays a list of `details` elements with helpful defaults and transitions. Use `AccordionItem.data` to send any additional data through the slot props. Works without JavaScript. 

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
- `transition` - rotates the icon, slides the content, set to `false` to remove

@slots

| name      | purpose                       | default value  | slot props      |
| --------- | ----------------------------- | -------------- | --------------- |
| `summary` | summary element               | `item.summary` | `item`, `index` |
| `icon`    | icon element                  | `icon` prop    | `item`, `index` |
| `content` | content of the accordion item | `item.content` | `item`, `index` |

@example

```svelte
<script lang="ts">
	import { Accordion } from "drab";
	import { FullscreenButton } from "drab";
	import { Chevron } from "$site/svg/Chevron.svelte";
</script>

<Accordion
	icon={Chevron}
	class="mb-12"
	classDetails="border-b"
	classHeader="flex gap-8 cursor-pointer items-center justify-between p-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4 px-4"
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
		{ summary: "Does it work without JavaScript?", content: "Yes." },
	]}
/>

<Accordion
	icon={Chevron}
	classDetails="border-b"
	classHeader="flex gap-8 cursor-pointer items-center justify-between p-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4 px-4"
	autoClose={false}
	items={[
		{ summary: "Summary", content: "Content" },
		{ summary: "Summary", content: "Content", data: { class: "uppercase" } },
		{
			summary: "Summary",
			content: "Content",
			data: { component: FullscreenButton },
		},
	]}
>
	<svelte:fragment slot="summary" let:item let:index>
		<span class={item.data?.class}>
			{item.summary}
			{index + 1}
		</span>
	</svelte:fragment>
	<svelte:fragment slot="content" let:item>
		<span>{item.content}</span>
		{#if item.data?.component === FullscreenButton}
			<div><svelte:component this={FullscreenButton} class="btn mt-4" /></div>
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
	import { duration } from "$lib/util/transition";

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

	/** rotates the icon, slides the content, set to `false` to remove */
	export let transition: SlideParams | false = { duration };

	const cssDuration = transition ? transition.duration : 0;

	/** if `true`, other items close when a new one is opened */
	export let autoClose = true;

	/** set to `true` on the client */
	let clientJs = false;

	const toggleOpen = (i: number) => {
		items[i].open = !items[i].open;
		if (autoClose) {
			// close the other open one
			for (let j = 0; j < items.length; j++) {
				if (j !== i) items[j].open = false;
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
								style="--duration: {cssDuration}ms;"
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
				<!-- outside the details for the transition -->
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
		transition-duration: var(--duration);
	}
</style>
