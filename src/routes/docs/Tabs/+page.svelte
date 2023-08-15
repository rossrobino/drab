<script>
	import Tabs from "$lib/components/Tabs.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
</script>

<Tabs
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded bg-gray-200 p-1"
	classTab="btn rounded-sm p-0.5"
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
	classTab="btn rounded-sm p-0.5"
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
	<div>{selectedTab.panel}</div>
	{#if selectedTab.data?.component}
		<svelte:component this={selectedTab.data.component} class="btn" />
	{/if}
</Tabs>
