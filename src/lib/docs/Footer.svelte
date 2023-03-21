<script lang="ts">
	import "./docs.css";
	import type { Info } from "$lib/types/types";

	/** project information */
	export let info: Info;
</script>

<footer class="mt-4 flex justify-center bg-zinc-900 text-zinc-50">
	<div class="flex basis-full justify-between p-4 md:basis-[768px]">
		<a href={info.authorHomepage}>{info.author}</a>
		<a href={`${info.gitHub}/blob/main/LICENSE.md`}>
			{info.license} License
		</a>
	</div>
</footer>
