<script lang="ts">
	import "./docs.css";
	import type { Info } from "$lib/types/types";

	/** project information */
	export let info: Info;
</script>

<header class="flex justify-center bg-zinc-900 p-4 text-zinc-50">
	<div class="flex basis-full flex-col justify-between gap-2 md:basis-[768px] md:flex-row">
		<h2 class="mt-0"><a href="/" class="no-underline">{info.packageName}</a></h2>
		<ul class="mt-0 flex list-none items-center">
			<slot />
		</ul>
	</div>
</header>
