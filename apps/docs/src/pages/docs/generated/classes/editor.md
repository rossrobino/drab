Defined in: [editor/index.ts:54](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L54)

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
- `tab` key will indent or dedent (+shift) instead of focus change if the selection is within a code block (three backticks).
- When text is highlighted and a `wrap` character `keyPair` is typed, the highlighted text will be wrapped with the character instead of removing it. For example, if a word is highlighted and the `"` character is typed, the work will be surrounded by `"`s.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Editor**(): `Editor`

Defined in: [editor/index.ts:73](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L73)

#### Returns

`Editor`

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructor)

## Properties

<a id="keypairs"></a>

### keyPairs

> **keyPairs**: `Record`\<`string`, `string`\>

Defined in: [editor/index.ts:64](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L64)

Characters that will be automatically closed when typed.

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:42](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L42)

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

Defined in: [base/index.ts:46](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L46)

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

Defined in: [editor/index.ts:88](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L88)

The current `value` of the `textarea`.

##### Returns

`string`

#### Set Signature

> **set** **text**(`value`): `void`

Defined in: [editor/index.ts:92](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L92)

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

Defined in: [editor/index.ts:83](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L83)

The `content`, expects an `HTMLTextAreaElement`.

##### Returns

`HTMLTextAreaElement`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [base/index.ts:53](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L53)

#### Parameters

##### message

`string`

message to announce to screen readers

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`announce`](/elements/base/#announce)

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:186](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L186)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:193](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L193)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:196](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L196)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:73](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L73)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

##### instance

() => `T`

The instance of the desired element to validate against,
ex: `HTMLDialogElement`. Defaults to `HTMLElement`.

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

Defined in: [base/index.ts:61](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L61)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement` = `HTMLElement`

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

Defined in: [editor/index.ts:287](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L287)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:137](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L137)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### element?

`HTMLElement`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `document`, `options?`): `void`

Defined in: [base/index.ts:143](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L143)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `DocumentEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### document

`Document`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `window`, `options?`): `void`

Defined in: [base/index.ts:149](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L149)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `WindowEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### window

`Window`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:92](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L92)

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

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

Defined in: [base/index.ts:168](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L168)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement`

##### K

`K` _extends_ keyof `HTMLElementEventMap`

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
