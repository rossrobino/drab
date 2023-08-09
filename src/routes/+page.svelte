<script lang="ts">
	import "../app.postcss";

	import NavItems from "./NavItems.svelte";

	import Chord from "$lib/components/Chord.svelte";
	import ContextMenu from "$lib/components/ContextMenu.svelte";
	import CopyButton from "$lib/components/CopyButton.svelte";
	import DataTable from "$lib/components/DataTable.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
	import ShareButton from "$lib/components/ShareButton.svelte";
	import YouTube from "$lib/components/YouTube.svelte";

	let fullscreenDiv: HTMLDivElement;
</script>

<main class="m-4 lg:flex lg:justify-center">
	<div class="lg:flex gap-12">
		<nav class="prose prose-teal hidden lg:block -my-4">
			<ul class="sticky top-0 list-none py-4 pr-6 h-screen overflow-y-auto">
				<h1 class="mb-6">
					<a class="text-gray-950 no-underline font-bold" href="/">drab</a>
				</h1>
				<NavItems />
			</ul>
		</nav>
		<div
			class="prose prose-teal prose-h1:sm:text-4xl prose-h3:pt-8 prose-h3:mb-6 prose-h3:mt-12 prose-h3:border-t lg:min-w-[65ch] mb-16"
		>
			<h1 class="lg:hidden">drab</h1>

			<h2 class="lg:mt-2">An unstyled Svelte component library</h2>

			<ul>
				<li><a href="https://github.com/rossrobino/drab">GitHub</a></li>
				<li>
					<a href="https://www.npmjs.com/package/drab">npm</a>
				</li>
				<li>
					<a href="https://github.com/rossrobino/drab/blob/main/LICENSE.md">
						MIT License
					</a>
				</li>

				<li>
					One dependency -
					<a href="https://svelte.dev">Svelte</a>
				</li>
			</ul>

			<h2>Install</h2>

			<pre>npm create svelte@latest</pre>

			<p>
				Copy and paste the <a
					href="https://github.com/rossrobino/drab/tree/main/src/lib/components"
				>
					components
				</a>
				or install the package.
			</p>

			<pre>npm i -D drab</pre>

			<pre>import &#123; Component &#125; from "drab";</pre>

			<h2>Getting Started</h2>

			<p>
				Components are documented inline. View the
				<a
					href="https://github.com/rossrobino/drab/tree/main/src/lib/components"
				>
					source
				</a>
				or hover over the component in a text editor after importing to see available
				props, slots, and examples.
			</p>

			<p>
				This library aims to provide JavaScript functionality. Anything that can
				be handled by HTML or CSS, such as a label, is not included. Each
				component includes all elements needed for the component.
			</p>

			<p>
				Style the components with global styles, each component exports
				<code>class</code>
				and
				<code>id</code>
				props. If the component has multiple elements, multiple props are available
				for each element.
			</p>
			<p>
				View the
				<a
					href="https://github.com/rossrobino/drab/blob/main/src/routes/%2Bpage.svelte"
				>
					source
				</a>
				for this page to see the
				<a href="https://tailwindcss.com/">TailwindCSS</a>
				styles used.
			</p>

			<h2>Components</h2>

			<ul class="pl-0 lg:hidden"><NavItems /></ul>

			<h3 id="chord">Chord</h3>

			<Chord
				class="text-gray-950"
				name="D"
				notes={[
					{
						finger: 0,
						string: 4,
						fret: 0,
					},
					{
						finger: 1,
						string: 3,
						fret: 2,
					},
					{
						finger: 2,
						string: 1,
						fret: 2,
					},
					{
						finger: 3,
						string: 2,
						fret: 3,
					},
				]}
			/>

			<h3 id="contextmenu">Context Menu</h3>

			<div class="p-12 border border-dashed flex justify-center rounded">
				<div>Right click here</div>
				<ContextMenu class="rounded shadow p-2 bg-white">
					<div class="flex flex-col gap-2 not-prose w-48">
						<div class="font-bold">Context Menu</div>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
					</div>
				</ContextMenu>
			</div>

			<h3 id="copybutton">CopyButton</h3>

			<CopyButton class="btn" text="Text to copy" />

			<h3 id="datatable">DataTable</h3>

			<DataTable
				data={[
					{ make: "Honda", model: "CR-V", year: 2011, awd: true },
					{ make: "Volvo", model: "XC-40", year: 2024, awd: true },
					{ make: "Ferrari", model: "458 Italia", year: 2015, awd: false },
					{ make: "Chevrolet", model: "Silverado", year: 2022, awd: true },
					{ make: "Ford", model: "Model A", year: 1931, awd: false },
				]}
				sortBy="year"
				tableClass="tabular-nums"
				thClass="cursor-pointer uppercase"
				sortedThClass="underline"
				tBodyTrClass="transition hover:bg-gray-50"
			/>

			<h3 id="editor">Editor</h3>

			<Editor
				buttonClass="btn"
				controlsClass="flex gap-2"
				textAreaClass="border w-full h-36 p-2 rounded"
				textAreaPlaceholder="asterisk: ctrl+i, anchor: ctrl+["
				contentElements={[
					{
						name: "Bullet",
						text: "- ",
						display: "block",
						icon: "Bullet",
					},
					{
						name: "Asterisk",
						text: "*",
						display: "wrap",
						icon: "Asterisk",
						key: "i",
						class: "italic",
					},
					{
						name: "Anchor",
						text: "[text](href)",
						display: "inline",
						icon: "Anchor",
						key: "[",
					},
				]}
			/>

			<h3 id="fullscreenbutton">FullscreenButton</h3>

			<FullscreenButton class="mb-4 btn" />

			<div bind:this={fullscreenDiv} class="bg-gray-800 p-4 rounded">
				<div class="mb-2 text-gray-50">Target element fullscreen</div>
				<FullscreenButton targetElement={fullscreenDiv} class="btn">
					<span slot="enabled">Exit Element Fullscreen</span>
					<span slot="disabled">Enable Element Fullscreen</span>
				</FullscreenButton>
			</div>

			<h3 id="sharebutton">ShareButton</h3>

			<ShareButton
				class="btn"
				text="Check out this page: "
				title="drab"
				url="https://drab.robino.dev"
			/>

			<h3 id="youtube">YouTube</h3>

			<YouTube
				class="aspect-video w-full rounded"
				title="Renegade - Kevin Olusola"
				uid="gouiY85kD2o"
			/>
		</div>
	</div>
</main>

<style lang="postcss">
	:global(.btn) {
		@apply rounded bg-teal-700 px-3 py-1 text-white transition hover:bg-teal-800 active:scale-95;
	}
</style>
