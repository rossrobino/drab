<script lang="ts">
	import Accordion from "$lib/components/Accordion.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
	import Chevron from "$site/svg/Chevron.svelte";
</script>

<Accordion
	icon={Chevron}
	class="mb-12"
	classDetails="border-b"
	classHeader="flex gap-8 cursor-pointer items-center justify-between py-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4"
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
		{ summary: "Does it work without Javascript?", content: "Yes." },
	]}
/>

<Accordion
	icon={Chevron}
	classDetails="border-b"
	classHeader="flex gap-8 cursor-pointer items-center justify-between py-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4"
	items={[
		{ summary: "Summary", content: "Content" },
		{ summary: "Summary", content: "Content", data: { uppercase: true } },
		{
			summary: "Summary",
			content: "Content",
			data: { component: FullscreenButton },
		},
	]}
>
	<svelte:fragment slot="summary" let:item let:index>
		<span class:uppercase={item.data?.uppercase}>
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
