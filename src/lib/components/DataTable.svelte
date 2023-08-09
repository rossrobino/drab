<!--
@component

### DataTable

Data table to display an array of JS objects. Click a column header to sort.

@props

- `ascending` - default sort order
- `columns` - table columns, in order
- `data` - a list of objects to render in the table
- `sortBy` - column to sort by--defaults to first column
- `sortedTdClass` - currently sorted td
- `sortedThClass` - currently sorted th
- `tBodyClass` - tbody class
- `tBodyTrClass` - tbody tr class
- `tHeadClass` - thead class
- `tHeadTrClass` - thead tr class
- `tableClass` - table class
- `tableId` - table id
- `tdClass` - td class
- `thClass` - th class

@example

```svelte
<script>
	import { DataTable } from "@rossrobino/components";
</script>

<DataTable 
	data={[
		{ make: "Honda", model: "CR-V", year: 2011, awd: true },
		{ make: "Volvo", model: "XC-40", year: 2024, awd: true },
		{ make: "Ferrari", model: "458 Italia", year: 2015, awd: false },
		{ make: "Chevrolet", model: "Silverado", year: 2022, awd: true },
		{ make: "Ford", model: "Model A", year: 1931, awd: false },
	]}
	sortBy="year"
/>
```
-->

<script context="module" lang="ts">
	export type DataTableRow<T> = {
		[K in keyof T]: T[K];
	};
</script>

<script lang="ts">
	import { onMount } from "svelte";

	/** a list of objects to render in the table */
	export let data: DataTableRow<any>[];

	/** table columns, in order */
	export let columns: string[] = [];
	if (!columns.length && data[0]) {
		// no initial value, use the first object instead
		columns = Object.keys(data[0]);
	}

	/** column to sort by--defaults to first column */
	export let sortBy = columns[0];

	/** default sort order */
	export let ascending = true;

	/** table class */
	export let tableClass = "";

	/** table id */
	export let tableId = "";

	/** thead class */
	export let tHeadClass = "";

	/** tbody class */
	export let tBodyClass = "";

	/** thead tr class */
	export let tHeadTrClass = "";

	/** tbody tr class */
	export let tBodyTrClass = "";

	/** th class */
	export let thClass = "";

	/** td class */
	export let tdClass = "";

	/** currently sorted th */
	export let sortedThClass = "";

	/** currently sorted td */
	export let sortedTdClass = "";

	/**
	 * - sorts the data the specified column
	 *
	 * @param column column to sort by
	 * @param toggleAscending whether or not to toggle ascending (first render off)
	 */
	const sort = (column: string, toggleAscending = true) => {
		if (column === sortBy && toggleAscending) {
			ascending = !ascending;
		} else {
			ascending = true;
		}
		data.sort((a, b) => {
			const aVal = a[column];
			const bVal = b[column];
			if (typeof aVal === "number") {
				if (ascending) {
					return aVal - bVal;
				} else {
					return bVal - aVal;
				}
			} else if (typeof aVal === "string") {
				const collator = new Intl.Collator();
				if (ascending) {
					return collator.compare(aVal, bVal);
				} else {
					return collator.compare(bVal, aVal);
				}
			} else if (typeof aVal === "boolean") {
				if (ascending) {
					return aVal === bVal ? 0 : aVal ? -1 : 1;
				} else {
					return aVal === bVal ? 0 : aVal ? 1 : -1;
				}
			} else return 0;
		});
		data = data; // trigger reactivity
		sortBy = column;
	};

	onMount(() => {
		sort(sortBy, false);
	});
</script>

<table class={tableClass} id={tableId}>
	<thead class={tHeadClass}>
		<tr class={tHeadTrClass}>
			{#each columns as column}
				<th
					class="{thClass} {sortBy === column ? sortedThClass : ''}"
					on:click={() => sort(column)}
				>
					{column}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class={tBodyClass}>
		{#each data as row}
			<tr class={tBodyTrClass}>
				{#each columns as column}
					<td class="{tdClass} {sortBy === column ? sortedTdClass : ''}">
						{row[column]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
