<!--
@component

### Tablature

A complementary component to the `FrettedChord` for displaying a measure of tablature for a fretted instrument like guitar or ukulele. Created with HTML elements so it is customizable and responsive to the size of the container.

@props

- `beats` - number of beats in the measure, defaults to `4`
- `class` 
- `id` 
- `notes` - an array of notes
- `repeatEnd` - puts a repeat at the end of the measure
- `repeatStart` - puts a repeat at the start of the measure
- `strings` - number of strings on the instrument, defaults to `6`

@example

```svelte
<script lang="ts">
	import { Tablature } from "drab";
	import type { ComponentProps } from "svelte";

	const notes: ComponentProps<Tablature>["notes"] = [
		{
			fret: 0,
			beat: 1,
			string: 1,
		},
		{
			fret: 1,
			beat: 2,
			string: 2,
		},
		{
			fret: "X",
			beat: 2,
			string: 3,
		},
		{
			fret: 2,
			beat: 3,
			string: 4,
			mod: "/3p2",
		},
		{
			fret: 7,
			beat: 4,
			string: 3,
		},
	];
</script>

<div class="font-mono">
	<div class="mb-8 h-24 text-sm">
		<Tablature {notes} repeatStart />
	</div>
	<div class="h-16 text-xs">
		<Tablature {notes} strings={4} repeatEnd />
	</div>
</div>
```
-->

<script lang="ts">
	let className = "";
	export { className as class };

	export let id = "";

	/** number of strings on the instrument, defaults to `6` */
	export let strings = 6;

	/** number of beats in the measure, defaults to `4` */
	export let beats = 4;

	/** puts a repeat at the start of the measure */
	export let repeatStart = false;

	/** puts a repeat at the end of the measure */
	export let repeatEnd = false;

	interface Note {
		/** string number */
		string: number;

		/** fret number */
		fret: number | string;

		/** beat number */
		beat: number;

		/** custom modifier - ex: "/3p2" signifies a slide to 3 and pull off to 2 */
		mod?: string;
	}

	/** an array of notes */
	export let notes: Note[] = [];

	/** repeat dot size as a percentage of the height */
	const dotSize = 5;

	/** x offset for the repeat dots */
	const dotXOffset = 9;

	/**
	 * calculates the top position based on the number
	 * @param stringNumber
	 */
	const yOffset = (stringNumber: number) => {
		return (100 / strings) * stringNumber + 100 / strings / 2;
	};

	/**
	 * calculates the left position based on the beat
	 * @param beat
	 */
	const xOffset = (beat: number) => {
		return (100 / beats) * beat - 100 / beats / 2;
	};

	/**
	 * calculates the y offset for the dots, makes it smaller
	 * if there are less strings
	 */
	const dotYOffset = () => {
		const stringPosition = strings < 5 ? 0.5 : 1.5;
		return yOffset(stringPosition) - dotSize / 2;
	};
</script>

<div
	class="measure {className}"
	{id}
	style:--top-offset="{yOffset(0)}%"
	style:--dot-size="{dotSize}%"
>
	{#each Array.from({ length: strings }, (v, k) => k) as string}
		<div class="string" style:top="{yOffset(string)}%"></div>
	{/each}
	{#each notes as note}
		<div
			class="note"
			style:top="{yOffset(note.string - 1)}%"
			style:left="{xOffset(note.beat)}%"
		>
			<div style:display="flex">
				<span>{note.fret}</span>
				{#if note.mod}
					<span>{note.mod}</span>
				{/if}
			</div>
		</div>
	{/each}
	<div class="bar" style:left="0" style:width={repeatStart ? "3px" : ""}></div>
	<div class="bar" style:right="0" style:width={repeatEnd ? "3px" : ""}></div>
	{#if repeatStart}
		<div class="bar" style:left="5px"></div>
		<div
			class="dot"
			style:top="{dotYOffset()}%"
			style:left="{dotXOffset}px"
		></div>
		<div
			class="dot"
			style:bottom="{dotYOffset()}%"
			style:left="{dotXOffset}px"
		></div>
	{/if}
	{#if repeatEnd}
		<div class="bar" style:right="5px"></div>
		<div
			class="dot"
			style:top="{dotYOffset()}%"
			style:right="{dotXOffset}px"
		></div>
		<div
			class="dot"
			style:bottom="{dotYOffset()}%"
			style:right="{dotXOffset}px"
		></div>
	{/if}
</div>

<style>
	.measure {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.note {
		position: absolute;
		line-height: 0;
		margin-left: -0.5ch;
	}
	.string {
		position: absolute;
		opacity: 40%;
		width: 100%;
		border-top: 1px solid currentColor;
	}
	.bar {
		position: absolute;
		background-color: currentColor;
		width: 1.2px;
		top: var(--top-offset);
		bottom: calc(var(--top-offset) - 0.8px);
	}
	.dot {
		position: absolute;
		height: var(--dot-size);
		aspect-ratio: 1;
		background-color: currentColor;
		border-radius: 999px;
	}
</style>
