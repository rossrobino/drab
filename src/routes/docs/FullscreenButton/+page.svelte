<script lang="ts">
	import { FullscreenButton } from "$lib";

	let target: HTMLDivElement;
</script>

<FullscreenButton class="btn" />

<div bind:this={target} class="mt-8 rounded bg-neutral-800 p-4 text-neutral-50">
	<div class="mb-2">Target element</div>
	<FullscreenButton {target} class="btn btn-s bg-neutral-50">
		Enable Element Fullscreen
	</FullscreenButton>
</div>
