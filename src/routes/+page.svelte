<script lang="ts">
	import "../app.postcss";

	import NavItems from "./NavItems.svelte";
	import Chevron from "../svg/Chevron.svelte";

	import Accordion from "$lib/components/Accordion.svelte";
	import Chord from "$lib/components/Chord.svelte";
	import ContextMenu from "$lib/components/ContextMenu.svelte";
	import CopyButton from "$lib/components/CopyButton.svelte";
	import DataTable from "$lib/components/DataTable.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
	import Popover from "$lib/components/Popover.svelte";
	import ShareButton from "$lib/components/ShareButton.svelte";
	import YouTube from "$lib/components/YouTube.svelte";

	export let data;

	let fullscreenDiv: HTMLDivElement;
</script>

<main class="m-4 lg:flex lg:justify-center">
	<div class="gap-12 lg:flex">
		<nav class="prose prose-teal -my-4 hidden lg:block">
			<ul class="sticky top-0 h-screen list-none overflow-y-auto py-4 pr-6">
				<h1 class="mb-6">
					<a class="font-bold text-gray-950 no-underline" href="/">drab</a>
				</h1>
				<NavItems />
			</ul>
		</nav>
		<div
			class="prose prose-teal mb-16 prose-h3:mb-6 prose-h3:mt-12 prose-h3:border-t prose-h3:pt-8 prose-h1:sm:text-4xl lg:min-w-[65ch]"
		>
			<h1 class="lg:hidden">drab</h1>

			<h2 class="lg:mt-2">An unstyled Svelte component library</h2>

			{@html data.html}

			<ul class="pl-0 lg:hidden"><NavItems /></ul>

			<!-- COMPONENTS -->

			<h3 id="accordion">Accordion</h3>

			<Accordion
				icon={Chevron}
				classDetails="border-b"
				classSummary="hover:underline flex items-center justify-between font-bold py-4 cursor-pointer"
				classSlot="pb-4"
				content={[
					{ summary: "Is it accessible?", slot: "Yes." },
					{
						summary: "Is it styled?",
						slot: "Nope, style with global styles.",
					},
					{
						summary: "Is it animated?",
						slot: "Yes, with the transition prop.",
					},
					{ summary: "Does it work without Javascript?", slot: "Yes." },
				]}
			/>

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

			<div class="flex justify-center rounded border border-dashed p-12">
				<div>Right click here</div>
				<ContextMenu class="transition">
					<div class="card flex w-48 flex-col gap-2">
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

			<div class="tabular-nums">
				<DataTable
					data={[
						{ make: "Honda", model: "CR-V", year: 2011, awd: true },
						{ make: "Volvo", model: "XC-40", year: 2024, awd: true },
						{ make: "Ferrari", model: "458 Italia", year: 2015, awd: false },
						{ make: "Chevrolet", model: "Silverado", year: 2022, awd: true },
						{ make: "Ford", model: "Model A", year: 1931, awd: false },
						{ make: "Subaru", model: "Outback", year: 2021, awd: true },
						{ make: "Ford", model: "Bronco", year: 1970, awd: true },
						{ make: "GMC", model: "Acadia", year: 2008, awd: true },
						{ make: "BMW", model: "X3", year: 2023, awd: true },
					]}
					sortBy="make"
					paginate={4}
					classTh="cursor-pointer uppercase"
					classThSorted="underline"
					classTbodyTr="transition hover:bg-gray-50"
					classFooter="flex justify-between items-center"
					classButton="btn"
				/>
			</div>

			<h3 id="editor">Editor</h3>

			<Editor
				classButton="btn"
				classControls="flex gap-2"
				classTextarea="border w-full h-36 p-2 rounded"
				placeholderTextarea="asterisk: ctrl+i, anchor: ctrl+["
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

			<FullscreenButton class="btn" />

			<div
				bind:this={fullscreenDiv}
				class="mt-4 rounded bg-gray-800 p-4 text-gray-50"
			>
				<div class="mb-2">Target element fullscreen</div>
				<FullscreenButton targetElement={fullscreenDiv} class="btn">
					<span>Enable Element Fullscreen</span>
					<span slot="enabled">Exit Element Fullscreen</span>
				</FullscreenButton>
			</div>

			<h3 id="popover">Popover</h3>

			<div class="flex gap-4">
				<Popover classButton="btn" classPopover="p-2 transition">
					<span slot="button">Hover</span>
					<div class="card flex w-48 flex-col gap-2">
						<div class="font-bold">Bottom</div>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
					</div>
				</Popover>
				<Popover
					classButton="btn"
					classPopover="p-2 transition"
					eventType="click"
					position="right"
				>
					<span slot="button">Click</span>
					<div class="card flex w-48 flex-col gap-2">
						<div class="font-bold">Right</div>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
						<button class="btn">Button</button>
					</div>
				</Popover>
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
