<script lang="ts">
	const components = [
		"Chord",
		"ContextMenu",
		"CopyButton",
		"DataTable",
		"Editor",
		"FullscreenButton",
		"ShareButton",
		"YouTube",
	];

	components.sort();
</script>

{#each components as component}
	<li><a href="#{component.toLowerCase()}">{component}</a></li>
{/each}
