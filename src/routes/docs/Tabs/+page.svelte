<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Tabs, FullscreenButton } from "$lib";

	const data: ComponentProps<Tabs>["data"] = [
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
