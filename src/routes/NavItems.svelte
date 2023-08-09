<script lang="ts">
	import CodeIcon from "./CodeIcon.svelte";

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
	<li class="flex items-center gap-2">
		<a
			class="m-0"
			title="View Source"
			target="_blank"
			href="https://github.com/rossrobino/drab/tree/main/src/lib/components/{component}.svelte"
		>
			<CodeIcon />
		</a>
		<a class="m-0" href="#{component.toLowerCase()}">{component}</a>
	</li>
{/each}
