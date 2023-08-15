<script lang="ts">
	import Sheet from "$lib/components/Sheet.svelte";
	import Bars from "$site/svg/Bars.svelte";
	import X from "$site/svg/X.svelte";
	import "../app.postcss";
	import NavItems from "../site/NavItems.svelte";

	let display = false;
</script>

<main class="m-4 lg:flex lg:justify-center">
	<div class="gap-12 lg:flex">
		<nav class="prose prose-teal -my-4 hidden lg:block">
			<ul class="sticky top-0 h-screen list-none overflow-y-auto py-4 pr-6">
				<li>
					<h2 class="mb-6 mt-0">
						<a class="font-extrabold text-gray-900 no-underline" href="/">
							drab
						</a>
					</h2>
				</li>
				<NavItems />
			</ul>
		</nav>
		<div
			class="prose-h1:text-balance prose prose-teal mb-16 prose-headings:capitalize lg:min-w-[65ch]"
		>
			<nav
				class="sticky top-0 -mx-4 -mt-4 mb-6 flex items-center gap-4 bg-white p-4 lg:hidden"
			>
				<button
					class="btn btn-g"
					title="Components"
					on:click={() => (display = true)}
				>
					<Bars />
				</button>
				<h2 class="my-0 !lowercase">
					<a class="font-extrabold text-gray-900 no-underline" href="/">drab</a>
				</h2>
			</nav>
			<slot />
			<Sheet
				bind:display
				onClickClose={true}
				class="bg-gray-50/80 backdrop-blur"
				classSheet="p-4 shadow bg-white"
				position="left"
			>
				<div class="flex items-center justify-between gap-4">
					<h2 class="my-0">Components</h2>
					<button title="Close" class="btn btn-g"><X /></button>
				</div>
				<ul class="mb-8 w-60 list-none pl-0"><NavItems /></ul>
			</Sheet>
		</div>
	</div>
</main>
