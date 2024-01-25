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

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`Editor`**

---

## Constructors

### constructor

• **new Editor**(): [`Editor`](/docs/editor/)

#### Returns

[`Editor`](/docs/editor/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/editor/index.ts:60](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L60)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L17)

### #openChars

• `Private` **#openChars**: `string`[] = `[]`

Array of keyPair characters that have been opened.

#### Defined in

[src/package/editor/index.ts:48](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L48)

### keyPairs

• **keyPairs**: `Object`

The characters that will be automatically closed when typed.

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/package/editor/index.ts:51](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L51)

---

## Accessors

### #contentElements

• `get` **#contentElements**(): `ContentElement`[]

An array of `ContentElement`s derived from each `trigger`'s data attributes.

#### Returns

`ContentElement`[]

#### Defined in

[src/package/editor/index.ts:86](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L86)

### #currentBlock

• `get` **#currentBlock**(): `number`

- splits the content by "```" and finds the current index
  of the selectionStart

@returns current codeblock (index) of selectionStart

#### Returns

`number`

#### Defined in

[src/package/editor/index.ts:100](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L100)

### #selectionEnd

• `get` **#selectionEnd**(): `number`

Gets the end position of the selection

#### Returns

`number`

#### Defined in

[src/package/editor/index.ts:113](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L113)

### #selectionStart

• `get` **#selectionStart**(): `number`

Gets the start position of the selection.

#### Returns

`number`

#### Defined in

[src/package/editor/index.ts:118](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L118)

### event

• `get` **event**(): keyof `HTMLElementEventMap`

Event for the `trigger` to execute.

For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Inherited from

Base.event

#### Defined in

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L30)

• `set` **event**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Inherited from

Base.event

#### Defined in

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L34)

### text

• `get` **text**(): `string`

The current `value` of the `textarea`.

#### Returns

`string`

#### Defined in

[src/package/editor/index.ts:77](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L77)

• `set` **text**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/editor/index.ts:81](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L81)

### textArea

• `get` **textArea**(): `HTMLTextAreaElement`

The `content`, expects an `HTMLTextAreaElement`.

#### Returns

`HTMLTextAreaElement`

#### Defined in

[src/package/editor/index.ts:72](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L72)

---

## Methods

### #addContent

▸ **#addContent**(`el`): `Promise`\<`void`\>

- Inserts the text and then sets the caret position
  based on the `ContentElement` selected.

#### Parameters

| Name | Type             | Description              |
| :--- | :--------------- | :----------------------- |
| `el` | `ContentElement` | selected content element |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/editor/index.ts:224](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L224)

### #correctFollowing

▸ **#correctFollowing**(`currentLineNumber`, `decrement?`): `void`

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

| Name                | Type      | Default value | Description                                                     |
| :------------------ | :-------- | :------------ | :-------------------------------------------------------------- |
| `currentLineNumber` | `number`  | `undefined`   |                                                                 |
| `decrement`         | `boolean` | `false`       | if following lines should be decremented instead of incremented |

#### Returns

`void`

#### Defined in

[src/package/editor/index.ts:308](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L308)

### #getContentElement

▸ **#getContentElement**(`trigger`): `ContentElement`

#### Parameters

| Name      | Type          | Description               |
| :-------- | :------------ | :------------------------ |
| `trigger` | `HTMLElement` | The trigger html element. |

#### Returns

`ContentElement`

The ContentElement based on the `trigger`'s attributes.

#### Defined in

[src/package/editor/index.ts:131](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L131)

### #getLineInfo

▸ **#getLineInfo**(): `Object`

#### Returns

`Object`

lines as an array, current line number, current column number

| Name           | Type       |
| :------------- | :--------- |
| `columnNumber` | `number`   |
| `lineNumber`   | `number`   |
| `lines`        | `string`[] |

**`Example`**

```js
const { lines, lineNumber, columnNumber } = getLineInfo();
```

#### Defined in

[src/package/editor/index.ts:266](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L266)

### #getRepeat

▸ **#getRepeat**(`str`): `string`

- checks if there is a block element or a number
  at the beginning of the string

#### Parameters

| Name  | Type                    |
| :---- | :---------------------- |
| `str` | `undefined` \| `string` |

#### Returns

`string`

what is found, or the empty string

