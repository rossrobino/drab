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
</script>

{#each components as component}
	<li>
		<a class="mb-4 leading-4" href="/docs/{component}">
			{component}
		</a>
	</li>
{/each}
