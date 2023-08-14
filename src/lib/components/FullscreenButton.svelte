<!--
@component

### FullscreenButton

Make the document or a specific element fullscreen.

@props

- `classNoscript` - `noscript` class
- `class` 
- `confirmMessage` - message to display in the `confirm` popup, set this to empty string `""` to disable `confirm`
- `id` 
- `targetElement` - element to make fullscreen (defaults to `document.documentElement` upon mount)
- `title` 

@slots

| name       | purpose                                        | default value        |
| ---------- | ---------------------------------------------- | -------------------- |
| `default`  | content to display when fullscreen is disabled | `Enabled Fullscreen` |
| `enabled`  | content to display when fullscreen is enabled  | `Exit Fullscreen`    |

@example

```svelte
<script>
	import { FullscreenButton } from "drab";

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
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "Fullscreen";

	/** element to make fullscreen (defaults to `document.documentElement` upon mount) */
	export let targetElement: HTMLElement | null = null;

	/** message to display in the `confirm` popup, set this to empty string `""` to disable `confirm` */
	export let confirmMessage = "";

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client if supported */
	let supported = false;

	let fullscreen = false;

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

	onMount(() => {
		// @ts-expect-error - not supported on some devices
		if (document.documentElement.requestFullscreen) supported = true;
		if (!targetElement) targetElement = document.documentElement;
	});
</script>

<svelte:window on:fullscreenchange={() => (fullscreen = !fullscreen)} />

<button disabled={!supported} on:click={onClick} class={className} {id} {title}>
	{#if fullscreen}
		<slot name="enabled">Exit Fullscreen</slot>
	{:else}
		<slot>Enable Fullscreen</slot>
	{/if}
</button>

<noscript>
	<div class={classNoscript}>
		{messageNoScript}
	</div>
</noscript>
