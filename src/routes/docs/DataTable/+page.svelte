<script lang="ts">
	import DataTable from "$lib/components/DataTable.svelte";

	const data = [
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

<DataTable class="mb-12" {data} />

<DataTable
	{data}
	sortBy="year"
	maxRows={4}
	class="tabular-nums"
	classTh="cursor-pointer capitalize"
	classThSorted="underline"
	classTbodyTr="transition hover:bg-neutral-50"
	classFooter="flex justify-between items-center"
	classButton="btn"
>
	<svelte:fragment slot="th" let:column>
		<span class:uppercase={column === "awd"}>{column}</span>
	</svelte:fragment>
	<svelte:fragment slot="td" let:column let:row>
		{@const item = row[column]}
		{#if typeof item === "boolean"}
			{#if item}
				Yes
			{:else}
				No
			{/if}
		{:else}
			{item}
		{/if}
	</svelte:fragment>
</DataTable>
