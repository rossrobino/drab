<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { DataTable } from "$lib";

	let currentPage = 0;

	const data: ComponentProps<DataTable>["data"] = [
		{ make: "Honda", model: "CR-V", year: 2011, awd: true },
		{ make: "Volvo", model: "XC-40", year: 2024, awd: true },
		{ make: "Ferrari", model: "458 Italia", year: 2015, awd: false },
		{ make: "Chevrolet", model: "Silverado", year: 2022, awd: true },
		{ make: "Ford", model: "Model A", year: 1931, awd: false },
		{ make: "Subaru", model: "Outback", year: 2021, awd: true },
		{ make: "Ford", model: "Bronco", year: 1970, awd: true },
		{ make: "GMC", model: "Acadia", year: 2008, awd: true },
		{ make: "BMW", model: "X3", year: 2023, awd: true },
	];
</script>

<DataTable {data} class="mb-12" />

<DataTable
	{data}
	bind:currentPage
	sortBy="year"
	maxRows={4}
	class="tabular-nums"
	classTh="cursor-pointer capitalize"
	classTbodyTr="transition hover:bg-muted"
>
	<svelte:fragment slot="th" let:key let:sortBy>
		<span class:uppercase={key === "awd"} class:underline={key === sortBy}>
			{key}
		</span>
	</svelte:fragment>
	<svelte:fragment slot="td" let:value>
		{#if typeof value === "boolean"}
			{value ? "Yes" : "No"}
		{:else}
			{value}
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="controls" let:maxRows let:numberOfPages>
		{#if maxRows}
			<div class="flex items-center justify-between gap-4">
				<div class="min-w-fit">{currentPage + 1} / {numberOfPages}</div>
				<div class="flex gap-2">
					<button
						type="button"
						class="button button-primary"
						disabled={currentPage < 1}
						on:click={() => currentPage--}
					>
						Previous
					</button>
					<button
						type="button"
						class="button button-primary"
						disabled={currentPage >= numberOfPages - 1}
						on:click={() => currentPage++}
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	</svelte:fragment>
</DataTable>
