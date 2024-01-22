import { Base } from "../base/index.ts";

type ContentElement = {
	type: "block" | "inline" | "wrap";
	value: string;
	key?: string;
};

export class Editor extends Base {
	/** Array of keyPair characters that have been opened. */
	#openChars: string[] = [];

	constructor() {
		super();
	}

	get textArea() {
		return this.content(HTMLTextAreaElement);
	}

	get text() {
		return this.textArea.value;
	}

	set text(value) {
		this.textArea.value = value;
	}

	get keyPairs() {
		const keyPairs: { [key: string]: string } = {
			"(": ")",
			"{": "}",
			"[": "]",
			"<": ">",
			'"': '"',
			"`": "`",
		};

		// add any `type: "wrap"` values from `contentElements` to `keyPairs`
		for (const element of this.#contentElements) {
			if (element.type === "wrap") {
				keyPairs[element.value] = element.value;
			}
		}

		return keyPairs;
	}

	/**
	 * @param trigger The trigger html element.
	 * @returns The ContentElement based on the `trigger`'s attributes.
	 */
	#getContentElement(trigger: HTMLElement): ContentElement {
		const type = trigger.getAttribute("data-type") as ContentElement["type"];
		const value = trigger.getAttribute("data-value") as ContentElement["type"];
		const key = trigger.getAttribute("data-key") ?? undefined;
		return { type, value, key };
	}

	get #contentElements() {
		const contentElements: ContentElement[] = [];
		for (const trigger of this.trigger()) {
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

	#setSelectionRange(start: number, end: number) {
		this.textArea.setSelectionRange(start, end);
	}

	get #selectionEnd() {
		return this.textArea.selectionEnd;
	}

	get #selectionStart() {
		return this.textArea.selectionStart;
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

	connectedCallback() {
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
					const selectionEnd = this.#selectionEnd;
					const newPos = selectionEnd - original.length;
					for (let i = 0; i < original.length; i++) {
						this.text = removeChar(this.text, this.#selectionEnd - (i + 1));
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

		this.textArea.addEventListener("click", () => (this.#openChars = []));

		this.triggerListener((e) => {
			if (e.target instanceof HTMLElement) {
				this.#addContent(this.#getContentElement(e.target));
			}
		});
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
