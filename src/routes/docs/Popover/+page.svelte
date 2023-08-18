<script lang="ts">
	import Popover from "$lib/components/Popover.svelte";

	let target: HTMLButtonElement;

	let display = false;
</script>

<button
	class="btn"
	type="button"
	bind:this={target}
	on:click={() => (display = !display)}
>
	{display ? "Close" : "Open"}
</button>

<Popover {target} bind:display class="p-2">
	<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
		<div class="font-bold">Bottom</div>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
	</div>
</Popover>
