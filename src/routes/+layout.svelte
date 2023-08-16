<script lang="ts">
	import "../app.postcss";

	import { dev } from "$app/environment";

	import Sheet from "$lib/components/Sheet.svelte";
	import NavItems from "$site/components/NavItems.svelte";

	import Bars from "$site/svg/Bars.svelte";
	import X from "$site/svg/X.svelte";
	import Breakpoint from "$lib/components/Breakpoint.svelte";

	let display = false;
</script>

{#if dev}
	<Breakpoint
		class="fixed bottom-4 right-4 rounded border bg-white px-2 py-1 font-mono tabular-nums shadow"
	/>
{/if}

<main
	class="prose-h1:text-balance prose prose-neutral m-4 max-w-none selection:bg-neutral-400/30 prose-headings:capitalize prose-a:underline-offset-2 hover:prose-a:decoration-dotted lg:flex lg:justify-center"
>
	<div class="gap-12 lg:flex">
		<nav class="-my-4 hidden lg:block">
			<ul
				class="sticky top-0 my-0 h-screen list-none overflow-y-auto px-0 py-4"
			>
				<li>
					<h2 class="mb-6 mt-0 !lowercase">
						<a class="font-extrabold no-underline" href="/">drab</a>
					</h2>
				</li>
				<NavItems />
			</ul>
		</nav>
		<div class="mb-16 max-w-[80ch] lg:w-[80ch]">
			<nav
				class="sticky top-0 -mx-4 -mt-4 mb-6 flex items-center gap-4 bg-neutral-50 p-4 lg:hidden"
			>
				<button
					class="btn btn-s"
					title="Components"
					on:click={() => (display = true)}
				>
					<Bars />
				</button>
				<h2 class="my-0 !lowercase">
					<a class="font-extrabold no-underline" href="/">drab</a>
				</h2>
			</nav>
			<slot />
			<Sheet
				bind:display
				onClickClose={true}
				class="bg-neutral-50/80 backdrop-blur"
				classSheet="p-4 shadow bg-white overflow-y-auto"
				side="left"
			>
				<div class="flex items-center justify-between gap-4">
					<h2 class="my-0">Components</h2>
					<button title="Close" class="btn btn-s"><X /></button>
				</div>
				<ul class="mb-8 w-60 list-none pl-0">
					<NavItems />
				</ul>
			</Sheet>
		</div>
	</div>
</main>
