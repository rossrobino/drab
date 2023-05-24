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

	/** `class` of all the `button` elements */
	export let buttonClass = "";

	/** `class` of the `div` that wraps the controls */
	export let controlsClass = "";

	/** `id` of the `div` that wraps the controls */
	export let controlsId = "";

	let textArea: HTMLTextAreaElement;

	/**
	 * - Inserts text into the `textarea` based on the `display` property of
	 * the `ContentElement`.
	 *
	 * @param el - the content element
	 * @param carSelStart - current start position the selection
	 * @param carSelEnd - current end position of the selection
	 */
	const insertText = async (
		el: ContentElement,
		carSelStart: number,
		carSelEnd: number
	) => {
		if (el.display === "inline") {
			// insert at current position
			textAreaValue = `${textAreaValue.slice(0, carSelEnd)}${
				el.text
			}${textAreaValue.slice(carSelEnd)}`;
		} else if (el.display === "wrap") {
			textAreaValue = `${textAreaValue.slice(0, carSelStart)}${
				el.text
			}${textAreaValue.slice(carSelStart)}`;
			textAreaValue = `${textAreaValue.slice(0, carSelEnd + el.text.length)}${
				el.text
			}${textAreaValue.slice(carSelEnd + el.text.length)}`;
		} else {
			const splitContent = textAreaValue.split("\n");
			let characterCount = 0;
			for (let i = 0; i < splitContent.length; i++) {
				// for each line
				characterCount++; // account for removed "\n" due to .split()
				characterCount += splitContent[i].length;
				// find the line that the cursor is on
				if (characterCount > carSelEnd) {
					// add the string to the beginning of the line
					splitContent[i] = el.text + splitContent[i];
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
	 * @param carSelStart - current start position the selection
	 * @param carSelEnd - current end position of the selection
	 */
	const setCaretPosition = async (
		el: ContentElement,
		carSelStart: number,
		carSelEnd: number
	) => {
		let startPos = 0;
		let endPos = 0;
		if (/[a-z]/i.test(el.text)) {
			// if string contains letters, highlight the first word
			for (let i = carSelEnd; i < textAreaValue.length; i++) {
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
			startPos = carSelStart + el.text.length;
			endPos = carSelEnd + el.text.length;
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
		const carSelEnd = textArea.selectionEnd;
		const carSelStart = textArea.selectionStart;

		await insertText(el, carSelStart, carSelEnd);
		setCaretPosition(el, carSelStart, carSelEnd);
	};

	/**
	 * - Runs the keyboard shortcut for any element that matches the event
	 *
	 * @param keyboardEvent - KeyboardEvent
	 */
	const onKeyDown = ({ ctrlKey, key }: KeyboardEvent) => {
		if (ctrlKey && key) {
			const matchedEl = contentElements.find((el) => el.key === key);
			if (matchedEl) addContent(matchedEl);
		}
	};
</script>

<textarea
	id={textAreaId}
	class={textAreaClass}
	placeholder={textAreaPlaceholder}
	on:keydown={onKeyDown}
	bind:value={textAreaValue}
	bind:this={textArea}
/>
<div id={controlsId} class={controlsClass}>
	{#each contentElements as el}
		<button class={buttonClass} on:click={() => addContent(el)}>
			{#if typeof el.icon !== "string"}
				<svelte:component this={el.icon} />
			{:else}
				{el.icon}
			{/if}
		</button>
	{/each}
</div>
