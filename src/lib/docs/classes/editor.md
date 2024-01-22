The `Base` class provides the `trigger` and `content` methods for
selecting elements via HTML attributes along with other helpers for
each custom element in the library.

Set a `trigger` or `content` attribute to a CSS selector to change the
default selector from `[data-trigger]` and `[data-content]`.

---

## Hierarchy

- [`Base`](/docs/classes/Base.md)

  ↳ **`Editor`**

---

## Constructors

### constructor

• **new Editor**(): [`Editor`](/docs/classes/Editor.md)

#### Returns

[`Editor`](/docs/classes/Editor.md)

#### Overrides

[Base](/docs/classes/Base.md).[constructor](/docs/classes/Base.md#constructor)

#### Defined in

src/package/editor/index.ts:13

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Base](/docs/classes/Base.md).[#listenerController](/docs/classes/Base.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L14)

### #openChars

• `Private` **#openChars**: `string`[] = `[]`

Array of keyPair characters that have been opened.

#### Defined in

src/package/editor/index.ts:11

---

## Accessors

### #contentElements

• `get` **#contentElements**(): `ContentElement`[]

#### Returns

`ContentElement`[]

#### Defined in

src/package/editor/index.ts:60

### #currentBlock

• `get` **#currentBlock**(): `number`

- splits the content by "```" and finds the current index
  of the selectionStart

@returns current codeblock (index) of selectionStart

#### Returns

`number`

#### Defined in

src/package/editor/index.ts:74

### #selectionEnd

• `get` **#selectionEnd**(): `number`

#### Returns

`number`

#### Defined in

src/package/editor/index.ts:90

### #selectionStart

• `get` **#selectionStart**(): `number`

#### Returns

`number`

#### Defined in

src/package/editor/index.ts:94

### event

• `get` **event**(): keyof `HTMLElementEventMap`

Event for the `trigger` to execute.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Inherited from

Base.event

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L25)

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

[src/package/base/index.ts:29](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L29)

### keyPairs

• `get` **keyPairs**(): `Object`

#### Returns

`Object`

#### Defined in

src/package/editor/index.ts:29

### text

• `get` **text**(): `string`

#### Returns

`string`

#### Defined in

src/package/editor/index.ts:21

• `set` **text**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

src/package/editor/index.ts:25

### textArea

• `get` **textArea**(): `HTMLTextAreaElement`

#### Returns

`HTMLTextAreaElement`

#### Defined in

src/package/editor/index.ts:17

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

src/package/editor/index.ts:184

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

src/package/editor/index.ts:268

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

src/package/editor/index.ts:53

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

src/package/editor/index.ts:226

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

src/package/editor/index.ts:199

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

src/package/editor/index.ts:106

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

src/package/editor/index.ts:148

### #setSelectionRange

▸ **#setSelectionRange**(`start`, `end`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `start` | `number` |
| `end`   | `number` |

#### Returns

`void`

#### Defined in

src/package/editor/index.ts:86

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

src/package/editor/index.ts:295

### content

▸ **content**\<`T`\>(`instance?`): `T`

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

[Base](/docs/classes/Base.md).[content](/docs/classes/Base.md#content)

#### Defined in

[src/package/base/index.ts:51](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L51)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[disconnectedCallback](/docs/classes/Base.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:85](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L85)

### safeListener

▸ **safeListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `K`  | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name       | Type                                                               |
| :--------- | :----------------------------------------------------------------- |
| `type`     | `K`                                                                |
| `listener` | (`this`: `HTMLElement`, `ev`: `HTMLElementEventMap`[`K`]) => `any` |
| `options`  | `AddEventListenerOptions`                                          |

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[safeListener](/docs/classes/Base.md#safelistener)

#### Defined in

[src/package/base/index.ts:67](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L67)

### trigger

▸ **trigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Base](/docs/classes/Base.md).[trigger](/docs/classes/Base.md#trigger)

#### Defined in

[src/package/base/index.ts:37](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L37)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[triggerListener](/docs/classes/Base.md#triggerlistener)

#### Defined in

[src/package/base/index.ts:79](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L79)
