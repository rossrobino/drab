<script>
	/** @type {string} */
	let className = "";

	/** @type {string} */
	let idName = "";
	
	/** @type {string} */
	export let text = "";
	
	/** @type {string} */
	export let url = "";
	
	/** @type {string} */
	export let title = url.split("/").splice(-1)[0]; // default end of url

	export { className as class, idName as id };
	
	/** @type {boolean} */
	let complete = false;

	async function handleClick() {
		try {
			// @ts-ignore - this is not defined in certain browsers
			if (navigator.canShare) {
				await navigator.share({ text, url, title });
			} else {
				await navigator.clipboard.writeText(url);
				complete = true;
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<button on:click={handleClick} class={className} id={idName}>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>
