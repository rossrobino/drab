Provides triggers and animations for the `HTMLDialogElement`.

`click-outside-close`

By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
Add a `click-outside-close` attribute to close when the user clicks outside.

`remove-body-scroll`

Add the `remove-body-scroll` attribute to remove the scroll from `document.body` when the dialog
is open.

---

## Extends

- [`Animate`](/docs/animate/)

---

## Constructors

### new Dialog()

> **new Dialog**(): [`Dialog`](/docs/dialog/)

#### Returns

[`Dialog`](/docs/dialog/)

#### Overrides

[`Animate`](/docs/animate/).[`constructor`](/docs/animate/#constructors)

#### Source

[src/package/dialog/index.ts:22](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L22)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Animate`](/docs/animate/).[`#listenerController`](/docs/animate/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L17)

---

## Accessors

### #removeBodyScroll

> `get` `private` **#removeBodyScroll**(): `boolean`

Remove scroll from the body when open with the `remove-body-scroll` attribute.

#### Returns

`boolean`

#### Source

[src/package/dialog/index.ts:32](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L32)

### animationOptions

> `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Source

[src/package/animate/index.ts:46](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L46)

### dialog

> `get` **dialog**(): `HTMLDialogElement`

The `HTMLDialogElement` within the element.

#### Returns

`HTMLDialogElement`

#### Source

[src/package/dialog/index.ts:27](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L27)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L30)

### keyframes

> `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Source

[src/package/animate/index.ts:128](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L128)

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

[src/package/animate/index.ts:76](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L76)

### close()

> **close**(): `Promise`\<`void`\>

`HTMLDialogElement.close()` with animation.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/dialog/index.ts:48](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L48)

### connectedCallback()

> **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`connectedCallback`](/docs/animate/#connectedcallback)

#### Source

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L152)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`destroy`](/docs/animate/#destroy)

#### Source

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L159)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Animate`](/docs/animate/).[`disconnectedCallback`](/docs/animate/#disconnectedcallback)

#### Source

[src/package/base/index.ts:161](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L161)

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

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L55)

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

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Animate`](/docs/animate/).[`mount`](/docs/animate/#mount)

#### Source

[src/package/dialog/index.ts:68](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L68)

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

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L118)

### show()

> **show**(): `Promise`\<`void`\>

`HTMLDialogElement.showModal()` with animation.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/dialog/index.ts:37](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L37)

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

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L72)

### toggle()

> **toggle**(): `Promise`\<`void`\>

`show` or `close` depending on the dialog's `open` attribute.

#### Returns

`Promise`\<`void`\>

#### Source

[src/package/dialog/index.ts:63](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/dialog/index.ts#L63)

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

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L135)
