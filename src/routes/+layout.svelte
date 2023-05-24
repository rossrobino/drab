<script lang="ts">
	import "../app.postcss";
	import { dev } from "$app/environment";
	import { inject } from "@vercel/analytics";

	inject({ mode: dev ? "development" : "production" });
</script>

<main
	class="m-4 selection:bg-yellow-300 selection:text-gray-950 sm:m-8 sm:flex md:justify-center"
>
	<div
		class="prose prose-blue prose-h1:text-2xl prose-pre:rounded-none prose-h1:sm:text-4xl"
	>
		<slot />
	</div>
</main>
