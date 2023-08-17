<script>
	import Tabs from "$lib/components/Tabs.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
</script>

<Tabs
	class="mb-4"
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded-md bg-neutral-200 p-1"
	classTab="btn btn-s p-2"
	classTabActive="bg-white text-neutral-950 shadow"
	classTabInactive="bg-neutral-200 text-neutral-600"
	classTabPanel="py-2"
	tabs={[
		{ tab: "Tab", panel: "Content" },
		{ tab: "Another Tab", panel: "Some more content" },
	]}
/>

<Tabs
	classTabList="grid grid-flow-col grid-rows-1 gap-1 rounded-md bg-neutral-200 p-1"
	classTab="btn btn-s p-2"
	classTabActive="bg-white text-neutral-950 shadow"
	classTabInactive="bg-neutral-200 text-neutral-600"
	classTabPanel="py-2"
	tabs={[
		{ tab: "Tab", panel: "Generated indexes" },
		{
			tab: "Tab",
			panel: "A tab with a component",
			data: { component: FullscreenButton },
		},
	]}
>
	<svelte:fragment slot="tab" let:tab let:index>
		{tab.tab}
		{index + 1}
	</svelte:fragment>
	<svelte:fragment slot="panel" let:selectedTab>
		<div class="mb-2">{selectedTab.panel}</div>
		{#if selectedTab.data?.component}
			<svelte:component this={selectedTab.data.component} class="btn" />
		{/if}
	</svelte:fragment>
</Tabs>
