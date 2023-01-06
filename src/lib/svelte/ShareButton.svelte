<script>
	let className = "";
	export { className as class };
	export let text = "";
	export let url = "";
	export let title = url.split("/").splice(-1)[0]; // default end of url

	let complete = false;

	async function handleClick() {
		try {
			// @ts-ignore - this is not defined in certain browsers
			if (navigator.canShare) {
				await navigator.share({ title, text, url });
			} else {
				await navigator.clipboard.writeText(url);
				complete = true;
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<button on:click={handleClick} class={className}>
	{#if complete}
		<slot name="complete">Copied!</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>
