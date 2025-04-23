Defined in: [packages/drab/src/editor/index.ts:62](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L62)

Enhances the `textarea` element with controls to add content and keyboard shortcuts. Compared to other WYSIWYG editors, the `text` value is just a `string`, so you can easily store it in a database or manipulate it without learning a separate API.

- Automatically adds closing characters for `keyPairs`. For example, when
  typing `(`, `)` will be inserted and typed over when reached. All content
  with `data-type="wrap"` is also added to `keyPairs`.
- Highlights the first word of the text inserted if it contains letters.
- Automatically increments/decrements ordered lists.
- Adds the starting character to the next line for `block` content.
- On double click, highlight is corrected to only highlight the current word
  without space around it.
- `tab` key will indent or dedent (+shift) instead of focus change if the
  selection is within a code block (three backticks).
- When text is highlighted and a `wrap` character `keyPair` is typed, the
  highlighted text will be wrapped with the character instead of removing it.
  For example, if a word is highlighted and the `"` character is typed, the
  work will be surrounded by `"`s.

### Trigger attributes

`data-value`

Set the value of the text to be inserted using the `data-value` attribute on the `trigger`.

`data-type`

Set the `data-type` attribute of the `trigger` to specify how the content should be inserted into the `textarea`.

- `block` will be inserted at the beginning of the selected line.
- `wrap` will be inserted before and after the current selection.
- `inline` will be inserted at the current selection.

`data-key`

Add a `ctrl`/`meta` keyboard shortcut for the content based on the `data-key` attribute.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Editor**(): `Editor`

Defined in: [packages/drab/src/editor/index.ts:81](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L81)

#### Returns

`Editor`

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructor)

## Properties

<a id="keypairs"></a>

### keyPairs

> **keyPairs**: `Record`\<`string`, `string`\>

Defined in: [packages/drab/src/editor/index.ts:72](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L72)

Characters that will be automatically closed when typed.

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [packages/drab/src/base/index.ts:25](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L25)

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

Defined in: [packages/drab/src/base/index.ts:31](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L31)

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

Defined in: [packages/drab/src/editor/index.ts:96](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L96)

The current `value` of the `textarea`.

##### Returns

`string`

#### Set Signature

> **set** **text**(`value`): `void`

Defined in: [packages/drab/src/editor/index.ts:100](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L100)

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

Defined in: [packages/drab/src/editor/index.ts:91](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L91)

The `content`, expects an `HTMLTextAreaElement`.

##### Returns

`HTMLTextAreaElement`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [packages/drab/src/base/index.ts:224](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L224)

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

Defined in: [packages/drab/src/base/index.ts:193](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L193)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [packages/drab/src/base/index.ts:200](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L200)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [packages/drab/src/base/index.ts:203](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L203)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

#### Call Signature

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [packages/drab/src/base/index.ts:79](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L79)

##### Type Parameters

###### T

`T` _extends_ `HTMLElement`

##### Parameters

###### instance

`Constructor`\<`T`\>

The instance of the desired element to validate against,
ex: `HTMLDialogElement`. Defaults to `HTMLElement`.

##### Returns

`T`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

#### Call Signature

> **getContent**(): `HTMLElement`

Defined in: [packages/drab/src/base/index.ts:80](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L80)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

---

<a id="gettrigger"></a>

### getTrigger()

#### Call Signature

> **getTrigger**\<`T`\>(`instance`): `NodeListOf`\<`T`\>

Defined in: [packages/drab/src/base/index.ts:41](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L41)

##### Type Parameters

###### T

`T` _extends_ `HTMLElement`

##### Parameters

###### instance

`Constructor`\<`T`\>

The instance of the desired element to validate against,
ex: `HTMLButtonElement`. Defaults to `HTMLElement`.

##### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

#### Call Signature

> **getTrigger**(): `NodeListOf`\<`HTMLElement`\>

Defined in: [packages/drab/src/base/index.ts:42](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L42)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [packages/drab/src/editor/index.ts:295](https://github.com/rossrobino/components/blob/main/packages/drab/src/editor/index.ts#L295)

Passed into `queueMicrotask` in `connectedCallback`.
It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte.
For SSR this isn't necessary, but when client side rendering, the HTML within the
custom element isn't available before `connectedCallback` is called. By waiting until
the next microtask, the HTML content is available---then for example, listeners can
be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [packages/drab/src/base/index.ts:152](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L152)

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

Defined in: [packages/drab/src/base/index.ts:158](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L158)

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

Defined in: [packages/drab/src/base/index.ts:164](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L164)

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

Defined in: [packages/drab/src/base/index.ts:95](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L95)

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

Defined in: [packages/drab/src/base/index.ts:56](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L56)

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
