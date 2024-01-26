import { Base } from "../index.ts";

/**
 * Wrap a `HTMLTableElement` in the `TableSort` element to have sortable column
 * headers. Set each `th` that you want to sort to the `trigger`. Set the `tbody`
 * element to the `content`.
 *
 * The values of each cell default to the cell's `textContent`. If you would like to
 * provide an alternate value than what appears in the cell to sort by instead,
 * you can set a different value using the `data-value` attribute on the cell.
 *
 * The cells will be sorted as `string` by default. If you want to provide a different
 * datatype `number` or `boolean`, set `data-type="number"` on the corresponding
 * `th`/`trigger` element. The data will be converted to the specified type before sorting.
 */
export class TableSort extends Base {
	constructor() {
		super();
	}

	/**
	 * Removes `data-asc` or `data-desc` from other triggers then sets the correct attribute on the selected trigger.
	 *
	 * @param trigger
	 * @returns true if ascending, false if descending
	 */
	#setAttributes(trigger: HTMLElement) {
		const asc = "data-asc";
		const desc = "data-desc";
		for (const t of this.getTrigger()) {
			if (t !== trigger) {
				t.removeAttribute(asc);
				t.removeAttribute(desc);
			}
		}
		if (trigger.hasAttribute(asc)) {
			trigger.removeAttribute(asc);
			trigger.setAttribute(desc, "");
			return false;
		}
		trigger.removeAttribute(desc);
		trigger.setAttribute(asc, "");
		return true;
	}

	mount() {
		const tbody = this.getContent(HTMLTableSectionElement);
		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(this.event, () => {
				Array.from(tbody.querySelectorAll("tr"))
					.sort(comparer(trigger, this.#setAttributes(trigger)))
					.forEach((tr) => tbody.appendChild(tr));
			});
		}
	}
}

// adapted from: https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/49041392#49041392
const comparer = (th: HTMLElement, ascending: boolean) => {
	// this function is returned and used by `sort`
	const sorter = (a: HTMLTableRowElement, b: HTMLTableRowElement) => {
		// find the column to sort by using the index of the `th`
		const columnIndex = Array.from(th.parentNode?.children ?? []).indexOf(th);

		const compare = (aVal: string, bVal: string) => {
			// default to `string` sorting
			const dataType = (th.dataset.type ?? "string") as
				| "string"
				| "boolean"
				| "number";

			if (dataType === "string") {
				const collator = new Intl.Collator();
				return collator.compare(aVal, bVal);
			} else if (dataType === "boolean") {
				/**
				 * if value is one of these and type is boolean
				 * it should be considered falsy
				 * since actually `Boolean("false") === true`
				 * @param val string pulled from the textContent or attr
				 * @returns a boolean of the provided string
				 */
				const convertToBoolean = (val: string) => {
					const falsy = ["0", "false", "null", "undefined"];
					if (falsy.includes(val)) {
						return false;
					}
					return Boolean(val);
				};
				return convertToBoolean(aVal) === convertToBoolean(bVal)
					? 0
					: convertToBoolean(aVal)
						? -1
						: 1;
			} else {
				// "number"
				return Number(aVal) - Number(bVal);
			}
		};

		return compare(
			getValue(ascending ? a : b, columnIndex),
			getValue(ascending ? b : a, columnIndex),
		);
	};

	return sorter;
};

/**
 * @param tr the row
 * @param i index of the `td` to find
 * @returns a string, the `data-value` attribute, or the `textContent`
 */
const getValue = (tr: HTMLTableRowElement, i: number) => {
	const cell = tr.children[i];
	if (cell instanceof HTMLElement) {
		// first look for `data-value` attribute, then use `textContent`
		return cell.dataset.value ?? cell.textContent ?? "";
	}
	return "";
};
