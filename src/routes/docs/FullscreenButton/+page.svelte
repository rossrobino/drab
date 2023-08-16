<script>
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";

	let fullscreenDiv;
</script>

<div>
	<FullscreenButton class="btn" />
</div>

<div
	bind:this={fullscreenDiv}
	class="mt-4 rounded bg-neutral-800 p-4 text-neutral-50"
>
	<div class="mb-2">Target element fullscreen</div>
	<FullscreenButton target={fullscreenDiv} class="btn btn-s bg-neutral-50">
		<span>Enable Element Fullscreen</span>
		<span slot="enabled">Exit Element Fullscreen</span>
	</FullscreenButton>
</div>
