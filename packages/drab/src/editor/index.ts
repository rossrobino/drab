import { Base, type BaseAttributes } from "../base/index.js";

export type EditorAttributes = BaseAttributes;

export type EditorTriggerAttributes = {
	"data-value": string;
	"data-key": string;
	"data-type": "block" | "wrap" | "inline";
};

/**
 * A piece of content to insert into the `textarea`.
 */
export type ContentElement = {
	/** How to insert the content. */
	type: "block" | "inline" | "wrap";

	/** The value to insert. */
	value: string;

	/** An optional keyboard shortcut. */
	key?: string;
};

/**
 * Enhances the `textarea` element with controls to add content and keyboard shortcuts. Compared to other WYSIWYG editors, the `text` value is just a `string`, so you can easily store it in a database or manipulate it without learning a separate API.
 *
 * `data-value`
 *
 * Set the value of the text to be inserted using the `data-value` attribute on the `trigger`.
 *
 * `data-type`
 *
 * Set the `data-type` attribute of the `trigger` to specify how the content should be inserted into the `textarea`.
 *
 * - `block` will be inserted at the beginning of the selected line.
 * - `wrap` will be inserted before and after the current selection.
 * - `inline` will be inserted at the current selection.
 *
 * `data-key`
 *
 * Add a `ctrl`/`meta` keyboard shortcut for the content based on the `data-key` attribute.
 *
 * Other features:
 *
 * - Automatically adds closing characters for `keyPairs`. For example, when typing `(`, `)` will be inserted and typed over when reached. All content with `data-type="wrap"` is also added to `keyPairs`.
 * - Highlights the first word of the text inserted if it contains letters.
 * - Automatically increments/decrements ordered lists.
 * - Adds the starting character to the next line for `block` content.
 * - On double click, highlight is corrected to only highlight the current word without space around it.
 * - `tab` key will indent and not change focus if the selection is within a code block (three backticks).
 * - When text is highlighted and a `wrap` character `keyPair` is typed, the highlighted text will be wrapped with the character instead of removing it. For example, if a word is highlighted and the `"` character is typed, the work will be surrounded by `"`s.
 */
export class Editor extends Base {
	/** Array of `keyPair` characters that have been opened. */
	#openChars: string[] = [];

	#resetKeys = new Set(["ArrowUp", "ArrowDown", "Delete"]);

	/** The characters that will be automatically closed when typed. */
	keyPairs: { [key: string]: string } = {
		"(": ")",
		"{": "}",
		"[": "]",
		"<": ">",
		'"': '"',
		"`": "`",
	};

	constructor() {
		super();

		// add any `type: "wrap"` values from `contentElements` to `keyPairs`
		for (const element of this.#contentElements) {
			if (element.type === "wrap") this.keyPairs[element.value] = element.value;
		}
	}

	/** The `content`, expects an `HTMLTextAreaElement`. */
	get textArea() {
		return this.getContent(HTMLTextAreaElement);
	}

	/** The current `value` of the `textarea`. */
	get text() {
		return this.textArea.value;
	}

	set text(value) {
		this.textArea.value = value;
	}

	/** An array of `ContentElement`s derived from each `trigger`'s data attributes. */
	get #contentElements() {
		const contentElements: ContentElement[] = [];

		for (const trigger of this.getTrigger()) {
			contentElements.push(trigger.dataset as ContentElement);
		}

