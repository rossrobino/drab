<!--
@component

### CopyButton

Uses the navigator api to copy text to the clipboard.

#### Slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | `Copy`       |
| `complete` | displays after copy is complete | `Copied`      |

#### Example

```svelte
<script>
    import { CopyButton } from "@rossrobino/components";
</script>

<CopyButton	text="Text to copy" />
```
-->

<script lang="ts">
	/** button class */
	let className: string = "";

	/** button id */
	let idName: string = "";

	export { className as class, idName as id };

	/** button title */
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

<button on:click={copyText} class={className} id={idName} {title}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Copy</slot>
	{/if}
</button>

<noscript>{text}</noscript>
