<script>
	import Accordion from "$lib/components/Accordion.svelte";
	import Chevron from "$site/svg/Chevron.svelte";
</script>

<Accordion
	icon={Chevron}
	classDetails="border-b"
	classHeader="flex gap-8 cursor-pointer items-center justify-between py-4 font-bold hover:underline"
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
>
	<svelte:fragment slot="content" let:item let:index>
		<div class="mb-4">
			<span>{index + 1}.</span>
			<span>{item.content}</span>
		</div>
	</svelte:fragment>
</Accordion>
