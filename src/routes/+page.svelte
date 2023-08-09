<script lang="ts">
	import "../app.postcss";

	import Chord from "$lib/components/Chord.svelte";
	import CopyButton from "$lib/components/CopyButton.svelte";
	import DataTable from "$lib/components/DataTable.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";
	import ShareButton from "$lib/components/ShareButton.svelte";
	import YouTube from "$lib/components/YouTube.svelte";

	let fullscreenDiv: HTMLDivElement;
</script>

<main
	class="prose prose-teal prose-h1:text-2xl prose-h1:sm:text-4xl prose-h3:pt-8 prose-h3:mb-6 prose-h3:mt-12 prose-h3:border-t m-4"
>
	<h1>@rossrobino/components</h1>

	<ul>
		<li><a href="https://github.com/rossrobino/components">GitHub</a></li>
		<li>
			<a href="https://www.npmjs.com/package/@rossrobino/components">npm</a>
		</li>
		<li>
			<a href="https://github.com/rossrobino/components/blob/main/LICENSE.md">
				MIT License
			</a>
		</li>
	</ul>

	<h2>Components</h2>

	<ul>
		<li><a href="#chord">Chord</a></li>
		<li><a href="#copybutton">CopyButton</a></li>
		<li><a href="#datatable">DataTable</a></li>
		<li><a href="#editor">Editor</a></li>
		<li><a href="#fullscreenbutton">FullscreenButton</a></li>
		<li><a href="#sharebutton">ShareButton</a></li>
		<li><a href="#youtube">YouTube</a></li>
	</ul>

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
		textAreaClass="border w-full h-36 p-2"
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

	<div bind:this={fullscreenDiv} class="bg-gray-800 p-4">
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
		title="@rossrobino/components"
		url="https://components.robino.dev"
	/>

	<h3 id="youtube">YouTube</h3>

	<YouTube
		class="aspect-video w-full"
		title="Renegade - Kevin Olusola"
		uid="gouiY85kD2o"
	/>
</main>

<style lang="postcss">
	:global(.btn) {
		@apply bg-gray-200 px-4 py-2;
	}
</style>
