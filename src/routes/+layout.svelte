<script lang="ts">
	import "../app.postcss";

	import { dev } from "$app/environment";

	import SkipLink from "$site/components/SkipLink.svelte";
	import NavItems from "$site/components/NavItems.svelte";
	import Sheet from "$lib/components/Sheet.svelte";

	import Bars from "$site/svg/Bars.svelte";
	import X from "$site/svg/X.svelte";
	import Breakpoint from "$lib/components/Breakpoint.svelte";

	let displaySheet = false;

	const closeSheet = () => {
		displaySheet = false;
	};
</script>

{#if dev}
	<Breakpoint
		class="fixed bottom-4 right-4 rounded border bg-background px-3 py-2 font-mono text-sm tabular-nums text-foreground shadow"
	/>
{/if}

<SkipLink />

<div
	class="prose-h1:text-balance prose prose-neutral max-w-none font-serif text-foreground prose-a:link dark:prose-invert selection:bg-foreground selection:text-background prose-headings:font-antique prose-h1:capitalize prose-h2:capitalize prose-h3:capitalize hover:prose-a:decoration-dotted prose-pre:-mx-6 prose-pre:rounded-none prose-pre:px-6 sm:prose-pre:mx-0 sm:prose-pre:rounded-md sm:prose-pre:px-4 lg:flex lg:justify-center"
>
	<div class="gap-8 lg:flex">
		<header class="sticky top-0 z-10">
			<nav class="sticky top-0 hidden lg:block">
				<ul class="my-0 h-screen list-none overflow-y-auto p-6">
					<li class="pl-0">
						<h2 class="mb-6 mt-0">
							<a class="font-extrabold lowercase !no-underline" href="/">
								drab
							</a>
						</h2>
					</li>
					<NavItems />
				</ul>
			</nav>
			<nav
				class="mb-6 flex items-center gap-4 bg-background/75 p-6 backdrop-blur-lg lg:hidden lg:w-[65ch]"
			>
				<button
					class="button button-ghost button-icon"
					title="Components"
					on:click={() => (displaySheet = true)}
				>
					<Bars />
				</button>
				<h2 class="my-0">
					<a class="font-extrabold lowercase !no-underline" href="/">drab</a>
				</h2>
			</nav>
		</header>
		<main id="main" class="m-6 mb-16 max-w-[65ch] lg:w-[65ch]">
			<slot />
			<Sheet
				bind:display={displaySheet}
				class="z-40 backdrop-blur"
				classSheet="card rounded-none border-none overflow-y-auto"
				maxSize={300}
			>
				<div class="flex items-center justify-between gap-4">
					<h2 class="my-0">
						<a
							on:click={closeSheet}
							class="font-extrabold lowercase !no-underline"
							href="/"
						>
							drab
						</a>
					</h2>
					<button
						title="Close"
						on:click={closeSheet}
						class="button button-ghost button-icon"
					>
						<X />
					</button>
				</div>
				<ul class="mb-8 w-60 list-none pl-0">
					<NavItems linkClick={closeSheet} />
				</ul>
			</Sheet>
		</main>
	</div>
</div>
