<!--
@component

### Tabs

Displays tabs and the active tab's content.

@props

- `activeIndex` - index of active tab, defaults to 0
- `classContent` - class of `div` that wraps the slotted content
- `classHeader` - class of the `div` that wraps the `button`s
- `classNoscript` - `noscript` class
- `classTitleActive` - class of the active tab's `button`
- `classTitleInactive` - class of all the inactive tabs' `button`s
- `classTitle` - class of all title `button`s
- `class` 
- `id` 
- `tabs` - array of tabs

@slots

| name      | purpose               | default value        | slot props      |
| --------- | --------------------- | -------------------- | --------------- |
| `default` | active item's content | `activeItem.content` | `activeItem`    |
| `title`   | title of each tab     | `item.title`         | `item`, `index` |

@example

```svelte
<script>
    import { Tabs } from "drab";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
</script>

<Tabs
	classHeader="grid grid-flow-col grid-rows-1 gap-1 rounded bg-gray-200 p-1"
	classTitle="btn rounded-sm p-0.5"
	classTitleActive="bg-white text-gray-950"
	classTitleInactive="bg-gray-200 text-gray-500"
	classContent="py-2"
	tabs={[
		{ title: "Tab 1", content: "Content 1" },
		{ title: "Tab 2", content: "Content 2" },
	]}
/>

<Tabs
	classHeader="grid grid-flow-col grid-rows-1 gap-1 rounded bg-gray-200 p-1"
	classTitle="btn rounded-sm p-0.5"
	classTitleActive="bg-white text-gray-950"
	classTitleInactive="bg-gray-200 text-gray-500"
	classContent="py-2"
	tabs={[
		{ title: "Tab", content: "Generated indexes" },
		{
			title: "Tab",
			content: "A tab with a component",
			data: { component: FullscreenButton },
		},
	]}
	let:activeTab
>
	<svelte:fragment slot="title" let:item let:index>
		{item.title}
		{index + 1}
	</svelte:fragment>
	<div>{activeTab.content}</div>
	{#if activeTab.data?.component}
		<svelte:component class="btn" this={activeTab.data.component} />
	{/if}
</Tabs>
```
-->

<script context="module" lang="ts">
	export interface TabsTab<T = any> {
		/** tab title, displayed in `button` element */
		title?: string;

		/** slotted content, displayed once tab is clicked */
		content?: string;

		/** any data to pass back to the parent */
		data?: T;
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	/** class of the `div` that wraps the `button`s */
	export let classHeader = "";

	/** class of all title `button`s */
	export let classTitle = "";

	/** class of the active tab's `button` */
	export let classTitleActive = "";

	/** class of all the inactive tabs' `button`s */
	export let classTitleInactive = "";

	/** `noscript` class */
	export let classNoscript = "";

	/** class of `div` that wraps the slotted content */
	export let classContent = "";

	/** array of tabs */
	export let tabs: TabsTab[];

	/** index of active tab, defaults to 0 */
	export let activeIndex = 0;

	/** sets to `true` on the client */
	let clientJs = false;

	$: activeTab = tabs[activeIndex];

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<div class={classHeader}>
		{#each tabs as item, index}
			<button
				disabled={!clientJs}
				class="{classTitle} {activeIndex === index
					? classTitleActive
					: ''} {activeIndex !== index ? classTitleInactive : ''}"
				on:click={() => (activeIndex = index)}
			>
				<slot name="title" {item} {index}>{item.title}</slot>
			</button>
		{/each}
	</div>
	<div class={classContent}>
		<slot {activeTab}>{activeTab.content}</slot>
	</div>
	<noscript>
		<div class={classNoscript}>{messageNoScript}</div>
	</noscript>
</div>
