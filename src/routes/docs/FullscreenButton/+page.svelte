<script>
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";

	let fullscreenDiv;
</script>

<div>
	<FullscreenButton class="btn" />
</div>

<div
	bind:this={fullscreenDiv}
	class="mt-4 rounded bg-gray-800 p-4 text-gray-50"
>
	<div class="mb-2">Target element fullscreen</div>
	<FullscreenButton targetElement={fullscreenDiv} class="btn">
		<span>Enable Element Fullscreen</span>
		<span slot="enabled">Exit Element Fullscreen</span>
	</FullscreenButton>
</div>
