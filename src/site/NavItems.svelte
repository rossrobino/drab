<script lang="ts">
	import Code from "$site/svg/Code.svelte";

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
		<a class="m-0 flex items-center gap-2" href="/docs/{component}">
			<Code />
			<span>{component}</span>
		</a>
	</li>
{/each}
