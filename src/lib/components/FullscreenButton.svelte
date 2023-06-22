<script lang="ts">
	import { onMount } from "svelte";

	/** element to make fullscreen (defaults to `document.documentElement` upon mount) */
	export let targetElement: HTMLElement | null = null;

	/** message to display in the `confirm` popup, set this to empty string `""` to disable `confirm` */
	export let confirmMessage = "";

	let className = "";
	let idName = "";
	export { className as class, idName as id };

	let fullscreen = false;

	onMount(() => {
		if (!targetElement) targetElement = document.documentElement;
	});

	const onClick = () => {
		if (fullscreen) {
			document.exitFullscreen();
		} else {
			if (targetElement && targetElement.requestFullscreen) {
				if (confirmMessage) {
					const permission = confirm(confirmMessage);
					if (permission) targetElement.requestFullscreen();
				} else {
					targetElement.requestFullscreen();
				}
			}
		}
	};
</script>

<svelte:window on:fullscreenchange={() => (fullscreen = !fullscreen)} />

<button on:click={onClick} class={className} id={idName}>
	{#if fullscreen}
		<slot name="enabled">Exit Fullscreen</slot>
	{:else}
		<slot name="disabled">Enable Fullscreen</slot>
	{/if}
</button>
