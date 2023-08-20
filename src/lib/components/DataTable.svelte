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
- `maxRows` - maximum number of rows to show on each page, defaults to `0` - no pagination
- `sortBy` - column to sort by, defaults to first column
- `transition` - fades the rows in, set to `false` to disable

@slots

| name         | purpose                  | default value                    | slot props                     |
| ------------ | ------------------------ | -------------------------------- | ------------------------------ |
| `next`       | next button contents     | `Next`                           | `currentPage`                  |
| `pageNumber` | page numbers             |  `currentPage` / `numberOfPages` | `currentPage`, `numberOfPages` |
| `previous`   | previous button contents | `Previous`                       | `currentPage`                  |
| `td`         | td contents              | `Previous`                       | `column`, `row`                |
| `th`         | th contents              | `Previous`                       | `column`                       |

@example

```svelte
<script lang="ts">
	import { DataTable } from "drab";

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
```
-->

<script context="module" lang="ts">
	export type DataTableRow<T> = {
		[K in keyof T]: T[K];
	};
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { fade, type FadeParams } from "svelte/transition";

	import { duration } from "$lib/util/transition";
	import { prefersReducedMotion } from "$lib/util/accessibility";
	import { messageNoScript } from "$lib/util/messages";

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

	/** column to sort by, defaults to first column */
	export let sortBy = columns[0];

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

	/** class of `div` wrapping page numbers */
	export let classPageNumber = "";

	/** class of `div` that wraps the "Previous" and "Next" buttons */
	export let classPageControls = "";

	/** maximum number of rows to show on each page, defaults to `0` - no pagination */
	export let maxRows = 0;

	/** current page, defaults to `1` */
	export let currentPage = 1;

	/** fades the rows in, set to `false` to disable */
	export let transition: FadeParams | false = { duration };

	/** `noscript` class */
	export let classNoscript = "";

	/** set to `true` on the client */
	let clientJs = false;

	$: numberOfPages = Math.floor(data.length / maxRows) + 1;

	/**
	 * - sorts the data the specified column
	 *
	 * @param column column to sort by
	 * @param toggleAscending whether or not to toggle ascending (first render off)
	 */
	const sort = (column: string, toggleAscending = true) => {
		if (column === sortBy && toggleAscending) {
			// reverse the sort if already selected
			ascending = !ascending;
		} else {
			// reset to true - start with ascending always
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

	onMount(() => {
		if (prefersReducedMotion()) {
			if (transition) transition.duration = 0;
		}
		clientJs = true;
	});
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
						<slot name="th" {column}>{column}</slot>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class={classTbody}>
			{#each data as row, i}
				{#if showRow(i, currentPage)}
					<tr
						in:fade={transition ? transition : { duration: 0 }}
						class={classTbodyTr}
					>
						{#each columns as column}
							<td class="{classTd} {sortBy === column ? classTdSorted : ''}">
								<slot name="td" {row} {column}>{row[column]}</slot>
							</td>
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>

	{#if maxRows}
		<div class={classFooter}>
			<div class={classPageNumber}>
				<slot name="pageNumber" {currentPage} {numberOfPages}>
					{currentPage} / {numberOfPages}
				</slot>
			</div>
			<div class={classPageControls}>
				<button
					type="button"
					class={classButton}
					disabled={!clientJs || currentPage < 2}
					on:click={() => currentPage--}
				>
					<slot name="previous" {currentPage}>Previous</slot>
				</button>
				<button
					type="button"
					class={classButton}
					disabled={!clientJs || currentPage >= numberOfPages}
					on:click={() => currentPage++}
				>
					<slot name="next" {currentPage}>Next</slot>
				</button>
			</div>
		</div>

		<noscript><div class={classNoscript}>{messageNoScript}</div></noscript>
	{/if}
</div>
