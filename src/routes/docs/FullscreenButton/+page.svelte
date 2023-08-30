<script lang="ts">
	import { FullscreenButton } from "$lib";

	let target: HTMLDivElement;
</script>

<FullscreenButton class="button button-primary" />

<div bind:this={target} class="mt-8 rounded border bg-muted p-4">
	<div class="mb-2">Target element</div>
	<FullscreenButton {target} class="button button-primary">
		Enable Element Fullscreen
	</FullscreenButton>
</div>
