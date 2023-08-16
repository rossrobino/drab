<!--
@component

### Chord

Generates a guitar chord `svg`.

@props

- `class` 
- `id` 
- `name` - name of chord
- `notes` - list of the positioning of the notes required for the chord
- `size` - total size of chord square
- `strings` - total number of strings for the instrument

@example

```svelte
<script>
	import { Chord } from "drab";
</script>

<Chord
	class="text-neutral-950"
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
```
-->

<script lang="ts" context="module">
	export interface ChordNote {
		/** recommended finger to use */
		finger: number | string;

		/** string number */
		string: number;

		/** fret number */
		fret: number;
	}
</script>

<script lang="ts">
	let className = "";
	export { className as class };

	export let id = "";

	/** total number of strings for the instrument */
	export let strings = 6;

	/** name of chord */
	export let name = "";

	/** total size of chord square */
	export let size = 200;

	/** size of inner box */
	const boxSize = size * 0.61;

	/** offset the inner box */
	const offset = (size - boxSize) / 2;

	/** line width */
	const strokeWidth = size / 60;

	/** list of strings to calculate positioning */
	const stringList = Array.from(Array(strings).keys());

	/** list of the positioning of the notes required for the chord */
	export let notes: ChordNote[] = [];

	/** deep copy of notes to edit -- necessary when high frets are used */
	let notesList = structuredClone(notes);

	/** used to determine if unused need to be added */
	const usedStrings = notesList.map((note) => note.string);

	// add missing missing strings
	for (let i = 1; i < strings + 1; i++) {
		if (!usedStrings.includes(i)) {
			notesList.push({
				finger: "X",
				string: i,
				fret: 0,
			});
		}
	}

	/** map of just the frets required for the chord */
	const frets = notesList.map((note) => note.fret).filter((fret) => fret !== 0); // filter out open strings

	// in case of open notes only
	if (!frets.length) frets.push(0);

	/** highest fret required for the chord */
	const highFret = Math.max(...frets);

	/** lowest fret required for the chord */
	const lowFret = Math.min(...frets);

	/** number of frets shown on the chart */
	let fretRange = highFret - lowFret + 1;
	if (fretRange < 5) fretRange = 5; // minimum = 5

	/** first (upper most) fret on the chord chart */
	let firstFret = lowFret;

	if (firstFret < 4 && highFret < 5) {
		firstFret = 1; // default to 1
		if (lowFret !== 0) fretRange += lowFret - 1;
		if (lowFret === 2 && highFret < 5) fretRange -= 1;
		if (lowFret === 3 && highFret < 5) fretRange -= 2;
	} else {
		notesList.forEach((note) => {
			if (note.fret !== 0) {
				note.fret = note.fret - firstFret + 1;
			}
		});
	}

	/** how large each note circle is */
	const circleRadius = boxSize / fretRange / 2.3;

	/**
	 * - calculates X position based on the string number
	 *
	 * @param string - string number
	 */
	const stringX = (string: number) => {
		return (boxSize / (strings - 1)) * string + offset;
	};

	/**
	 * - calculates Y position based on the fret number
	 *
	 * @param fret - fret number
	 */
	const fretY = (fret: number) => {
		return (boxSize / fretRange) * fret + offset;
	};

	/**
	 * - calculates X position based on the string number
	 *
	 * @param string - string number
	 */
	const noteX = (string: number) => {
		return boxSize + offset - (boxSize / (strings - 1)) * (string - 1);
	};

	/**
	 * - calculates Y position based on the fret number
	 *
	 * @param fret - fret number
	 */
	const noteY = (fret: number) => {
		return (boxSize / fretRange) * fret + offset / 2 - boxSize / fretRange / 2;
	};
</script>

{#if notes.length}
	<svg
		width={size}
		height={size}
		stroke="currentColor"
		fill="currentColor"
		class={className}
		{id}
	>
		<title>{name}</title>

		<!-- BACKGROUND -->
		<rect
			width={boxSize}
			height={boxSize}
			fill="transparent"
			x={offset}
			y={offset / 2}
			stroke-width={strokeWidth}
		/>
		<line
			x1={offset - strokeWidth / 2}
			y1={offset / 2 - strokeWidth / 2}
			x2={boxSize + offset + strokeWidth / 2}
			y2={offset / 2 - strokeWidth / 2}
			stroke-width={strokeWidth * 2}
		/>

		<!-- FRETS -->
		{#each Array.from(Array(fretRange).keys()) as fret}
			<line
				x1={offset}
				y1={fretY(fret) - offset / 2}
				x2={boxSize + offset}
				y2={fretY(fret) - offset / 2}
				stroke-width={strokeWidth}
				opacity="0.2"
			/>
		{/each}

		<!-- STRINGS -->
		{#each stringList as string}
			<line
				x1={stringX(string)}
				y1={offset / 2}
				x2={stringX(string)}
				y2={boxSize + offset / 2}
				stroke-width={strokeWidth}
			/>
		{/each}

		<!-- NOTES -->
		{#each notesList as note}
			{#if note.fret !== 0}
				<circle
					cx={noteX(note.string)}
					cy={noteY(note.fret)}
					r={circleRadius}
				/>
			{/if}
			{#if note.finger !== 0}
				<!-- RECOMMENDED FINGER -->
				<text
					x={noteX(note.string) - size / 50}
					y={note.fret === 0
						? offset / 2 - strokeWidth * 2.4
						: size - offset * 1.1}
					color="currentColor"
					fill="currentColor"
					font-size={size / 13}
				>
					{note.finger}
				</text>
			{/if}
		{/each}

		<!-- CHORD NAME -->
		<text
			x={offset}
			y={size - offset / 2.5}
			font-size={boxSize / 6}
			font-weight="600"
		>
			{name}
		</text>

		<!-- STARTING FRET -->
		{#if firstFret > 1}
			<text
				x={size - offset / 1.8}
				y={offset / 2 + boxSize / 7}
				font-size={size / 13}
			>
				{firstFret}f
			</text>
		{/if}
	</svg>
{/if}
