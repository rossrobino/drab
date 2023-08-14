<!--
@component

### CopyButton

Uses the navigator api to copy text to the clipboard.

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
<script>
	import { CopyButton } from "drab";
</script>

<div>
	<CopyButton class="btn" text="Text to copy" />
</div>
```
-->

<script lang="ts">
	import { onMount } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "Copy";

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
			setTimeout(() => (complete = false), 800);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => (clientJs = true));
</script>

<button disabled={!clientJs} on:click={copyText} class={className} {id} {title}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Copy</slot>
	{/if}
</button>

<noscript><span class={classNoscript}>{text}</span></noscript>
