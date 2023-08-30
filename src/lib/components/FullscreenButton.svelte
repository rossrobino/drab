<!--
@component

### FullscreenButton

Make the document or a `target` element fullscreen.

@props

- `class` 
- `confirmMessage` - message to display in the `confirm` popup, defaults to empty string `""` -- disabled
- `id` 
- `target` - element to make fullscreen (defaults to `document.documentElement` upon mount)
- `title` 

@slots

| name       | purpose                                        | default value        |
| ---------- | ---------------------------------------------- | -------------------- |
| `default`  | content to display when fullscreen is disabled | `Enabled Fullscreen` |
| `enabled`  | content to display when fullscreen is enabled  | `Exit Fullscreen`    |

@example

```svelte
<script lang="ts">
	import { FullscreenButton } from "drab";

	let target: HTMLDivElement;
</script>

<FullscreenButton class="button button-primary" />

<div bind:this={target} class="mt-8 rounded border bg-muted p-4">
	<div class="mb-2">Target element</div>
	<FullscreenButton {target} class="button button-primary">
		Enable Element Fullscreen
	</FullscreenButton>
</div>
```
-->

<script lang="ts">
	import { onMount } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "";

	/** element to make fullscreen (defaults to `document.documentElement` upon mount) */
	export let target: HTMLElement | null = null;

	/** message to display in the `confirm` popup, defaults to empty string `""` -- disabled */
	export let confirmMessage = "";

	/** set to `false` on the client if supported */
	let disabled = true;

	let fullscreen = false;

	const onClick = () => {
		if (fullscreen) {
			document.exitFullscreen();
		} else {
			if (target && target.requestFullscreen) {
				if (confirmMessage) {
					const permission = confirm(confirmMessage);
					if (permission) target.requestFullscreen();
				} else {
					target.requestFullscreen();
				}
			}
		}
	};

	const syncFullscreen = () => {
		fullscreen = document.fullscreenElement !== null;
	};

	onMount(() => {
		// @ts-expect-error - not supported on some devices
		if (document.documentElement.requestFullscreen) {
			syncFullscreen();
			disabled = false;
		}
		if (!target) target = document.documentElement;
	});
</script>

<svelte:window on:fullscreenchange={syncFullscreen} />

<button
	type="button"
	{disabled}
	on:click={onClick}
	class={className}
	{id}
	{title}
>
	{#if fullscreen}
		<slot name="enabled">Exit Fullscreen</slot>
	{:else}
		<slot>Enable Fullscreen</slot>
	{/if}
</button>
