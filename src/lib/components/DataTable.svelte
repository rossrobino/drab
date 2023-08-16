<!--
@component

### DataTable

Data table to display an array of JS objects. Click a column header to sort.

@props

- `ascending` - default sort order
- `classButton` - `button` class
- `classFooter` - `footer` class
- `classNoscript` - `noscript` class
- `classPageControls` - class of `div` that wraps the "Previous" and "Next" buttons
- `classPageNumber` - class of `div` wrapping page numbers
- `classTable` - `table` class
- `classTbodyTr` - `tbody tr` class
- `classTbody` - `tbody` class
- `classTdSorted` - currently sorted `td`
- `classTd` - `td` class
- `classThSorted` - currently sorted `th`
- `classTh` - `th` class
- `classTheadTr` - `thead tr` class
- `classThead` - `thead` class
- `class` 
- `columns` - table columns, in order
- `currentPage` - current page, defaults to `1`
- `data` - a list of objects to render in the table
- `idTable` - `table` id
- `id` 
- `paginate` - number of rows to show on each page, defaults to `0` - no pagination
- `sortBy` - column to sort by--defaults to first column

@slots

| name       | purpose                  | default value |
| ---------- | ------------------------ | ------------- |
| `previous` | previous button contents | `Previous`    |
| `next`     | next button contents     | `Next`        |

@example

```svelte
<script>
	import { DataTable } from "drab";
</script>

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
	class="tabular-nums"
	classTh="cursor-pointer uppercase"
	classThSorted="underline"
	classTbodyTr="transition hover:bg-neutral-50"
	classFooter="flex justify-between items-center"
	classButton="btn"
/>
```
-->

<script context="module" lang="ts">
	export type DataTableRow<T> = {
		[K in keyof T]: T[K];
	};
</script>

<script lang="ts">
	import { messageNoScript } from "$lib/util/messages";
	import { onMount } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

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

	/** `table` class */
	export let classTable = "";

	/** `table` id */
	export let idTable = "";

	/** `thead` class */
	export let classThead = "";

	/** `tbody` class */
	export let classTbody = "";

	/** `thead tr` class */
	export let classTheadTr = "";

	/** `tbody tr` class */
	export let classTbodyTr = "";

	/** `th` class */
	export let classTh = "";

	/** `td` class */
	export let classTd = "";

	/** currently sorted `th` */
	export let classThSorted = "";

	/** currently sorted `td` */
	export let classTdSorted = "";

	/** `button` class */
	export let classButton = "";

	/** `footer` class */
	export let classFooter = "";

	/** class of `div` wrapping page numbers */
	export let classPageNumber = "";

	/** class of `div` that wraps the "Previous" and "Next" buttons */
	export let classPageControls = "";

	/** number of rows to show on each page, defaults to `0` - no pagination */
	export let paginate = 0;

	/** current page, defaults to `1` */
	export let currentPage = 1;

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	$: numberOfPages = Math.floor(data.length / paginate) + 1;

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

	sort(sortBy, false);

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<table class={classTable} id={idTable}>
		<thead class={classThead}>
			<tr class={classTheadTr}>
				{#each columns as column}
					<th
						class="{classTh} {sortBy === column ? classThSorted : ''}"
						on:click={() => sort(column)}
					>
						{column}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class={classTbody}>
			{#each data as row, i}
				{@const showRow =
					i < paginate * currentPage && i >= paginate * (currentPage - 1)}
				{#if paginate ? showRow : true}
					<tr class={classTbodyTr}>
						{#each columns as column}
							<td class="{classTd} {sortBy === column ? classTdSorted : ''}">
								{row[column]}
							</td>
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>

	{#if paginate}
		<div class={classFooter}>
			<div class={classPageNumber}>{currentPage} / {numberOfPages}</div>
			<div class={classPageControls}>
				<button
					class={classButton}
					disabled={!clientJs || currentPage < 2}
					on:click={() => currentPage--}
				>
					<slot name="previous">Previous</slot>
				</button>
				<button
					class={classButton}
					disabled={!clientJs || currentPage >= numberOfPages}
					on:click={() => currentPage++}
				>
					<slot name="next">Next</slot>
				</button>
			</div>
		</div>

		<noscript>
			<div class={classNoscript}>
				{messageNoScript}
			</div>
		</noscript>
	{/if}
</div>
