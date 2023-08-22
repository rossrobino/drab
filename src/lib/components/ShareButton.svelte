<!--
@component

### ShareButton

Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) to share data. Progressively enhances according to browser support.

- If the browser cannot share the provided data:
	- `url` - uses the the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) to copy
	- `files` - uses a hidden `anchor` element to download the first file in the `files` array
- If no JavaScript:
	- `button` is disabled
	- `url` - displayed after the `button`

@props

- `classNoscript` - `noscript` class
- `class` 
- `id` 
- `shareData` - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- `title` 

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | `Share`       |
| `complete` | displays after copy is complete | `Copied`      |

@example

```svelte
<script lang="ts">
	import { ShareButton } from "drab";

	let fileInput: HTMLInputElement;

	let fileShareData: ShareData;

	const onInput = () => {
		if (fileInput.files) {
			fileShareData.files = [fileInput.files[0]];
		}
	};
</script>

<ShareButton
	class="btn mb-8"
	shareData={{
		text: "Check out this page: ",
		title: "drab",
		url: "https://drab.robino.dev",
	}}
>
	Share URL
</ShareButton>

<div>
	<label class="label" for="fileInput">Upload File</label>
	<input
		type="file"
		id="fileInput"
		class="input mb-4"
		bind:this={fileInput}
		on:input={onInput}
	/>
	<ShareButton class="btn" bind:shareData={fileShareData}>
		Share File
	</ShareButton>
</div>
```
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { delay } from "$lib/util/delay";

	let className = "";
	export { className as class };

	export let id = "";

	export let title = "";

	/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) */
	export let shareData: ShareData = {};

	let downloadAnchor: HTMLAnchorElement;

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	/** changes `button` text after message is successfully copied */
	let complete = false;

	/** tries to share if supported, copies the url otherwise */
	const onClick = async () => {
		if (navigator.canShare && navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
			} catch (error: any) {
				if (error.name !== "AbortError") {
					console.error(error);
				}
			}
		} else if (shareData.url) {
			// progressively enhance, copy the link
			try {
				await navigator.clipboard.writeText(shareData.url);
				complete = true;
				setTimeout(() => (complete = false), delay);
			} catch (error) {
				console.error(error);
			}
		} else if (shareData.files) {
			// progressively enhance, download the first file
			const file = shareData.files[0];
			downloadAnchor.download = file.name;
			downloadAnchor.href = URL.createObjectURL(file);
			downloadAnchor.click();
		}
	};

	onMount(() => (clientJs = true));
</script>

<button
	type="button"
	disabled={!clientJs || (!shareData.url && !shareData.files)}
	on:click={onClick}
	class={className}
	{id}
	{title}
>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>

<a href="/" bind:this={downloadAnchor} style:display="none">Download</a>

{#if shareData.url}
	<noscript><span class={classNoscript}>{shareData.url}</span></noscript>
{/if}
