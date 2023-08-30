<script lang="ts">
	import { Details } from "$lib";
	import Chevron from "$site/svg/Chevron.svelte";
</script>

<Details class="border-b">
	<svelte:fragment slot="summary" let:open>
		<div class="link flex items-center justify-between gap-8 p-4">
			<div>Does it work without JavaScript?</div>
			<div class="transition" class:rotate-180={open}>
				<Chevron />
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="px-4 pb-4">Yes.</div>
	</svelte:fragment>
</Details>
