<script lang="ts">
	const components = [
		"Accordion",
		"Breakpoint",
		"Chord",
		"ContextMenu",
		"CopyButton",
		"DataTable",
		"Editor",
		"FullscreenButton",
		"Popover",
		"ShareButton",
		"Sheet",
		"Tabs",
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
