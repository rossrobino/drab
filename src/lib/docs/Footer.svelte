<script lang="ts">
	import "./docs.css";
	import type { Info } from "$lib/types";

	/** project information */
	export let info: Info;
</script>

<footer class="bg-zinc-900 text-zinc-50 mt-4 flex justify-center">
	<div class="p-4 flex justify-between basis-full md:basis-[768px]">
		<a href={info.authorHomepage}>{info.author}</a>
		<a href={`${info.gitHub}/blob/main/LICENSE.md`}>
			{info.license} License
		</a>
	</div>
</footer>
