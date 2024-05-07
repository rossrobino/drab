Enhances the `textarea` element with controls to add content and keyboard shortcuts. Compared to other WYSIWYG editors, the `text` value is just a `string`, so you can easily store it in a database or manipulate it without learning a separate API.

`data-value`

Set the value of the text to be inserted using the `data-value` attribute on the `trigger`.

`data-type`

Set the `data-type` attribute of the `trigger` to specify how the content should be inserted into the `textarea`.

- `block` will be inserted at the beginning of the selected line.
- `wrap` will be inserted before and after the current selection.
- `inline` will be inserted at the current selection.

`data-key`

Add a `ctrl`/`meta` keyboard shortcut for the content based on the `data-key` attribute.

Other features:

- Automatically adds closing characters for `keyPairs`. For example, when typing `(`, `)` will be inserted and typed over when reached. All content with `data-type="wrap"` is also added to `keyPairs`.
- Highlights the first word of the text inserted if it contains letters.
- Automatically increments/decrements ordered lists.
- Adds the starting character to the next line for `block` content.
- On double click, highlight is corrected to only highlight the current word without space around it.
- `tab` key will indent and not change focus if the selection is within a code block (three backticks).
- When text is highlighted and a `wrap` character `keyPair` is typed, the highlighted text will be wrapped with the character instead of removing it. For example, if a word is highlighted and the `"` character is typed, the work will be surrounded by `"`s.

---

## Extends

- [`Base`](/docs/base/)

---

## Constructors

### new Editor()

> **new Editor**(): [`Editor`](/docs/editor/)

#### Returns

[`Editor`](/docs/editor/)

#### Overrides

[`Base`](/docs/base/).[`constructor`](/docs/base/#constructors)

#### Source

[src/package/editor/index.ts:63](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L63)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Base`](/docs/base/).[`#listenerController`](/docs/base/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L17)

### #openChars

> `private` **#openChars**: `string`[] = `[]`

Array of keyPair characters that have been opened.

#### Source

[src/package/editor/index.ts:51](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L51)

### keyPairs

> **keyPairs**: `object`

The characters that will be automatically closed when typed.

#### Index signature

\[`key`: `string`\]: `string`

#### Source

[src/package/editor/index.ts:54](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L54)

---

## Accessors

### #contentElements

> `get` `private` **#contentElements**(): `ContentElement`[]

An array of `ContentElement`s derived from each `trigger`'s data attributes.

#### Returns

`ContentElement`[]

#### Source

[src/package/editor/index.ts:89](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L89)

### #currentBlock

> `get` `private` **#currentBlock**(): `number`

- splits the content by "```" and finds the current index
  of the selectionStart

@returns current codeblock (index) of selectionStart

#### Returns

`number`

#### Source

[src/package/editor/index.ts:103](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L103)

### #selectionEnd

> `get` `private` **#selectionEnd**(): `number`

Gets the end position of the selection

#### Returns

`number`

#### Source

[src/package/editor/index.ts:116](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L116)

### #selectionStart

> `get` `private` **#selectionStart**(): `number`

Gets the start position of the selection.

#### Returns

`number`

#### Source

[src/package/editor/index.ts:121](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L121)

### event

> `get` **event**(): keyof `HTMLElementEventMap`

Event for the `trigger` to execute.

For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.

#### Default

```ts
"click";
```

> `set` **event**(`value`): `void`

#### Parameters

• **value**: keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Source

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L30)

### text

> `get` **text**(): `string`

The current `value` of the `textarea`.

> `set` **text**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/package/editor/index.ts:80](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L80)

### textArea

> `get` **textArea**(): `HTMLTextAreaElement`

The `content`, expects an `HTMLTextAreaElement`.

#### Returns

`HTMLTextAreaElement`

#### Source

[src/package/editor/index.ts:75](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L75)

---

## Methods

### #addContent()

> `private` **#addContent**(`el`): `Promise`\<`void`\>

- Inserts the text and then sets the caret position
  based on the `ContentElement` selected.

#### Parameters

• **el**: `ContentElement`

selected content element

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/editor/index.ts:227](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L227)

### #correctFollowing()

> `private` **#correctFollowing**(`currentLineNumber`, `decrement`): `void`

- Increments/decrements the start of following lines if they are numbers

Prevents this:

```
1. presses enter here when two items in list
2.
2.
```

Instead:

```
1.
2.
3.
```

#### Parameters

