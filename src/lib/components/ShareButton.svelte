<script lang="ts">
	import { clickOutside } from "../utilities/clickOutside";

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

	async function handleClick(): Promise<void> {
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

	function onBlur(): void {
		complete = false;
	}
</script>

<button
	on:click={handleClick}
	use:clickOutside={onBlur}
	class={className}
	id={idName}
>
	{#if complete}
		<slot name="complete">Copied</slot>
	{:else}
		<slot>Share</slot>
	{/if}
</button>

<noscript>{url}</noscript>
