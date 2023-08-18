<!--
@component

### CopyButton

Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) to copy text to the clipboard. If JavaScript is disabled, the button is disabled and `text` is displayed after the button.

@props

- `classNoscript` - `noscript` class
- `class` 
- `id` 
- `text` - text to copy
- `title` 

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | `Copy`        |
| `complete` | displays after copy is complete | `Copied`      |

@example

```svelte
<script lang="ts">
	import { CopyButton } from "drab";
</script>

<CopyButton class="btn" text="Text to copy" />
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { delay } from "$lib/util/delay";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "";

	/** text to copy */
	export let text: string;

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	/** changes `button` text after message is successfully copied */
	let complete = false;

	/** copies the text to the clipboard */
	const copyText = async () => {
		try {
			await navigator.clipboard.writeText(text);
			complete = true;
			setTimeout(() => (complete = false), delay);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => (clientJs = true));
</script>

<button
	type="button"
	disabled={!clientJs}
	on:click={copyText}
	class={className}
	{id}
	{title}
>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Copy</slot>
	{/if}
</button>

<noscript><span class={classNoscript}>{text}</span></noscript>
