Provides animations for the Popover API.

This component can be deprecated once it can be animated with CSS only,
currently [only available in Chrome](https://developer.chrome.com/blog/introducing-popover-api#interactive_entry_and_exit).

---

## Extends

- [`Animate`](/docs/animate/)

---

## Constructors

### new Popover()

> **new Popover**(): [`Popover`](/docs/popover/)

#### Returns

[`Popover`](/docs/popover/)

#### Overrides

[`Animate`](/docs/animate/).[`constructor`](/docs/animate/#constructors)

#### Source

[src/package/popover/index.ts:13](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L13)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Animate`](/docs/animate/).[`#listenerController`](/docs/animate/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L17)

---

## Accessors

### animationOptions

> `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Source

[src/package/animate/index.ts:46](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/animate/index.ts#L46)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L30)

### keyframes

> `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Source

[src/package/animate/index.ts:128](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/animate/index.ts#L128)

### open

> `get` **open**(): `boolean`

Whether the popover is open or closed. This doesn't get set
automatically on the element like with the `HTMLDialogElement`.

> `set` **open**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/package/popover/index.ts:21](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L21)

---

## Methods

### animateElement()

> **animateElement**(`animateOptions`): `Promise`\<`void`\>

#### Parameters

• **animateOptions**= `undefined`

animates `this.content()` by default

• **animateOptions.element?**: `HTMLElement`

• **animateOptions.options?**: `KeyframeAnimationOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Animate`](/docs/animate/).[`animateElement`](/docs/animate/#animateelement)

#### Description

Animates a particular element using the web animations API.

- Disables animation if the user prefers reduced motion.
- Sets default options
- Uses the keyframes provided from `this.keyframes`
- Waits for the animation to complete
- Sets the start and end styles based on the first and last keyframe

#### Source

[src/package/animate/index.ts:76](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/animate/index.ts#L76)

### connectedCallback()

> **connectedCallback**(): `void`

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`connectedCallback`](/docs/animate/#connectedcallback)

#### Source

[src/package/base/index.ts:155](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L155)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`destroy`](/docs/animate/#destroy)

#### Source

[src/package/base/index.ts:162](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L162)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`disconnectedCallback`](/docs/animate/#disconnectedcallback)

#### Source

[src/package/base/index.ts:167](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L167)

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

[`Animate`](/docs/animate/).[`getContent`](/docs/animate/#getcontent)

#### Default

```ts
this.querySelector("[data-content]");
```

#### Source

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L55)

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Inherited from

[`Animate`](/docs/animate/).[`getTrigger`](/docs/animate/#gettrigger)

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Source

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L42)

### hide()

> **hide**(): `Promise`\<`void`\>

`HTMLElement.hidePopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/popover/index.ts:41](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L41)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Animate`](/docs/animate/).[`mount`](/docs/animate/#mount)

#### Source

[src/package/popover/index.ts:57](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L57)

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

[`Animate`](/docs/animate/).[`safeListener`](/docs/animate/#safelistener)

#### Source

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L118)

### show()

> **show**(): `Promise`\<`void`\>

`HTMLElement.showPopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/popover/index.ts:34](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L34)

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

[`Animate`](/docs/animate/).[`swapContent`](/docs/animate/#swapcontent)

#### Source

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L72)

### toggle()

> **toggle**(): `Promise`\<`void`\>

`show` or `hide` depending on the current state.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/popover/index.ts:52](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/popover/index.ts#L52)

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

[`Animate`](/docs/animate/).[`triggerListener`](/docs/animate/#triggerlistener)

#### Source

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/48c98b10e173fadbab032543d3a85f26875ed206/src/package/base/index.ts#L135)
