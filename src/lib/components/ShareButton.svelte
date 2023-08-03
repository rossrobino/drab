<script lang="ts">
	/** button class */
	let className: string = "";

	/** button id */
	let idName: string = "";

	export { className as class, idName as id };

	/** prefixed text in share message */
	export let text: string = "";

	/** url to be shared */
	export let url: string = "";

	/** title of share message */
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

<!--
@component
Uses the navigator api to share or copy a url link depending on browser support.
-->

<button on:click={onClick} class={className} id={idName}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>

<noscript>{url}</noscript>
