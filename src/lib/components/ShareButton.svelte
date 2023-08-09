<!--
@component

### ShareButton

Uses the navigator api to share or copy a url link depending on browser support.

@props

- `class` 
- `id` 
- `text` - prefixed text in share message
- `title` - title of share message and button attribute
- `url` - url to be shared

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | `Share`       |
| `complete` | displays after copy is complete | `Copied`      |

@example

```svelte
<script>
    import { ShareButton } from "@rossrobino/components";
</script>

<ShareButton
	text="Check out this page: "
	title="@rossrobino/components"
    url="https://components.robino.dev"
/>
```
-->

<script lang="ts">
	let className: string = "";
	export { className as class };

	export let id: string = "";

	/** prefixed text in share message */
	export let text: string = "";

	/** url to be shared */
	export let url: string;

	/** title of share message and button attribute */
	export let title: string = url.split("/").splice(-1)[0]; // default end of url

	/** changes button text after message is successfully copied */
	let complete: boolean = false;

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
</script>

<button on:click={onClick} class={className} {id} {title}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>

<noscript>{url}</noscript>