• **currentLineNumber**: `number`

• **decrement**: `boolean`= `false`

if following lines should be decremented instead of incremented

#### Returns

`void`

#### Source

[src/package/editor/index.ts:311](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L311)

### #getContentElement()

> `private` **#getContentElement**(`trigger`): `ContentElement`

#### Parameters

• **trigger**: `HTMLElement`

The trigger html element.

#### Returns

`ContentElement`

The ContentElement based on the `trigger`'s attributes.

#### Source

[src/package/editor/index.ts:134](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L134)

### #getLineInfo()

> `private` **#getLineInfo**(): `object`

#### Returns

`object`

lines as an array, current line number, current column number

##### columnNumber

> **columnNumber**: `number`

##### lineNumber

> **lineNumber**: `number` = `i`

##### lines

> **lines**: `string`[]

#### Example

```js
const { lines, lineNumber, columnNumber } = getLineInfo();
```

#### Source

[src/package/editor/index.ts:269](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L269)

### #getRepeat()

> `private` **#getRepeat**(`str`): `string`

- checks if there is a block element or a number
  at the beginning of the string

#### Parameters

• **str**: `undefined` \| `string`

#### Returns

`string`

what is found, or the empty string

#### Source

[src/package/editor/index.ts:242](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L242)

### #insertText()

> `private` **#insertText**(`el`, `selectionStart`, `selectionEnd`): `Promise`\<`void`\>

- Inserts text into the `textarea` based on the `display` property of
  the `ContentElement`.

#### Parameters

• **el**: `ContentElement`

the content element

• **selectionStart**: `number`

current start position the selection

• **selectionEnd**: `number`

current end position of the selection

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/editor/index.ts:149](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L149)

### #setCaretPosition()

> `private` **#setCaretPosition**(`text`, `selectionStart`, `selectionEnd`): `Promise`\<`void`\>

- Sets the caret position after text is inserted based on
  the length of the text.
- Highlights text if the content contains any letters.

#### Parameters

• **text**: `string`

• **selectionStart**: `number`

current start position the selection

• **selectionEnd**: `number`

current end position of the selection

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/editor/index.ts:191](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L191)

### #setSelectionRange()

> `private` **#setSelectionRange**(`start`, `end`): `void`

Sets the current cursor selection in the `textarea`

#### Parameters

• **start**: `number`

• **end**: `number`

#### Returns

`void`

#### Source

[src/package/editor/index.ts:126](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L126)

### connectedCallback()

> **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`connectedCallback`](/docs/base/#connectedcallback)

#### Source

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L152)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`destroy`](/docs/base/#destroy)

#### Source

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L159)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`disconnectedCallback`](/docs/base/#disconnectedcallback)

#### Source

[src/package/base/index.ts:161](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L161)

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

• **instance**= `undefined`

The instance of the desired element, ex: `HTMLDialogElement`.
Defaults to `HTMLElement`.

#### Returns

`T`

The element that matches the `content` selector.

#### Inherited from

[`Base`](/docs/base/).[`getContent`](/docs/base/#getcontent)

#### Default

```ts
this.querySelector("[data-content]");
```

#### Source

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L55)

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Inherited from

[`Base`](/docs/base/).[`getTrigger`](/docs/base/#gettrigger)

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Source

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/docs/base/).[`mount`](/docs/base/#mount)

#### Source

[src/package/editor/index.ts:338](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/editor/index.ts#L338)

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

• **K** _extends_ keyof `DocumentEventMap`

• **T** _extends_ `Window` \| `Document` \| `HTMLElement` = `HTMLElement`

#### Parameters

• **type**: `K`

• **listener**

• **element**: `T`= `undefined`

• **options**: `AddEventListenerOptions`= `{}`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`safeListener`](/docs/base/#safelistener)

#### Source

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L118)

### swapContent()

> **swapContent**(`revert`, `delay`): `void`

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

• **revert**: `boolean`= `true`

Swap back to old content

• **delay**: `number`= `800`

Wait time before swapping back

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`swapContent`](/docs/base/#swapcontent)

#### Source

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L72)

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

#### Type parameters

• **T** _extends_ `HTMLElement`

• **K** _extends_ keyof `HTMLElementEventMap`

#### Parameters

• **listener**

Listener to attach to all of the `trigger` elements.

• **type**: `K`= `undefined`

• **options?**: `AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`triggerListener`](/docs/base/#triggerlistener)

#### Source

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L135)
