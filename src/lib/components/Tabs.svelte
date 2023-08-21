<!--
@component

### Tabs

Displays tabs and the selected tab's content.

@props

- `classNoscript` - `noscript` class
- `classTabActive` - class of the active tab's `button`
- `classTabInactive` - class of all the inactive tabs' `button`s
- `classTabList` - class of the `div` that wraps the `button`s
- `classTabPanel` - class of `div` that wraps the slotted content
- `classTab` - class of all title `button`s
- `class` 
- `data` - provides the content for each tab
- `id` 
- `selectedIndex` - index of selected tab, defaults to `0`

@slots

| name       | purpose              | default value   | slot props             |
| ---------- | -------------------- | --------------- | ---------------------- |
| `tab`      | title of each tab    | `item.tab`      | `item`, `index`, `tab` |
| `tabPanel` | selected tab's panel | `item.tabPanel` | `item`, `index`        |

@example

```svelte
<script lang="ts">
	import { Tabs, type TabsItem, FullscreenButton } from "drab";

	const data: TabsItem[] = [
		{ tab: "Tab", tabPanel: "Content" },
		{
			tab: "Another Tab",
			tabPanel: "Some more content",
			component: FullscreenButton,
		},
	];
</script>

<Tabs
	{data}
	class="mb-4"
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded-md bg-neutral-200 p-1"
	classTab="btn btn-s p-2"
	classTabActive="bg-white text-neutral-950 shadow"
	classTabInactive="bg-neutral-200 text-neutral-600"
	classTabPanel="py-2"
/>

<Tabs
	{data}
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded-md bg-neutral-200 p-1"
	classTab="btn btn-s p-2"
	classTabActive="bg-white text-neutral-950 shadow"
	classTabInactive="bg-neutral-200 text-neutral-600"
	classTabPanel="py-2"
>
	<svelte:fragment slot="tab" let:item let:index>
		{index + 1}.
		{item.tab}
	</svelte:fragment>
	<svelte:fragment slot="tabPanel" let:item>
		<div>{item.tabPanel}</div>
		{#if item.component}
			<svelte:component this={item.component} class="btn mt-2" />
		{/if}
	</svelte:fragment>
</Tabs>
```
-->

<script context="module" lang="ts">
	export interface TabsItem {
		/** tab title, displayed in `button` element */
		tab?: string;

		/** slotted content, displayed once tab is clicked */
		tabPanel?: string;

		/** any data to pass back to the parent */
		[key: string | number]: any;
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

	/** provides the content for each tab */
	export let data: TabsItem[];

	/** index of selected tab, defaults to `0` */
	export let selectedIndex = 0;

	/** sets to `true` on the client */
	let clientJs = false;

	/** a random `id` for the panel to assign the tab to */
	const idPanel = "tabPanel-" + Math.random().toString().substring(2, 8);

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<div class={classTabList} role="tablist">
		{#each data as item, index}
			<button
				role="tab"
				tabindex={index === selectedIndex ? 0 : -1}
				aria-selected={index === selectedIndex}
				aria-controls={idPanel}
				disabled={!clientJs}
				class="{classTab} {selectedIndex === index
					? classTabActive
					: ''} {selectedIndex !== index ? classTabInactive : ''}"
				on:click={() => (selectedIndex = index)}
			>
				<slot name="tab" {item} {index} tab={item.tab}>{item.tab}</slot>
			</button>
		{/each}
	</div>
	{#each data as item, index}
		{#if index === selectedIndex}
			<div class={classTabPanel} role="tabpanel" id={idPanel}>
				<slot name="tabPanel" {item} {index}>
					{item.tabPanel}
				</slot>
			</div>
		{/if}
	{/each}
	<noscript>
		<div class={classNoscript}>{messageNoScript}</div>
	</noscript>
</div>
