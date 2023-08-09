<!--
@component

### CopyButton

Uses the navigator api to copy text to the clipboard.

@props

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

<CopyButton text="Text to copy" />
```
-->

<script lang="ts">
	let className: string = "";
	export { className as class };

	export let id: string = "";

	export let title = "Copy";

	/** text to copy */
	export let text: string;

	/** changes button text after message is successfully copied */
	let complete: boolean = false;

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
</script>

<button on:click={copyText} class={className} {id} {title}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Copy</slot>
	{/if}
</button>