#### Defined in

[src/package/editor/index.ts:239](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L239)

### #insertText

▸ **#insertText**(`el`, `selectionStart`, `selectionEnd`): `Promise`\<`void`\>

- Inserts text into the `textarea` based on the `display` property of
  the `ContentElement`.

#### Parameters

| Name             | Type             | Description                           |
| :--------------- | :--------------- | :------------------------------------ |
| `el`             | `ContentElement` | the content element                   |
| `selectionStart` | `number`         | current start position the selection  |
| `selectionEnd`   | `number`         | current end position of the selection |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/editor/index.ts:146](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L146)

### #setCaretPosition

▸ **#setCaretPosition**(`text`, `selectionStart`, `selectionEnd`): `Promise`\<`void`\>

- Sets the caret position after text is inserted based on
  the length of the text.
- Highlights text if the content contains any letters.

#### Parameters

| Name             | Type     | Description                           |
| :--------------- | :------- | :------------------------------------ |
| `text`           | `string` |                                       |
| `selectionStart` | `number` | current start position the selection  |
| `selectionEnd`   | `number` | current end position of the selection |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/editor/index.ts:188](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L188)

### #setSelectionRange

▸ **#setSelectionRange**(`start`, `end`): `void`

Sets the current cursor selection in the `textarea`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `start` | `number` |
| `end`   | `number` |

#### Returns

`void`

#### Defined in

[src/package/editor/index.ts:123](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L123)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[connectedCallback](/docs/base/#connectedcallback)

#### Defined in

[src/package/base/index.ts:129](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L129)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:133](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L133)

### getContent

▸ **getContent**\<`T`\>(`instance?`): `T`

#### Type parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `T`  | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name       | Type      | Description                                                                              |
| :--------- | :-------- | :--------------------------------------------------------------------------------------- |
| `instance` | () => `T` | The instance of the desired element, ex: `HTMLDialogElement`. Defaults to `HTMLElement`. |

#### Returns

`T`

The element that matches the `content` selector.

**`Default`**

```ts
this.querySelector("[data-content]");
```

#### Inherited from

[Base](/docs/base/).[getContent](/docs/base/#getcontent)

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L55)

### getTrigger

▸ **getTrigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Base](/docs/base/).[getTrigger](/docs/base/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

Placeholder function is passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Base](/docs/base/).[mount](/docs/base/#mount)

#### Defined in

[src/package/editor/index.ts:335](https://github.com/rossrobino/components/blob/a5378fb/src/package/editor/index.ts#L335)

### safeListener

▸ **safeListener**\<`K`, `T`\>(`type`, `listener`, `element?`, `options?`): `void`

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `K`  | extends keyof `HTMLElementEventMap`                             |
| `T`  | extends `Window` \| `Document` \| `HTMLElement` = `HTMLElement` |

#### Parameters

| Name       | Type                                                     |
| :--------- | :------------------------------------------------------- |
| `type`     | `K`                                                      |
| `listener` | (`this`: `T`, `ev`: `HTMLElementEventMap`[`K`]) => `any` |
| `element`  | `T`                                                      |
| `options`  | `AddEventListenerOptions`                                |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[safeListener](/docs/base/#safelistener)

#### Defined in

[src/package/base/index.ts:96](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L96)

### swapContent

▸ **swapContent**(`revert?`, `delay?`): `void`

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

| Name     | Type      | Default value | Description                    |
| :------- | :-------- | :------------ | :----------------------------- |
| `revert` | `boolean` | `true`        | Swap back to old content       |
| `delay`  | `number`  | `800`         | Wait time before swapping back |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[swapContent](/docs/base/#swapcontent)

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L72)

### triggerListener

▸ **triggerListener**\<`T`, `K`\>(`listener`, `type?`): `void`

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends `HTMLElement`               |
| `K`  | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name       | Type                                                     | Description                                          |
| :--------- | :------------------------------------------------------- | :--------------------------------------------------- |
| `listener` | (`this`: `T`, `ev`: `HTMLElementEventMap`[`K`]) => `any` | Listener to attach to all of the `trigger` elements. |
| `type`     | `K`                                                      | -                                                    |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:113](https://github.com/rossrobino/components/blob/a5378fb/src/package/base/index.ts#L113)
