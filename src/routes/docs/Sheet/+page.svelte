<script lang="ts">
	import Sheet from "$lib/components/Sheet.svelte";

	let display = false;
</script>

<div>
	<button type="button" class="btn" on:click={() => (display = true)}>
		Open
	</button>
</div>

<Sheet
	bind:display
	class="bg-neutral-50/80 backdrop-blur"
	classSheet="p-4 shadow bg-white"
>
	<div class="mb-4 flex items-center justify-between">
		<h2 class="my-0">Sheet</h2>
		<button type="button" class="btn btn-s" on:click={() => (display = false)}>
			Close
		</button>
	</div>
	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur.
	</div>
</Sheet>
