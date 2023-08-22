<!--
@component

### CopyButton

Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) to copy data to the clipboard. Falls back to `writeText` if `write` is not supported and `blob.type` is text. If JavaScript is disabled, the button is disabled and `blobParts.join()` is displayed after the button if `blob.type` is text.

@props

- `blobParts` - array of `BlobParts` to copy - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters)
- `blob` - use a blob in instead of `blobParts` and `options`, defaults to `new Blob(blobParts, options)`
- `classNoscript` - `noscript` class
- `class` 
- `id` 
- `options` - defaults to `{ type: "text/plain" }` - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters)
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

<CopyButton class="btn" blobParts={["Text to copy"]} />
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { delay } from "$lib/util/delay";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "";

	/** defaults to `{ type: "text/plain" }` - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters) */
	export let options: BlobPropertyBag | undefined = { type: "text/plain" };

	/** array of `BlobParts` to copy - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters) */
	export let blobParts: BlobPart[] | undefined = undefined;

	/** use a blob in instead of `blobParts` and `options`, defaults to `new Blob(blobParts, options)` */
	export let blob: Blob = new Blob(blobParts, options);

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `false` on the client depending on support */
	let disabled = true;

	/** changes `button` text after message is successfully copied */
	let complete = false;

	const writeSupport = () => "write" in navigator.clipboard;

	const typeText = blob.type.startsWith("text");

	/** determines if `writeText` can be utilized instead if `write` is not supported */
	const canWriteText = () => {
		const writeTextSupport = "writeText" in navigator.clipboard;
		return writeTextSupport && typeText;
	};

	/** copies the text to the clipboard */
	const copyText = async () => {
		try {
			if (writeSupport()) {
				const data = [new ClipboardItem({ [blob.type]: blob })];
				await navigator.clipboard.write(data);
			} else if (canWriteText()) {
				// use writeText
				await navigator.clipboard.writeText(blobParts ? blobParts.join() : "");
			}
			complete = true;
			setTimeout(() => (complete = false), delay);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		if (writeSupport() || canWriteText()) disabled = false;
	});
</script>

<button
	type="button"
	{disabled}
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

{#if typeText}
	<noscript>
		<span class={classNoscript}>{blobParts ? blobParts.join() : ""}</span>
	</noscript>
{/if}
