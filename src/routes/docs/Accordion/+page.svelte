<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Accordion, FullscreenButton } from "$lib";
	import Chevron from "$site/svg/Chevron.svelte";

	const data: ComponentProps<Accordion>["data"] = [
		{ summary: "Is it accessible?", content: "Yes." },
		{
			summary: "Is it styled?",
			content: "Nope, style with global styles.",
		},
		{
			summary: "Is it animated?",
			content: "Yes, with the transition prop.",
		},
		{
			summary: "Is it customizable?",
			content: "Yes, customize with slots.",
			class: "uppercase",
			component: FullscreenButton,
		},
		{ summary: "Does it work without JavaScript?", content: "Yes." },
	];
</script>

<Accordion
	{data}
	icon={Chevron}
	class="mb-12"
	classDetails="border-b"
	classSummary="flex gap-8 cursor-pointer items-center justify-between p-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4 px-4"
/>

<Accordion
	{data}
	icon={Chevron}
	classDetails="border-b"
	classSummary="flex gap-8 cursor-pointer items-center justify-between p-4 font-bold underline hover:decoration-dotted"
	classContent="pb-4 px-4"
	autoClose={false}
>
	<svelte:fragment slot="summary" let:item let:index>
		<span class={item.class ? item.class : ""}>
			{index + 1}.
			{item.summary}
		</span>
	</svelte:fragment>
	<svelte:fragment slot="content" let:item>
		<span>{item.content}</span>
		{#if item.component === FullscreenButton}
			<div><svelte:component this={FullscreenButton} class="btn mt-4" /></div>
		{/if}
	</svelte:fragment>
</Accordion>
