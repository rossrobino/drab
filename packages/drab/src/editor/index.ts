import { Base, type BaseAttributes } from "../base/index.js";

export type EditorAttributes = BaseAttributes;

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
	/** Array of keyPair characters that have been opened. */
	#openChars: string[] = [];

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
			if (element.type === "wrap") {
				this.keyPairs[element.value] = element.value;
			}
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
			contentElements.push(this.#getContentElement(trigger));
		}
		return contentElements;
	}

	/**
	 * - splits the content by "```" and finds the current index
	 * of the selectionStart
	 *
	 * @returns current codeblock (index) of selectionStart
	 */
	get #currentBlock() {
		const blocks = this.text.split("```");
		let totalChars = 0;
		for (const [i, block] of blocks.entries()) {
			totalChars += block.length + 3;
			if (this.#selectionStart < totalChars) {
				return i;
			}
		}
		return 0;
	}

	/** Gets the end position of the selection */
	get #selectionEnd() {
		return this.textArea.selectionEnd;
	}

	/** Gets the start position of the selection. */
	get #selectionStart() {
		return this.textArea.selectionStart;
	}

	/** Sets the current cursor selection in the `textarea` */
	#setSelectionRange(start: number, end: number) {
		this.textArea.setSelectionRange(start, end);
	}

	/**
	 * @param trigger The trigger html element.
	 * @returns The ContentElement based on the `trigger`'s attributes.
	 */
	#getContentElement(trigger: HTMLElement): ContentElement {
		const type = trigger.dataset.type as ContentElement["type"];
		const value = trigger.dataset.value as ContentElement["value"];
		const key = trigger.dataset.key ?? undefined;
		return { type, value, key };
	}

	/**
	 * - Inserts text into the `textarea` based on the `display` property of
	 * the `ContentElement`.
	 *
	 * @param el the content element
	 * @param selectionStart current start position the selection
	 * @param selectionEnd current end position of the selection
	 */
	async #insertText(
		el: ContentElement,
		selectionStart: number,
		selectionEnd: number,
	) {
		if (el.type === "inline") {
			// insert at current position
			this.text = `${this.text.slice(0, selectionEnd)}${
				el.value
			}${this.text.slice(selectionEnd)}`;
		} else if (el.type === "wrap") {
			this.text = insertChar(this.text, el.value, selectionStart);
			this.text = insertChar(
				this.text,
				this.keyPairs[el.value] as string,
				selectionEnd + el.value.length,
			);
			// if single char, add to opened
			if (el.value.length < 2) this.#openChars.push(el.value);
		} else if (el.type === "block") {
			const { lines, lineNumber } = this.#getLineInfo();
			const firstChar = el.value.at(0);
			// add the string to the beginning of the line
			if (firstChar && lines[lineNumber]?.startsWith(firstChar)) {
				// avoids `# # # `, instead adds trimmed => `### `
				lines[lineNumber] = el.value.trim() + lines[lineNumber];
			} else {
				lines[lineNumber] = el.value + lines[lineNumber];
			}
			this.text = lines.join("\n");
		}
	}

	/**
	 * - Sets the caret position after text is inserted based on
	 * the length of the text.
	 * - Highlights text if the content contains any letters.
	 *
	 * @param text
	 * @param selectionStart current start position the selection
	 * @param selectionEnd current end position of the selection
	 */
	async #setCaretPosition(
		text: string,
		selectionStart: number,
		selectionEnd: number,
	) {
		let startPos = 0;
		let endPos = 0;
		if (/[a-z]/i.test(text)) {
			// if string contains letters, highlight the first word
			for (let i = selectionEnd; i < this.text.length; i++) {
				if (this.text[i]?.match(/[a-z]/i)) {
					if (!startPos) {
						startPos = i;
					} else {
						endPos = i + 1;
					}
				} else if (startPos) {
					break;
				}
			}
		} else {
			// leave the cursor in place
			startPos = selectionStart + text.length;
			endPos = selectionEnd + text.length;
		}

		this.#setSelectionRange(startPos, endPos);
		this.textArea.focus();
	}

	/**
	 * - Inserts the text and then sets the caret position
	 * based on the `ContentElement` selected.
	 *
	 * @param el selected content element
	 */
	async #addContent(el: ContentElement) {
		const selectionEnd = this.#selectionEnd;
		const selectionStart = this.#selectionStart;

		await this.#insertText(el, selectionStart, selectionEnd);
		this.#setCaretPosition(el.value, selectionStart, selectionEnd);
	}

	/**
	 * - checks if there is a block element or a number
	 * at the beginning of the string
	 *
	 * @param str
	 * @returns what is found, or the empty string
	 */
	#getRepeat(str: string | undefined) {
		if (str) {
			const blockStrings: string[] = [];
			this.#contentElements.forEach((el) => {
				if (el.type === "block") blockStrings.push(el.value);
			});
			for (let i = 0; i < blockStrings.length; i++) {
				const repeatString = blockStrings[i];
				if (repeatString && str.startsWith(repeatString)) {
					return repeatString;
				}
			}
			const repeatNum = startsWithNumberAndPeriod(str);
			if (repeatNum) return `${repeatNum}. `;
		}
		return "";
	}

	/**
	 * @returns lines as an array, current line number, current column number
	 *
	 * @example
	 *
	 * ```js
	 * const { lines, lineNumber, columnNumber } = getLineInfo();
	 * ```
	 */
	#getLineInfo() {
		const lines = this.text.split("\n");
		let characterCount = 0;
		for (let i = 0; i < lines.length; i++) {
			const lineLength = lines.at(i)?.length ?? 0;
			// for each line
			characterCount++; // account for removed "\n" due to .split()
			characterCount += lineLength;
			// find the line that the cursor is on
			if (characterCount > this.#selectionEnd) {
				return {
					lines,
					lineNumber: i,
					columnNumber: this.#selectionEnd - (characterCount - lineLength - 1),
				};
			}
		}
		return { lines, lineNumber: 0, columnNumber: 0 };
	}

	/**
	 * - Increments/decrements the start of following lines if they are numbers
	 *
	 * Prevents this:
	 *
	 * ```
	 * 1. presses enter here when two items in list
	 * 2.
	 * 2.
	 * ```
	 *
	 * Instead:
	 *
	 * ```
	 * 1.
	 * 2.
	 * 3.
	 * ```
	 *
	 * @param currentLineNumber
	 * @param decrement if following lines should be decremented instead of incremented
	 */
	#correctFollowing(currentLineNumber: number, decrement = false) {
		const { lines } = this.#getLineInfo();
		for (let i = currentLineNumber + 1; i < lines.length; i++) {
			const line = lines[i];
			if (line) {
				const num = startsWithNumberAndPeriod(line);
				if (!num) {
					break;
				} else {
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
					lines[i] = line.slice(String(num).length); // remove number from start
					lines[i] = String(newNum) + lines[i];
				}
			}
		}
		this.text = lines.join("\n");
	}

	override mount() {
		this.textArea.addEventListener("keydown", async (e) => {
			// these keys will reset the type over for characters like "
			const resetKeys = ["ArrowUp", "ArrowDown", "Delete"];
			const nextChar = this.text[this.#selectionEnd] ?? "";
			if (resetKeys.includes(e.key)) {
				// reset
				this.#openChars = [];
			} else if (e.key === "Backspace") {
				const prevChar = this.text[this.#selectionStart - 1];
				if (
					prevChar &&
					prevChar in this.keyPairs &&
					nextChar === this.keyPairs[prevChar]
				) {
					// remove both characters if the next one is the match of the prev
					e.preventDefault();
					const start = this.#selectionStart - 1;
					const end = this.#selectionEnd - 1;
					this.text = removeChar(this.text, start);
					this.text = removeChar(this.text, end);
					setTimeout(() => {
						this.#setSelectionRange(start, end);
					}, 0);
					this.#openChars.pop();
				}
				if (prevChar === "\n" && this.#selectionStart === this.#selectionEnd) {
					// see `correctFollowing`
					e.preventDefault();
					const newPos = this.#selectionStart - 1;
					const { lineNumber } = this.#getLineInfo();
					this.#correctFollowing(lineNumber, true);
					this.text = removeChar(this.text, newPos);
					setTimeout(async () => {
						this.#setSelectionRange(newPos, newPos);
					}, 0);
				}
			} else if (e.key === "Tab") {
				if (this.#currentBlock % 2 !== 0) {
					// if caret is inside of a codeblock, indent
					e.preventDefault();
					await this.#addContent({
						type: "inline",
						value: "\t",
					});
				}
			} else if (e.key === "Enter") {
				// autocomplete start of next line if block or number
				const { lines, lineNumber, columnNumber } = this.#getLineInfo();
				const currentLine = lines.at(lineNumber);
				let repeat = this.#getRepeat(currentLine);
				const original = repeat;

				const num = startsWithNumberAndPeriod(repeat);
				// line starts with number and period? - increment
				if (num) repeat = `${num + 1}. `;

				if (repeat && original.length < columnNumber) {
					e.preventDefault();
					if (num) this.#correctFollowing(lineNumber);
					await this.#addContent({
						type: "inline",
						value: `\n${repeat}`,
					});
				} else if (repeat && original.length === columnNumber) {
					// remove if the repeat and caret at the end of the original
					e.preventDefault();

					// have to set a placeholder since `this.#selectionEnd` will change
					// as characters are being removed
					const originalSelectionEnd = this.#selectionEnd;

					// go back the the length of the original
					const newPos = originalSelectionEnd - original.length;

					// for each character in the original
					for (let i = 0; i < original.length; i++) {
						this.text = removeChar(this.text, originalSelectionEnd - (i + 1));
					}

					setTimeout(async () => {
						this.#setSelectionRange(newPos, newPos);
						this.textArea.focus();
						await this.#addContent({
							type: "inline",
							value: `\n`,
						});
					}, 0);
				}
			} else {
				const nextCharIsClosing = Object.values(this.keyPairs).includes(
					nextChar,
				);
				const highlighted = this.#selectionStart !== this.#selectionEnd;
				if (e.ctrlKey || e.metaKey) {
					if (this.#selectionStart === this.#selectionEnd) {
						// no selection
						if (e.key === "c" || e.key === "x") {
							// copy or cut entire line
							e.preventDefault();
							const { lines, lineNumber, columnNumber } = this.#getLineInfo();
							await navigator.clipboard.writeText(
								`${lineNumber === 0 && e.key === "x" ? "" : "\n"}${
									lines[lineNumber]
								}`,
							);
							if (e.key === "x") {
								const newPos = this.#selectionStart - columnNumber;
								lines.splice(lineNumber, 1);
								this.text = lines.join("\n");
								setTimeout(() => {
									this.#setSelectionRange(newPos, newPos);
								}, 0);
							}
						}
					}
				}
				if ((e.ctrlKey || e.metaKey) && e.key) {
					// keyboard shortcut
					const matchedEl = this.#contentElements.find(
						(el) => el.key === e.key,
					);
					if (matchedEl) this.#addContent(matchedEl);
				} else if (
					nextCharIsClosing &&
					(nextChar === e.key || e.key === "ArrowRight") &&
					this.#openChars.length &&
					!highlighted
				) {
					// type over the next character instead of inserting
					e.preventDefault();
					this.#setSelectionRange(
						this.#selectionStart + 1,
						this.#selectionEnd + 1,
					);
					this.#openChars.pop();
				} else if (e.key in this.keyPairs) {
					e.preventDefault();
					await this.#addContent({
						type: "wrap",
						value: e.key,
					});
					this.#openChars.push(e.key);
				}
			}
		});

		// trims the selection if there is an extra space around it
		this.textArea.addEventListener("dblclick", () => {
			if (this.#selectionStart !== this.#selectionEnd) {
				if (this.text[this.#selectionStart] === " ") {
					this.#setSelectionRange(this.#selectionStart + 1, this.#selectionEnd);
				}
				if (this.text[this.#selectionEnd - 1] === " ") {
					this.#setSelectionRange(this.#selectionStart, this.#selectionEnd - 1);
				}
			}
		});

		// reset #openChars on click since the cursor has changed position
		this.textArea.addEventListener("click", () => (this.#openChars = []));

		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(this.event, () => {
				this.#addContent(this.#getContentElement(trigger));
			});
		}
	}
}

/**
 * @param str
 * @returns the number, if the string starts with a number and a period
 */
const startsWithNumberAndPeriod = (str: string) => {
	const result = str.match(/^(\d+)\./);
	return result ? Number(result[1]) : null;
};

/**
 * - insert character into string at index
 *
 * @param str string to insert into
 * @param char characters to insert into `str`
 * @param index where to insert the characters
 * @returns the new string
 */
const insertChar = (str: string, char: string, index: number) => {
	return str.slice(0, index) + char + str.slice(index);
};

/**
 * - remove char from string at index
 *
 * @param str string to remove the character from
 * @param index index of character to remove
 * @returns the new string
 */
const removeChar = (str: string, index: number) => {
	return str.slice(0, index) + str.slice(index + 1);
};
