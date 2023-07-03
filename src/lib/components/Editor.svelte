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
	 * @param str - string to insert into
	 * @param char - characters to insert into `str`
	 * @param index - where to insert the characters
	 */
	const insertChar = (str: string, char: string, index: number) => {
		return str.slice(0, index) + char + str.slice(index);
	};

	/**
	 * - remove char from string at index
	 *
	 * @param str - string to remove the character from
	 * @param index - index of character to remove
	 */
	const removeChar = (str: string, index: number) => {
		return str.slice(0, index) + str.slice(index + 1);
	};

	/**
	 * - Inserts text into the `textarea` based on the `display` property of
	 * the `ContentElement`.
	 *
	 * @param el - the content element
	 * @param selectionStart - current start position the selection
	 * @param selectionEnd - current end position of the selection
	 */
	const insertText = async (
		el: ContentElement,
		selectionStart: number,
		selectionEnd: number
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
				selectionEnd + el.text.length
			);
			// if single char, add to opened
			if (el.text.length < 2) openChars.push(el.text);
		} else {
			// "block"
			const splitContent = textAreaValue.split("\n");
			let characterCount = 0;
			for (let i = 0; i < splitContent.length; i++) {
				// for each line
				characterCount++; // account for removed "\n" due to .split()
				characterCount += splitContent[i].length;
				// find the line that the cursor is on
				if (characterCount > selectionEnd) {
					// add the string to the beginning of the line
					if (splitContent[i].startsWith(el.text[0])) {
						// avoids `# # # `, instead adds trimmed => `### `
						splitContent[i] = el.text.trim() + splitContent[i];
					} else {
						splitContent[i] = el.text + splitContent[i];
					}
					textAreaValue = splitContent.join("\n");
					break;
				}
			}
		}
	};

	/**
	 * - Sets the caret position after text is inserted based on
	 * the length of the text.
	 * - Highlights text if the content contains any letters.
	 *
	 * @param el - the content element
	 * @param selectionStart - current start position the selection
	 * @param selectionEnd - current end position of the selection
	 */
	const setCaretPosition = async (
		el: ContentElement,
		selectionStart: number,
		selectionEnd: number
	) => {
		let startPos = 0;
		let endPos = 0;
		if (/[a-z]/i.test(el.text)) {
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
			startPos = selectionStart + el.text.length;
			endPos = selectionEnd + el.text.length;
		}

		textArea.setSelectionRange(startPos, endPos);
		textArea.focus();
	};

	/**
	 * - Inserts the text and then sets the caret position
	 * based on the `ContentElement` selected.
	 *
	 * @param el - the selected content element
	 */
	const addContent = async (el: ContentElement) => {
		const selectionEnd = textArea.selectionEnd;
		const selectionStart = textArea.selectionStart;

		await insertText(el, selectionStart, selectionEnd);
		setCaretPosition(el, selectionStart, selectionEnd);
	};

	/**
	 * - Runs the keyboard shortcut for any element that matches the event
	 * - Closes opening characters, types over instead of inserting
	 *
	 * @param keyboardEvent - KeyboardEvent
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
					textArea.selectionEnd + 1
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

	/** trim the selection if there is an extra space around it*/
	const trimSelection = () => {
		if (textArea.selectionStart !== textArea.selectionEnd) {
			if (textAreaValue[textArea.selectionStart] === " ") {
				textArea.setSelectionRange(
					textArea.selectionStart + 1,
					textArea.selectionEnd
				);
			}
			if (textAreaValue[textArea.selectionEnd - 1] === " ") {
				textArea.setSelectionRange(
					textArea.selectionStart,
					textArea.selectionEnd - 1
				);
			}
		}
	};
</script>

<textarea
	id={textAreaId}
	class={textAreaClass}
	name={textAreaName}
	placeholder={textAreaPlaceholder}
	on:keydown={onKeyDown}
	on:dblclick={trimSelection}
	bind:value={textAreaValue}
	bind:this={textArea}
	on:click={() => (openChars = [])}
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