		return contentElements;
	}

	/** Gets the end position of the selection */
	get #selEnd() {
		return this.textArea.selectionEnd;
	}

	/** Gets the start position of the selection. */
	get #selStart() {
		return this.textArea.selectionStart;
	}

	/**
	 * @param str string to insert into `text`
	 * @param index where to insert the string
	 * @returns the new string
	 */
	#insertStr(str: string, index: number) {
		this.text = this.text.slice(0, index) + str + this.text.slice(index);
	}

	/**
	 * @param start Starting index for removal.
	 * @param end Optional ending index.
	 */
	#removeChar(start: number, end = start + 1) {
		this.text = this.text.slice(0, start) + this.text.slice(end);
	}

	/** Sets the current cursor selection in the `textarea` */
	async #setSelection(start: number, end = start) {
		await Promise.resolve();
		this.textArea.setSelectionRange(start, end);
		this.textArea.focus();
	}

	/**
	 * - Inserts the text and then sets the caret position
	 * based on the `ContentElement` selected.
	 *
	 * @param content selected content element
	 */
	async #addContent({ value, type }: ContentElement) {
		let start = this.#selStart;

		if (type === "inline") {
			// insert at current position
			this.#insertStr(value, start);

			const match = /[a-z]+/i.exec(value);

			if (match?.index != null) {
				start += match.index;
				await this.#setSelection(start, start + match[0].length);
			} else {
				await this.#setSelection(start + value.length);
			}
		} else if (type === "wrap") {
			const end = this.#selEnd + value.length;

			this.#insertStr(value, start);
			this.#insertStr(this.keyPairs[value]!, end);
			await this.#setSelection(start + value.length, end);

			// if single char, add to opened
			if (value.length === 1) this.#openChars.push(value);
		} else {
			// "block"
			const { lines, lineNumber } = this.#lineMeta();

			// avoids `# # # `, instead adds trimmed => `### `
			const firstChar = value[0];
			if (firstChar && lines[lineNumber]?.startsWith(firstChar)) {
				value = value.trim();
			}

			// add the string to the beginning of the line
			lines[lineNumber] = value + lines[lineNumber];
			this.text = lines.join("\n");

			await this.#setSelection(start + value.length);
		}
	}

	/**
	 * Checks if there is a block element at the beginning of the string.
	 *
	 * @param line
	 * @returns Whatever is found, otherwise null
	 */
	#startsWithBlock(line: string) {
		for (const blockString of this.#contentElements
			.filter((el) => el.type === "block")
			.map((el) => el.value)) {
			if (line.startsWith(blockString.trim())) return blockString;
		}

		return null;
	}

	/**
	 * @param line
	 * @returns the number, if the line starts with a number and a period
	 */
	#startsWithNumberAndPeriod(line: string) {
		const match = line.match(/^(\d+)\./);
		return match ? Number(match[1]) : null;
	}

	/**
	 * @returns Metadata describing the current position of the selection.
	 *
	 * @example
	 *
	 * ```js
	 * const { line, lines, lineNumber, columnNumber } = getLineInfo();
	 * ```
	 */
	#lineMeta() {
		const lines = this.text.split("\n");
		let charCount = 0;

		for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
			const line = lines[lineNumber]!;
			const len = line.length + 1; // account for removed "\n" due to .split()
			charCount += len;

			// find the line that the cursor is on
			if (charCount > this.#selEnd) {
				return {
					line,
					lines,
					lineNumber,
					columnNumber: this.#selEnd - (charCount - len),
				};
			}
		}

		return { line: lines[0]!, lines, lineNumber: 0, columnNumber: 0 };
	}

	/**
	 * Increments/decrements the start of following lines if they are numbers.
	 *
	 * Prevents this:
	 *
	 * 1. presses enter here when two items in list
	 * 2.
	 * 2. (repeat of 2)
	 *
	 *
	 * Instead:
	 *
	 * 1.
	 * 2.
	 * 3.
	 *
	 * @param decrement if following lines should be decremented instead of incremented
	 */
	#correctFollowing(decrement = false) {
		let { lines, lineNumber } = this.#lineMeta();

		for (; ++lineNumber < lines.length; ) {
			let line = lines[lineNumber];

			if (line) {
				const num = this.#startsWithNumberAndPeriod(line);

				if (num) {
					let newNum: number;

					if (decrement) {
						if (num > 1) {
							newNum = num - 1;
						} else {
							break;
						}
					} else {
						newNum = num + 1;
					}

					lines[lineNumber] = String(newNum) + line.slice(String(num).length);
				} else {
					break;
				}
			}
		}

		const start = this.#selStart;
		this.text = lines.join("\n");
		this.#setSelection(start);
	}

	override mount() {
		this.textArea.addEventListener("keydown", async (e) => {
			const nextChar = this.text[this.#selEnd] ?? "";

			if (this.#resetKeys.has(e.key)) {
				// these keys will reset the type over for characters like "
				this.#openChars = [];
			} else if (e.key === "Backspace") {
				const prevChar = this.text[this.#selStart - 1];

				if (
					prevChar &&
					prevChar in this.keyPairs &&
					nextChar === this.keyPairs[prevChar]
				) {
					// remove both characters if the next one is the match of the prev
					e.preventDefault();

					const start = this.#selStart - 1;
					const end = this.#selEnd - 1;

					this.#removeChar(start);
					this.#removeChar(end);
					await this.#setSelection(start, end);

					this.#openChars.pop();
				} else if (prevChar === "\n" && this.#selStart === this.#selEnd) {
					e.preventDefault();

					const newPos = this.#selStart - 1;

					this.#correctFollowing(true);
					this.#removeChar(newPos);
					await this.#setSelection(newPos, newPos);
				}
			} else if (e.key === "Tab") {
				const blocks = this.text.split("```");
				let totalChars = 0;

				for (const [i, block] of blocks.entries()) {
					totalChars += block.length + 3;
					if (totalChars > this.#selStart) {
						// found
						if (i % 2) {
							// if caret is inside of a codeblock, indent
							e.preventDefault();
							await this.#addContent({ type: "inline", value: "\t" });
						}

						break;
					}
				}
				// TODO add shift tab backwards
			} else if (e.key === "Enter") {
				// autocomplete start of next line if block or number
				const { line, columnNumber } = this.#lineMeta();

				let repeat = this.#startsWithBlock(line);
				if (!repeat) {
					const num = this.#startsWithNumberAndPeriod(line);
					if (num) repeat = `${num + 1}. `;
				}

				if (repeat) {
					e.preventDefault();

					if (repeat.length < columnNumber) {
						// repeat same on next line
						await this.#addContent({ type: "inline", value: "\n" + repeat });
						this.#correctFollowing();
					} else {
						// remove repeat from current line
						const end = this.#selEnd;
						const newPos = end - repeat.length;

						this.#removeChar(newPos, end);
						await this.#setSelection(newPos);
					}
				}
			} else {
				const nextCharIsClosing = Object.values(this.keyPairs).includes(
					nextChar,
				);
				const notHighlighted = this.#selStart === this.#selEnd;

				if ((e.ctrlKey || e.metaKey) && e.key) {
					if (notHighlighted) {
						// no selection
						if (e.key === "c" || e.key === "x") {
							// copy or cut entire line
							e.preventDefault();
							const { line, lines, lineNumber, columnNumber } =
								this.#lineMeta();
							await navigator.clipboard.writeText(line);

							if (e.key === "x") {
								const newPos = this.#selStart - columnNumber;
								lines.splice(lineNumber, 1);
								this.text = lines.join("\n");
								await this.#setSelection(newPos, newPos);
							}
						}
					}

					// keyboard shortcut
					const matchedEl = this.#contentElements.find(
						(el) => el.key === e.key,
					);
					if (matchedEl) await this.#addContent(matchedEl);
				} else if (
					nextCharIsClosing &&
					(nextChar === e.key || e.key === "ArrowRight") &&
					this.#openChars.length &&
					notHighlighted
				) {
					// type over the next character instead of inserting
					e.preventDefault();
					this.#setSelection(this.#selStart + 1, this.#selEnd + 1);
					this.#openChars.pop();
				} else if (e.key in this.keyPairs) {
					e.preventDefault();
					await this.#addContent({ type: "wrap", value: e.key });
					this.#openChars.push(e.key);
				}
			}
		});

		// trims the selection if there is an extra space around it
		this.textArea.addEventListener("dblclick", () => {
			if (this.#selStart !== this.#selEnd) {
				if (this.text[this.#selStart] === " ") {
					this.#setSelection(this.#selStart + 1, this.#selEnd);
				}
				if (this.text[this.#selEnd - 1] === " ") {
					this.#setSelection(this.#selStart, this.#selEnd - 1);
				}
			}
		});

		// reset #openChars on click since the cursor has changed position
		this.textArea.addEventListener("click", () => (this.#openChars = []));

		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(this.event, () => {
				this.#addContent(trigger.dataset as ContentElement);
			});
		}
	}
}
