<script lang="ts">
	import "./docs.css";
	import type { Info } from "$lib/types";

	/** project information */
	export let info: Info;
</script>

<header class="bg-zinc-900 text-zinc-50 p-4 flex justify-center">
	<div
		class="flex flex-col md:flex-row justify-between gap-2 basis-full md:basis-[768px]"
	>
		<h2 class="mt-0"><a href="/" class="no-underline">{info.packageName}</a></h2>
		<ul class="flex items-center list-none mt-0">
			<slot />
		</ul>
	</div>
</header>
