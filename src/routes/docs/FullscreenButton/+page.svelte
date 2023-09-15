<script lang="ts">
	import { FullscreenButton } from "$lib";

	let target: HTMLDivElement;
</script>

<FullscreenButton class="button button-primary" />

<div bind:this={target} class="card bg-muted mt-8">
	<div class="mb-2">Target element</div>
	<FullscreenButton {target} class="button button-primary">
		Enable Element Fullscreen
	</FullscreenButton>
</div>
