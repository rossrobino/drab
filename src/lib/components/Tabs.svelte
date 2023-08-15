<!--
@component

### Tabs

Displays tabs and the active tab's content.

@props

- `classNoscript` - `noscript` class
- `classTabActive` - class of the active tab's `button`
- `classTabInactive` - class of all the inactive tabs' `button`s
- `classTabList` - class of the `div` that wraps the `button`s
- `classTabPanel` - class of `div` that wraps the slotted content
- `classTab` - class of all title `button`s
- `class` 
- `id` 
- `selectedIndex` - index of selected tab, defaults to 0
- `tabs` - array of tabs

@slots

| name      | purpose               | default value      | slot props      |
| --------- | --------------------- | ------------------ | --------------- |
| `default` | active item's content | `activeItem.panel` | `activeItem`    |
| `tab`     | title of each tab     | `item.tab`         | `item`, `index` |

@example

```svelte
<script>
	import { Tabs } from "drab";
	import { FullscreenButton } from "drab";
</script>

<Tabs
	class="mb-4"
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded bg-gray-200 p-1"
	classTab="btn btn-s rounded-sm p-1"
	classTabActive="bg-white text-gray-950"
	classTabInactive="bg-gray-200 text-gray-500"
	classTabPanel="py-2"
	tabs={[
		{ tab: "Tab", panel: "Content" },
		{ tab: "Another Tab", panel: "Some more content" },
	]}
/>

<Tabs
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded bg-gray-200 p-1"
	classTab="btn btn-s rounded-sm p-1"
	classTabActive="bg-white text-gray-950"
	classTabInactive="bg-gray-200 text-gray-500"
	classTabPanel="py-2"
	tabs={[
		{ tab: "Tab", panel: "Generated indexes" },
		{
			tab: "Tab",
			panel: "A tab with a component",
			data: { component: FullscreenButton },
		},
	]}
	let:selectedTab
>
	<svelte:fragment slot="tab" let:item let:index>
		{item.tab}
		{index + 1}
	</svelte:fragment>
	<div class="mb-2">{selectedTab.panel}</div>
	{#if selectedTab.data?.component}
		<svelte:component this={selectedTab.data.component} class="btn" />
	{/if}
</Tabs>
```
-->

<script context="module" lang="ts">
	export interface TabsTab<T = any> {
		/** tab title, displayed in `button` element */
		tab?: string;

		/** slotted content, displayed once tab is clicked */
		panel?: string;

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
	export let classTabList = "";

	/** class of all title `button`s */
	export let classTab = "";

	/** class of the active tab's `button` */
	export let classTabActive = "";

	/** class of all the inactive tabs' `button`s */
	export let classTabInactive = "";

	/** `noscript` class */
	export let classNoscript = "";

	/** class of `div` that wraps the slotted content */
	export let classTabPanel = "";

	/** array of tabs */
	export let tabs: TabsTab[];

	/** index of selected tab, defaults to 0 */
	export let selectedIndex = 0;

	/** sets to `true` on the client */
	let clientJs = false;

	$: selectedTab = tabs[selectedIndex];

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<div class={classTabList} role="tablist">
		{#each tabs as item, index}
			<button
				role="tab"
				tabindex={index === selectedIndex ? 0 : -1}
				aria-selected={index === selectedIndex}
				aria-controls="tabpanel"
				disabled={!clientJs}
				class="{classTab} {selectedIndex === index
					? classTabActive
					: ''} {selectedIndex !== index ? classTabInactive : ''}"
				on:click={() => (selectedIndex = index)}
			>
				<slot name="tab" {item} {index}>{item.tab}</slot>
			</button>
		{/each}
	</div>
	<div class={classTabPanel} role="tabpanel" id="tabpanel">
		<slot {selectedTab}>{selectedTab.panel}</slot>
	</div>
	<noscript>
		<div class={classNoscript}>{messageNoScript}</div>
	</noscript>
</div>
