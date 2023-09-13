<script lang="ts">
	const components = [
		"Breakpoint",
		"ContextMenu",
		"CopyButton",
		"DataTable",
		"Details",
		"Editor",
		"FrettedChord",
		"FullscreenButton",
		"Popover",
		"ShareButton",
		"Sheet",
		"Tablature",
		"YouTube",
	];

	components.sort();

	export let linkClick = () => {};
</script>

{#each components as component}
	<li class="pl-0 font-antique">
		<a on:click={linkClick} class="mb-4 leading-4" href="/docs/{component}">
			{component}
		</a>
	</li>
{/each}
