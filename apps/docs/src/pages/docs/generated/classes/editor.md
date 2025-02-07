Defined in: [editor/index.ts:48](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L48)

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

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructors"></a>

### new Editor()

> **new Editor**(): [`Editor`](/elements/editor/)

Defined in: [editor/index.ts:62](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L62)

#### Returns

[`Editor`](/elements/editor/)

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructors)

## Properties

<a id="keypairs"></a>

### keyPairs

> **keyPairs**: `object`

Defined in: [editor/index.ts:53](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L53)

The characters that will be automatically closed when typed.

#### Index Signature

\[`key`: `string`\]: `string`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:36](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L36)

Event for the `trigger` to execute.

For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.

##### Default

```ts
"click";
```

##### Returns

keyof `HTMLElementEventMap`

#### Set Signature

> **set** **event**(`value`): `void`

Defined in: [base/index.ts:40](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L40)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`event`](/elements/base/#event)

---

<a id="text"></a>

### text

#### Get Signature

> **get** **text**(): `string`

Defined in: [editor/index.ts:79](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L79)

The current `value` of the `textarea`.

##### Returns

`string`

#### Set Signature

> **set** **text**(`value`): `void`

Defined in: [editor/index.ts:83](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L83)

##### Parameters

###### value

`string`

##### Returns

`void`

---

<a id="textarea"></a>

### textArea

#### Get Signature

> **get** **textArea**(): `HTMLTextAreaElement`

Defined in: [editor/index.ts:74](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L74)

The `content`, expects an `HTMLTextAreaElement`.

##### Returns

`HTMLTextAreaElement`

## Methods

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:158](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L158)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:165](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L165)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:170](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L170)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:61](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L61)

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

##### instance

() => `T`

The instance of the desired element, ex: `HTMLDialogElement`.
Defaults to `HTMLElement`.

#### Returns

`T`

The element that matches the `content` selector.

#### Default

```ts
this.querySelector("[data-content]");
```

#### Inherited from

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

---

<a id="gettrigger"></a>

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

Defined in: [base/index.ts:48](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L48)

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [editor/index.ts:337](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L337)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="safelistener"></a>

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Defined in: [base/index.ts:121](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L121)

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type Parameters

• **K** _extends_ keyof `DocumentEventMap`

• **T** _extends_ `HTMLElement` \| `Document` \| `Window` = `HTMLElement`

#### Parameters

##### type

`K`

##### listener

(`this`, `ev`) => `any`

##### element

`T` = `...`

##### options

`AddEventListenerOptions` = `{}`

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:78](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L78)

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

##### revert

Wait time (ms) before swapping back, set to `false` to not revert.
default: `800`

`number` | `false`

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`swapContent`](/elements/base/#swapcontent)

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

Defined in: [base/index.ts:138](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L138)

#### Type Parameters

• **T** _extends_ `HTMLElement`

• **K** _extends_ keyof `HTMLElementEventMap`

#### Parameters

##### listener

(`this`, `e`) => `any`

Listener to attach to all of the `trigger` elements.

##### type

`K` = `...`

##### options?

`AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`triggerListener`](/elements/base/#triggerlistener)
