<script lang="ts">
	import { clickOutside } from "../utilities/clickOutside";

	let className: string = "";
	let idName: string = "";
	export { className as class, idName as id };
	export let text: string = "";
	export let url: string = "";
	export let title: string = url.split("/").splice(-1)[0]; // default end of url

	let complete: boolean = false;

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

	function onBlur() {
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
