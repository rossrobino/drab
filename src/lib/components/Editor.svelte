<script context="module" lang="ts">
	export interface ContentElement {
		/** name of element */
		name: string;

		/** text to add */
		text: string;

		/** controls how the text is added */
		display: "inline" | "block" | "wrap";

		/** contents of the button */
		icon: string | ComponentType;

		/** keyboard shortcut */
		key?: string;

		/** class to apply to the specific button */
		class?: string;
	}
</script>

<script lang="ts">
	import type { ComponentType } from "svelte";

	/** an array of content elements for the controls */
	export let contentElements: ContentElement[];

	/** `value` of the `textarea` element */
	export let textAreaValue = "";

	/** `placeholder` of the `textarea` element */
	export let textAreaPlaceholder = "";

	/** `class` of the `textarea` element */
	export let textAreaClass = "";

	/** `id` of the `textarea` element */
	export let textAreaId = "";

	/** `name` of the `textarea` element */
	export let textAreaName = "";

	/** `class` of all the `button` elements */
	export let buttonClass = "";

	/** `class` of the `div` that wraps the controls */
	export let controlsClass = "";

	/** `id` of the `div` that wraps the controls */
	export let controlsId = "";

	/** `selectionStart` value of the text area */
	export let selectionStart = 0;

	/** keys that will auto-close if typed, value is their closing character */
	export let keyPairs: { [key: string]: string } = {
		"(": ")",
		"{": "}",
		"[": "]",
		"<": ">",
		'"': '"',
		"`": "`",
	};

	let textArea: HTMLTextAreaElement;

	// add any `display: "wrap"` text from `contentElements` to `keyPairs`
	contentElements.forEach((el) => {
		if (el.display === "wrap") keyPairs[el.text] = el.text;
	});

	/** array of keyPair characters that have been opened */
	let openChars: string[] = [];

	/**
	 * - insert character into string at index
	 *
	 * @param str string to insert into
	 * @param char characters to insert into `str`
	 * @param index where to insert the characters
	 */
	const insertChar = (str: string, char: string, index: number) => {
		return str.slice(0, index) + char + str.slice(index);
	};

	/**
	 * - remove char from string at index
	 *
	 * @param str string to remove the character from
	 * @param index index of character to remove
	 */
	const removeChar = (str: string, index: number) => {
		return str.slice(0, index) + str.slice(index + 1);
	};

	/**
	 * - Inserts text into the `textarea` based on the `display` property of
	 * the `ContentElement`.
	 *
	 * @param el the content element
	 * @param selectionStart current start position the selection
	 * @param selectionEnd current end position of the selection
	 */
	const insertText = async (
		el: ContentElement,
		selectionStart: number,
		selectionEnd: number,
	) => {
		if (el.display === "inline") {
			// insert at current position
			textAreaValue = `${textAreaValue.slice(0, selectionEnd)}${
				el.text
			}${textAreaValue.slice(selectionEnd)}`;
		} else if (el.display === "wrap") {
			textAreaValue = insertChar(textAreaValue, el.text, selectionStart);
			textAreaValue = insertChar(
				textAreaValue,
				keyPairs[el.text],
				selectionEnd + el.text.length,
			);
			// if single char, add to opened
			if (el.text.length < 2) openChars.push(el.text);
		} else if (el.display === "block") {
			const index = getCurrentLineNumber();
			const lines = textAreaValue.split("\n");
			// add the string to the beginning of the line
			if (lines[index].startsWith(el.text[0])) {
				// avoids `# # # `, instead adds trimmed => `### `
				lines[index] = el.text.trim() + lines[index];
			} else {
				lines[index] = el.text + lines[index];
			}
			textAreaValue = lines.join("\n");
		}
	};

	/**
	 * - Sets the caret position after text is inserted based on
	 * the length of the text.
	 * - Highlights text if the content contains any letters.
	 *
	 * @param text
	 * @param selectionStart current start position the selection
	 * @param selectionEnd current end position of the selection
	 */
	const setCaretPosition = async (
		text: string,
		selectionStart: number,
		selectionEnd: number,
	) => {
		let startPos = 0;
		let endPos = 0;
		if (/[a-z]/i.test(text)) {
			// if string contains letters, highlight the first word
			for (let i = selectionEnd; i < textAreaValue.length; i++) {
				if (textAreaValue[i].match(/[a-z]/i)) {
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

		textArea.setSelectionRange(startPos, endPos);
		textArea.focus();
	};

	/**
	 * - Inserts the text and then sets the caret position
	 * based on the `ContentElement` selected.
	 *
	 * @param el selected content element
	 */
	const addContent = async (el: ContentElement) => {
		const selectionEnd = textArea.selectionEnd;
		const selectionStart = textArea.selectionStart;

		await insertText(el, selectionStart, selectionEnd);
		setCaretPosition(el.text, selectionStart, selectionEnd);
	};

	/**
	 * - Runs the keyboard shortcut for any element that matches the event
	 * - Closes opening characters, types over instead of inserting
	 *
	 * @param keyboardEvent KeyboardEvent
	 */
	const onKeyDown = async (e: KeyboardEvent) => {
		const resetKeys = ["ArrowUp", "ArrowDown", "Delete"];
		const nextChar = textAreaValue[textArea.selectionEnd];
		if (resetKeys.includes(e.key)) {
			// reset
			openChars = [];
		} else if (e.key === "Backspace") {
			const prevChar = textAreaValue[textArea.selectionStart - 1];
			if (prevChar in keyPairs && nextChar === keyPairs[prevChar]) {
				e.preventDefault();
				const start = textArea.selectionStart - 1;
				const end = textArea.selectionEnd - 1;
				textAreaValue = removeChar(textAreaValue, start);
				textAreaValue = removeChar(textAreaValue, end);
				setTimeout(() => {
					textArea.setSelectionRange(start, end);
				}, 0);
				openChars.pop();
			}
		} else if (e.key === "Tab") {
			if (getCurrentBlock() % 2 !== 0) {
				// if caret is inside of a codeblock, indent
				e.preventDefault();
				await addContent({
					display: "inline",
					text: "\t",
					icon: "tab",
					name: "tab",
				});
			}
		} else if (e.key === "Enter") {
			// autocomplete start of next line if block or number
			const index = getCurrentLineNumber();
			const lines = textAreaValue.split("\n");
			const currentLine = lines[index];
			let repeat = getRepeat(currentLine);
			const original = repeat;

			const num = parseInt(repeat);
			// line starts with number? - increment
			if (num) repeat = `${num + 1}. `;

			if (repeat && currentLine.length > original.length) {
				e.preventDefault();
				await addContent({
					display: "inline",
					text: `\n${repeat}`,
					icon: "",
					name: "",
				});
			} else if (repeat) {
				// only the repeat and no content - remove
				e.preventDefault();
				const selectionEnd = textArea.selectionEnd;
				const newPos = selectionEnd - original.length;
				for (let i = 0; i < original.length; i++) {
					textAreaValue = removeChar(
						textAreaValue,
						textArea.selectionEnd - (i + 1),
					);
				}
				setTimeout(async () => {
					textArea.setSelectionRange(newPos, newPos);
					textArea.focus();
					await addContent({
						display: "inline",
						text: `\n`,
						icon: "",
						name: "",
					});
				}, 0);
			}
		} else {
			const nextCharIsClosing = Object.values(keyPairs).includes(nextChar);
			const highlighted = textArea.selectionStart !== textArea.selectionEnd;
			if (e.ctrlKey && e.key) {
				// keyboard shortcut
				const matchedEl = contentElements.find((el) => el.key === e.key);
				if (matchedEl) addContent(matchedEl);
			} else if (
				nextCharIsClosing &&
				(nextChar === e.key || e.key === "ArrowRight") &&
				openChars.length &&
				!highlighted
			) {
				// type over the next character instead of inserting
				e.preventDefault();
				textArea.setSelectionRange(
					textArea.selectionStart + 1,
					textArea.selectionEnd + 1,
				);
				openChars.pop();
			} else if (e.key in keyPairs) {
				e.preventDefault();
				await addContent({
					display: "wrap",
					text: e.key,
					icon: "",
					name: "",
				});
				openChars.push(e.key);
			}
		}
	};

	/**
	 * - trims the selection if there is an extra space around it
	 */
	const trimSelection = () => {
		if (textArea.selectionStart !== textArea.selectionEnd) {
			if (textAreaValue[textArea.selectionStart] === " ") {
				textArea.setSelectionRange(
					textArea.selectionStart + 1,
					textArea.selectionEnd,
				);
			}
			if (textAreaValue[textArea.selectionEnd - 1] === " ") {
				textArea.setSelectionRange(
					textArea.selectionStart,
					textArea.selectionEnd - 1,
				);
			}
		}
	};

	const updateSelectionStart = () => {
		selectionStart = textArea.selectionStart;
	};

	/**
	 * @returns the index of the line that selectionEnd falls on
	 */
	const getCurrentLineNumber = () => {
		const lines = textAreaValue.split("\n");
		let characterCount = 0;
		for (let i = 0; i < lines.length; i++) {
			// for each line
			characterCount++; // account for removed "\n" due to .split()
			characterCount += lines[i].length;
			// find the line that the cursor is on
			if (characterCount > textArea.selectionEnd) {
				return i;
			}
		}
		return 0;
	};

	/**
	 * - splits the content by "```" and finds the current index
	 * of the selectionStart
	 *
	 * @returns current block (index) of selectionStart
	 */
	const getCurrentBlock = () => {
		const blocks = textAreaValue.split("```");
		let totalChars = 0;
		for (const [i, block] of blocks.entries()) {
			totalChars += block.length + 3;
			if (textArea.selectionStart < totalChars) {
				return i;
			}
		}
		return 0;
	};

	/**
	 * - checks if there is a block element or a number
	 * at the beginning of the string
	 *
	 * @param str
	 * @returns what is found, or the empty string
	 */
	const getRepeat = (str: string) => {
		const blockStrings: string[] = [];
		contentElements.forEach((el) => {
			if (el.display === "block") blockStrings.push(el.text);
		});
		for (let i = 0; i < blockStrings.length; i++) {
			const repeatString = blockStrings[i];
			if (str.startsWith(repeatString)) {
				return repeatString;
			}
		}
		const repeatNum = startsWithNumberAndPeriod(str);
		if (repeatNum) return `${repeatNum}. `;
		return "";
	};

	/**
	 * @param str
	 * @returns the number, if the string starts with a number and a period
	 */
	const startsWithNumberAndPeriod = (str: string) => {
		const result = str.match(/^(\d+)\./);
		return result ? Number(result[1]) : null;
	};
</script>

<textarea
	id={textAreaId}
	class={textAreaClass}
	name={textAreaName}
	placeholder={textAreaPlaceholder}
	on:keydown={onKeyDown}
	on:keyup={updateSelectionStart}
	on:dblclick={trimSelection}
	bind:value={textAreaValue}
	bind:this={textArea}
	on:click={() => {
		openChars = [];
		updateSelectionStart();
	}}
	on:input
/>
<div id={controlsId} class={controlsClass}>
	{#each contentElements as el}
		<button
			class={el.class ? `${buttonClass} ${el.class}` : buttonClass}
			on:click={() => addContent(el)}
			title={el.name}
			aria-label={el.name}
		>
			{#if typeof el.icon !== "string"}
				<svelte:component this={el.icon} />
			{:else}
				{el.icon}
			{/if}
		</button>
	{/each}
</div>
