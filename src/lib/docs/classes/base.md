Each element in the library extends the `Base` class. It provides methods
for selecting elements via HTML attributes along with other helpers.

By default, `trigger`s and `content` will be selected via the `data-trigger` and
`data-content` attributes. Alternatively, you can set the `trigger` or
`content` attribute to a CSS selector to change the default selector from
`[data-trigger]` or `[data-content]` to a selector of your choosing.
This can be useful if you have multiple elements within one another.

Each element can have multiple `trigger`s, but will only have one `content`.

---

## Extends

- `HTMLElement`

---

## Extended by

- [`Animate`](/docs/animate/)
- [`Breakpoint`](/docs/breakpoint/)
- [`Editor`](/docs/editor/)
- [`Fullscreen`](/docs/fullscreen/)
- [`Intersect`](/docs/intersect/)
- [`Prefetch`](/docs/prefetch/)
- [`TableSort`](/docs/tablesort/)
- [`WakeLock`](/docs/wakelock/)
- [`YouTube`](/docs/youtube/)

---

## Constructors

### new Base()

> **new Base**(): [`Base`](/docs/base/)

#### Returns

[`Base`](/docs/base/)

#### Overrides

`HTMLElement.constructor`

#### Source

[src/package/base/index.ts:19](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L19)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L17)

---

## Accessors

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L30)

---

## Methods

### connectedCallback()

> **connectedCallback**(): `void`

Called when custom element is added to the page.

#### Returns

`void`

#### Source

[src/package/base/index.ts:155](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L155)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Source

[src/package/base/index.ts:162](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L162)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Called when custom element is removed from the page.

#### Returns

`void`

#### Source

[src/package/base/index.ts:167](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L167)

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

#### Default

```ts
this.querySelector("[data-content]");
```

#### Source

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L55)

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Source

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Source

[src/package/base/index.ts:150](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L150)

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

#### Source

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L118)

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

#### Source

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L72)

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

#### Source

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L135)
