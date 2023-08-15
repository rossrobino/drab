<!--
@component

### ShareButton

Uses the navigator api to share or copy a url link depending on browser support.

@props

- `classNoscript` - `noscript` class
- `class` 
- `id` 
- `text` - prefixed text in share message
- `title` - title of share message and `button` attribute, defaults to end of url
- `url` - url to be shared

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | `Share`       |
| `complete` | displays after copy is complete | `Copied`      |

@example

```svelte
<script>
	import { ShareButton } from "drab";
</script>

<div>
	<ShareButton
		class="btn"
		text="Check out this page: "
		title="drab"
		url="https://drab.robino.dev"
	/>
</div>
```
-->

<script lang="ts">
	import { onMount } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	/** prefixed text in share message */
	export let text = "";

	/** url to be shared */
	export let url: string;

	/** title of share message and `button` attribute, defaults to end of url */
	export let title = url.split("/").splice(-1)[0];

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	/** changes `button` text after message is successfully copied */
	let complete = false;

	/** tries to share if supported, copies the text otherwise */
	const onClick = async () => {
		try {
			// @ts-expect-error - is is not defined in certain browsers
			if (navigator.canShare) {
				await navigator.share({ text, url, title });
			} else {
				await navigator.clipboard.writeText(url);
				complete = true;
				setTimeout(() => (complete = false), 800);
			}
		} catch (error) {
			console.log(error);
		}
	};

	onMount(() => (clientJs = true));
</script>

<button
	type="button"
	disabled={!clientJs}
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

<noscript><span class={classNoscript}>{url}</span></noscript>
