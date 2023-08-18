<!--
@component

### FullscreenButton

Make the document or a specific element fullscreen.

@props

- `classNoscript` - `noscript` class
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

<FullscreenButton class="btn" />

<div bind:this={target} class="mt-8 rounded bg-neutral-800 p-4 text-neutral-50">
	<div class="mb-2">Target element</div>
	<FullscreenButton {target} class="btn btn-s bg-neutral-50">
		Enable Element Fullscreen
	</FullscreenButton>
</div>
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "";

	/** element to make fullscreen (defaults to `document.documentElement` upon mount) */
	export let target: HTMLElement | null = null;

	/** message to display in the `confirm` popup, defaults to empty string `""` -- disabled */
	export let confirmMessage = "";

	/** `noscript` class */
	export let classNoscript = "";

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

	onMount(() => {
		// @ts-expect-error - not supported on some devices
		if (document.documentElement.requestFullscreen) disabled = false;
		if (!target) target = document.documentElement;
	});
</script>

<svelte:window on:fullscreenchange={() => (fullscreen = !fullscreen)} />

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

<noscript><div class={classNoscript}>{messageNoScript}</div></noscript>
