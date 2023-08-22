<!--
@component

### Tabs

Displays tabs and the selected tab's content.

@props

- `classTabList` - class of the `div` that wraps the `button`s
- `classTab` - class of all tab `button`s
- `class` 
- `data` - provides the content for each tab
- `id` 
- `indexSelected` - index of selected tab, defaults to `0`

@slots

| name       | purpose              | default value   | slot props                              |
| ---------- | -------------------- | --------------- | --------------------------------------- |
| `tab`      | title of each tab    | `item.tab`      | `item`, `index`, `selectedIndex`, `tab` |
| `tabPanel` | selected tab's panel | `item.tabPanel` | `item`, `index`                         |

@example

```svelte
<script lang="ts">
	import { Tabs, FullscreenButton } from "drab";
</script>

<Tabs
	data={[
		{ tab: "Tab", tabPanel: "Content" },
		{
			tab: "Another Tab",
			tabPanel: "Some more content",
			component: FullscreenButton,
		},
	]}
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded-md bg-neutral-200 p-1"
>
	<svelte:fragment slot="tab" let:item let:index let:indexSelected>
		<div
			class="btn btn-s {index === indexSelected
				? 'bg-white text-neutral-950 shadow'
				: 'bg-neutral-200 text-neutral-600'}"
		>
			{item.tab}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="tabPanel" let:item>
		<div class="py-2">
			<div>{item.tabPanel}</div>
			{#if item.component}
				<svelte:component this={item.component} class="btn mt-2" />
			{/if}
		</div>
	</svelte:fragment>
</Tabs>
```
-->

<script lang="ts">
	import { onMount } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	/** class of the `div` that wraps the `button`s */
	export let classTabList = "";

	/** class of all tab `button`s */
	export let classTab = "";

	interface TabsItem {
		/** tab title, displayed in `button` element */
		tab?: string;

		/** slotted content, displayed once tab is clicked */
		tabPanel?: string;

		/** any data to pass back to the parent */
		[key: string | number]: any;
	}

	/** provides the content for each tab */
	export let data: TabsItem[];

	/** index of selected tab, defaults to `0` */
	export let indexSelected = 0;

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
				tabindex={index === indexSelected ? 0 : -1}
				aria-selected={index === indexSelected}
				aria-controls={idPanel}
				disabled={!clientJs}
				class={classTab}
				on:click={() => (indexSelected = index)}
			>
				<slot name="tab" {item} {index} {indexSelected} tab={item.tab}>
					{item.tab}
				</slot>
			</button>
		{/each}
	</div>
	{#each data as item, index}
		{#if index === indexSelected}
			<div role="tabpanel" id={idPanel}>
				<slot name="tabPanel" {item} {index}>
					{item.tabPanel}
				</slot>
			</div>
		{/if}
	{/each}
</div>
