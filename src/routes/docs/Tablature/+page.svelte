<script lang="ts">
	import { Tablature } from "$lib";
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
