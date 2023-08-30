<!--
@component

### CopyButton

Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) to copy data to the clipboard. Falls back to `writeText` if `write` is not supported and `blob.type` is text.

@props

- `blobParts` - array of `BlobParts` to copy - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters)
- `blob` - use a blob in instead of `blobParts` and `options`, defaults to `new Blob(blobParts, options)`
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

	let value = "";
</script>

<input
	class="input mb-4"
	type="text"
	placeholder="Enter text to copy"
	bind:value
/>

<CopyButton class="button button-primary" blobParts={[value]} />
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

	/** set to `false` on the client depending on support */
	let disabled = true;

	/** changes `button` text after message is successfully copied */
	let complete = false;

	/** used if `writeText` is required, can't use `blobParts` directly in case `blob` prop is used */
	let blobText: string;

	const setBlobText = async (blob: Blob) => (blobText = await blob.text());

	const writeSupport = () => "write" in navigator.clipboard;

	/** determines if `writeText` can be utilized instead, if `write` is not supported */
	const canWriteText = () => {
		// check browser support
		const writeTextSupport = "writeText" in navigator.clipboard;
		// check if the type is text (able to pass into `writeText`)
		const typeText = blob.type.startsWith("text");
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
				await navigator.clipboard.writeText(blobText);
			}
			complete = true;
			setTimeout(() => (complete = false), delay);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(async () => {
		if (writeSupport() || canWriteText()) disabled = false;
	});

	// if `blobParts` prop is used and it changes, reset `blob`
	$: if (blobParts) blob = new Blob(blobParts, options);

	// if the blob changes, reset `blobText`
	$: setBlobText(blob);
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
