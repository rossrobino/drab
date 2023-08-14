<script>
	import Tabs from "$lib/components/Tabs.svelte"
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