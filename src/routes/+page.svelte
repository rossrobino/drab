<script lang="ts">
	import "../app.postcss";

	import Chord from "$lib/components/Chord.svelte";
	import ShareButton from "$lib/components/ShareButton.svelte";
	import YouTube from "$lib/components/YouTube.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import FullscreenButton from "$lib/components/FullscreenButton.svelte";

	let fullscreenDiv: HTMLDivElement;
</script>

<main class="prose prose-teal prose-h1:text-2xl prose-h1:sm:text-4xl m-4">
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

	<h3 id="editor">Editor</h3>

	<Editor
		buttonClass="bg-gray-200 px-2"
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

	<FullscreenButton class="mb-4 bg-gray-200 px-4 py-2" />

	<div bind:this={fullscreenDiv} class="bg-gray-800 p-4">
		<div class="mb-2 text-gray-50">Target element fullscreen</div>
		<FullscreenButton
			targetElement={fullscreenDiv}
			class="bg-gray-200 px-4 py-2"
		>
			<span slot="enabled">Exit Element Fullscreen</span>
			<span slot="disabled">Enable Element Fullscreen</span>
		</FullscreenButton>
	</div>

	<h3 id="sharebutton">ShareButton</h3>

	<ShareButton
		class="bg-gray-200 px-4 py-2"
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
