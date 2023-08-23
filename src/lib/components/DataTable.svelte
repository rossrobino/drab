<!--
@component

### DataTable

Data table to display an array of objects. Works with zero configuration, just pass an array of objects into the `data` prop.

- Set the `maxRows` prop to enable pagination, bind to `currentPage` to navigate (see second example below)
- Provides sorting for `number`, `string`, `boolean`, and `Date`
- Strings are sorted using `Intl.Collator`
- Style or modify the rendering of data with slot props
- `numberOfPages` is calculated and sent back through the `controls` slot

@props

- `ascending` - current sort order
- `classTbodyTr` - `tbody tr` class
- `classTbody` - `tbody` class
- `classTd` - `td` class
- `classTh` - `th` class
- `classTheadTr` - `thead tr` class
- `classThead` - `thead` class
- `classTr` - `tr` class
- `class` 
- `currentPage` - current page index, defaults to `0`
- `data` - an array of items to render in the table
- `id` 
- `keys` - table columns to include in the table, in order. Defaults to first item's keys
- `maxRows` - maximum number of rows to show on each page, defaults to `0` - no pagination
- `sortBy` - key (column) to sort by, defaults to first key

@slots

| name       | purpose                                                          | default value | slot props                      |
| ---------- | ---------------------------------------------------------------- | ------------- | ------------------------------- |
| `controls` | helper that passes back `maxRows` and calculated `numberOfPages` | empty         | `maxRows`, `numberOfPages`      |
| `td`       | td contents                                                      | `value`       | `item`, `key`, `sortBy` `value` |
| `th`       | th contents                                                      | `key`         | `key`, `sortBy`                 |

@example

```svelte
<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { DataTable } from "drab";

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
	classTbodyTr="transition hover:bg-neutral-50"
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
						class="btn"
						disabled={currentPage < 1}
						on:click={() => currentPage--}
					>
						Previous
					</button>
					<button
						type="button"
						class="btn"
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
```
-->

<script lang="ts">
	let className = "";
	export { className as class };

	export let id = "";

	type DataTableItem = Record<
		string | number,
		string | number | boolean | Date | undefined | null
	>;

	/** an array of items to render in the table */
	export let data: DataTableItem[];

	/** table columns to include in the table, in order. Defaults to first item's keys */
	export let keys: string[] = Object.keys(data[0]);

	/** key (column) to sort by, defaults to first key */
	export let sortBy = keys[0];

	/** current sort order */
	export let ascending = true;

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

	/** maximum number of rows to show on each page, defaults to `0` - no pagination */
	export let maxRows = 0;

	/** current page index, defaults to `0` */
	export let currentPage = 0;

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

		const collator = new Intl.Collator();

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
		const overMin = i >= maxRows * currentPage;
		const underMax = i < maxRows * (currentPage + 1);
		return overMin && underMax;
	};

	sort(sortBy, false);
</script>

<table class={className} {id}>
	<thead class={classThead}>
		<tr class="{classTr} {classTheadTr}">
			{#each keys as key}
				<th class={classTh} on:click={() => sort(key)}>
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
						<td class={classTd}>
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

<slot name="controls" {maxRows} {numberOfPages} />
