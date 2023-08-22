<script lang="ts">
	import { Tabs, FullscreenButton } from "$lib";
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
