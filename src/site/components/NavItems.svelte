<script lang="ts">
	const components = [
		"Breakpoint",
		"Chord",
		"ContextMenu",
		"CopyButton",
		"DataTable",
		"Details",
		"Editor",
		"FullscreenButton",
		"Popover",
		"ShareButton",
		"Sheet",
		"YouTube",
	];

	components.sort();

	export let linkClick = () => {};
</script>

{#each components as component}
	<li>
		<a on:click={linkClick} class="mb-4 leading-4" href="/docs/{component}">
			{component}
		</a>
	</li>
{/each}
