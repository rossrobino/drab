The `Animate` base class provides a declarative way to use the
[Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
through HTML attributes. The `animateElement` method uses these attributes and
persists the final animation state. Other elements in **drab** extend this class
to provide animations. You can also extend this class to create your own custom
animated element.

Keyframes can be set via HTML attributes on the element in the form of:

```html
<drab-animate animation-keyframe-offset-property="value"></drab-animate>
```

`offset` can be `to`, `from`, or a `number`.

`property` can be any animatable CSS property separated by dashes.

Animations `options` can be set:

```html
<drab-animate animation-option-property="value"></drab-animate>
```

`property` can be `duration`, `delay`, or `easing`.

---

## Extends

- [`Base`](/docs/base/)

---

## Extended by

- [`ContextMenu`](/docs/contextmenu/)
- [`Details`](/docs/details/)
- [`Dialog`](/docs/dialog/)
- [`Popover`](/docs/popover/)

---

## Constructors

### new Animate()

> **new Animate**(): [`Animate`](/docs/animate/)

#### Returns

[`Animate`](/docs/animate/)

#### Overrides

[`Base`](/docs/base/).[`constructor`](/docs/base/#constructors)

#### Source

[src/package/animate/index.ts:39](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L39)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Base`](/docs/base/).[`#listenerController`](/docs/base/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L17)

---

## Accessors

### animationOptions

> `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Source

[src/package/animate/index.ts:46](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L46)

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

#### Description

Animates a particular element using the web animations API.

- Disables animation if the user prefers reduced motion.
- Sets default options
- Uses the keyframes provided from `this.keyframes`
- Waits for the animation to complete
- Sets the start and end styles based on the first and last keyframe

#### Source

[src/package/animate/index.ts:76](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/animate/index.ts#L76)

### connectedCallback()

> **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`connectedCallback`](/docs/base/#connectedcallback)

#### Source

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L152)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`destroy`](/docs/base/#destroy)

#### Source

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L159)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`disconnectedCallback`](/docs/base/#disconnectedcallback)

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

[`Base`](/docs/base/).[`getContent`](/docs/base/#getcontent)

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

[`Base`](/docs/base/).[`getTrigger`](/docs/base/#gettrigger)

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

#### Inherited from

[`Base`](/docs/base/).[`mount`](/docs/base/#mount)

#### Source

[src/package/base/index.ts:150](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L150)

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

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L118)

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

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L72)

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

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/13acb4ddbdca1f70bfc20fffda57758e606a2f95/src/package/base/index.ts#L135)
