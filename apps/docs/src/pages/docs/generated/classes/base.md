Defined in: base/index.ts:13

Each element in the library extends the `Base` class. It provides methods
for selecting elements via HTML attributes along with other helpers.

By default, `trigger`s and `content` will be selected via the `data-trigger` and
`data-content` attributes. Alternatively, you can set the `trigger` or
`content` attribute to a CSS selector to change the default selector from
`[data-trigger]` or `[data-content]` to a selector of your choosing.
This can be useful if you have multiple elements within one another.

Each element can have multiple `trigger`s, but will only have one `content`.

## Extends

- `HTMLElement`

## Extended by

- [`Breakpoint`](/elements/breakpoint/)
- [`ContextMenu`](/elements/contextmenu/)
- [`Dialog`](/elements/dialog/)
- [`Editor`](/elements/editor/)
- [`Fullscreen`](/elements/fullscreen/)
- [`Intersect`](/elements/intersect/)
- [`Prefetch`](/elements/prefetch/)
- [`TableSort`](/elements/tablesort/)
- [`WakeLock`](/elements/wakelock/)
- [`YouTube`](/elements/youtube/)

## Constructors

<a id="constructors"></a>

### new Base()

> **new Base**(): [`Base`](/elements/base/)

Defined in: base/index.ts:19

#### Returns

[`Base`](/elements/base/)

#### Overrides

`HTMLElement.constructor`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: base/index.ts:30

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

Defined in: base/index.ts:34

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

## Methods

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: base/index.ts:152

Called when custom element is added to the page.

#### Returns

`void`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: base/index.ts:159

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: base/index.ts:164

Called when custom element is removed from the page.

#### Returns

`void`

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: base/index.ts:55

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

---

<a id="gettrigger"></a>

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

Defined in: base/index.ts:42

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: base/index.ts:147

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

---

<a id="safelistener"></a>

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Defined in: base/index.ts:115

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

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: base/index.ts:72

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

##### revert

Wait time (ms) before swapping back, set to `false` to not revert.
default: `800`

`number` | `false`

#### Returns

`void`

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

Defined in: base/index.ts:132

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
