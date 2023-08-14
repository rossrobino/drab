<script lang="ts">
	import "../app.postcss";
	import NavItems from "../site/NavItems.svelte";
</script>

<main class="m-4 lg:flex lg:justify-center">
	<div class="gap-12 lg:flex">
		<nav class="prose prose-teal -my-4 hidden lg:block">
			<ul class="sticky top-0 h-screen list-none overflow-y-auto py-4 pr-6">
				<h2 class="mb-6 mt-0 text-4xl">
					<a class="font-extrabold text-gray-900 no-underline" href="/">drab</a>
				</h2>
				<NavItems />
			</ul>
		</nav>
		<div
			class="prose-h1:text-balance prose prose-teal mb-16 prose-headings:capitalize lg:min-w-[65ch]"
		>
			<h2 class="mb-6 mt-2 text-4xl !lowercase lg:hidden">
				<a class="font-extrabold text-gray-900 no-underline" href="/">drab</a>
			</h2>
			<ul class="mb-8 list-none pl-0 lg:hidden"><NavItems /></ul>
			<slot />
		</div>
	</div>
</main>
