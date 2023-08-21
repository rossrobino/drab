<!--
@component

### DataTable

Data table to display an array of JS objects. Provides sorting and pagination. Set the `maxRows` prop to enable pagination. Data can be styled conditionally with slot props. 

@props

- `ascending` - current sort order
- `classButton` - `button` class
- `classFooter` - footer class
- `classNoscript` - `noscript` class
- `classPageControls` - class of `div` that wraps the "Previous" and "Next" buttons
- `classTable` - `table` class
- `classTbodyTr` - `tbody tr` class
- `classTbody` - `tbody` class
- `classTdSorted` - currently sorted `td`
- `classTd` - `td` class
- `classThSorted` - currently sorted `th`
- `classTh` - `th` class
- `classTheadTr` - `thead tr` class
- `classThead` - `thead` class
- `classTr` - `tr` class
- `class` 
- `currentPage` - current page, defaults to `1`
- `data` - a list of objects to render in the table
- `idTable` - `table` id
- `id` 
- `keys` - table columns to include in the table, in order
- `maxRows` - maximum number of rows to show on each page, defaults to `0` - no pagination
- `sortBy` - key (column) to sort by, defaults to first key

@slots

| name         | purpose                  | default value                   | slot props                      |
| ------------ | ------------------------ | ------------------------------- | ------------------------------- |
| `next`       | next button contents     | `Next`                          |                                 |
| `pageNumber` | page numbers             | `currentPage` / `numberOfPages` | `currentPage`, `numberOfPages`  |
| `previous`   | previous button contents | `Previous`                      |                                 |
| `td`         | td contents              | `item[key]`                     | `item`, `key`, `sortBy` `value` |
| `th`         | th contents              | `key`                           | `key`, `sortBy`                 |

@example

```svelte
<script lang="ts">
	import { DataTable, type DataTableItem } from "drab";

	const data: DataTableItem[] = [
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
	sortBy="year"
	maxRows={4}
	class="tabular-nums"
	classTh="cursor-pointer capitalize"
	classThSorted="underline"
	classTbodyTr="transition hover:bg-neutral-50"
	classFooter="flex justify-between items-center"
	classButton="btn"
>
	<svelte:fragment slot="th" let:key>
		<span class:uppercase={key === "awd"}>{key}</span>
	</svelte:fragment>
	<svelte:fragment slot="td" let:value>
		{#if typeof value === "boolean"}
			{value ? "Yes" : "No"}
		{:else}
			{value}
		{/if}
	</svelte:fragment>
</DataTable>
```
-->

<script context="module" lang="ts">
	export type DataTableItem = Record<
		string | number,
		string | number | boolean | Date | undefined | null
	>;
</script>

<script lang="ts">
	import { onMount } from "svelte";

	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	/** a list of objects to render in the table */
	export let data: DataTableItem[];

	/** table columns to include in the table, in order */
	export let keys: string[] = [];
	if (!keys.length && data[0]) {
		// no initial value, use the first object instead
		keys = Object.keys(data[0]);
	}

	/** key (column) to sort by, defaults to first key */
	export let sortBy = keys[0];

	/** current sort order */
	export let ascending = true;

	/** `table` class */
	export let classTable = "";

	/** `table` id */
	export let idTable = "";

	/** `thead` class */
	export let classThead = "";

	/** `tbody` class */
	export let classTbody = "";

	/** `tr` class */
	export let classTr = "";

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

	/** footer class */
	export let classFooter = "";

	/** class of `div` that wraps the "Previous" and "Next" buttons */
	export let classPageControls = "";

	/** maximum number of rows to show on each page, defaults to `0` - no pagination */
	export let maxRows = 0;

	/** current page, defaults to `1` */
	export let currentPage = 1;

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	$: numberOfPages = Math.floor(data.length / maxRows) + 1;

	/**
	 * - sorts the data by the specified key
	 *
	 * @param key column to sort by
	 * @param toggleAscending whether or not to toggle ascending (first render off)
	 */
	const sort = (key: string, toggleAscending = true) => {
		if (key === sortBy && toggleAscending) {
			// reverse the sort if already selected
			ascending = !ascending;
		} else {
			// reset to true - start with ascending always
			ascending = true;
		}
		data.sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			if (typeof aVal === "number" && typeof bVal === "number") {
				if (ascending) {
					return aVal - bVal;
				} else {
					return bVal - aVal;
				}
			} else if (typeof aVal === "string" && typeof bVal === "string") {
				const collator = new Intl.Collator();
				if (ascending) {
					return collator.compare(aVal, bVal);
				} else {
					return collator.compare(bVal, aVal);
				}
			} else if (aVal instanceof Date && bVal instanceof Date) {
				if (ascending) {
					return aVal.getTime() - bVal.getTime();
				} else {
					return bVal.getTime() - aVal.getTime();
				}
			} else {
				if (ascending) {
					return aVal === bVal ? 0 : aVal ? -1 : 1;
				} else {
					return aVal === bVal ? 0 : aVal ? 1 : -1;
				}
			}
		});
		data = data; // trigger reactivity
		sortBy = key;
	};

	/**
	 * determines whether the row should appear
	 *
	 * @param i index of the row
	 * @param currentPage passed in for reactivity
	 */
	const showRow = (i: number, currentPage: number) => {
		if (!maxRows) return true;
		const overMin = i >= maxRows * (currentPage - 1);
		const underMax = i < maxRows * currentPage;
		return overMin && underMax;
	};

	sort(sortBy, false);

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<table class={classTable} id={idTable}>
		<thead class={classThead}>
			<tr class="{classTr} {classTheadTr}">
				{#each keys as key}
					<th
						class="{classTh} {sortBy === key ? classThSorted : ''}"
						on:click={() => sort(key)}
					>
						<slot name="th" {key} {sortBy}>{key}</slot>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class={classTbody}>
			{#each data as item, i}
				{#if showRow(i, currentPage)}
					<tr class="{classTr} {classTbodyTr}">
						{#each keys as key}
							<td class="{classTd} {sortBy === key ? classTdSorted : ''}">
								<slot name="td" {item} {key} {sortBy} value={item[key]}>
									{item[key]}
								</slot>
							</td>
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>

	{#if maxRows}
		<div class={classFooter}>
			<slot name="pageNumber" {currentPage} {numberOfPages}>
				<div>{currentPage} / {numberOfPages}</div>
			</slot>
			<div class={classPageControls}>
				<button
					type="button"
					class={classButton}
					disabled={!clientJs || currentPage < 2}
					on:click={() => currentPage--}
				>
					<slot name="previous">Previous</slot>
				</button>
				<button
					type="button"
					class={classButton}
					disabled={!clientJs || currentPage >= numberOfPages}
					on:click={() => currentPage++}
				>
					<slot name="next">Next</slot>
				</button>
			</div>
		</div>

		<noscript><div class={classNoscript}>{messageNoScript}</div></noscript>
	{/if}
</div>
