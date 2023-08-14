<script lang="ts">
	import GitHub from "$site/svg/GitHub.svelte";

	export let data;
</script>

<h1>{data.title}</h1>

<p>
	<a
		class="flex items-center gap-2"
		title="View Source"
		target="_blank"
		href="https://github.com/rossrobino/drab/tree/main/src/lib/components/{data.title}.svelte"
	>
		<GitHub />
		<span>Source</span>
	</a>
</p>

<div class="flex justify-center rounded border p-8">
	<div class="flex w-full flex-col gap-8">
		<slot />
	</div>
</div>

<div>{@html data.html}</div>
