Provides animations for the Popover API.

The Popover API is not currently support in FireFox. [See the latest browser compatibility on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility).

This component can be deprecated once it can be animated with CSS only,
currently [only available in Chrome](https://developer.chrome.com/blog/introducing-popover-api#interactive_entry_and_exit).

---

## Hierarchy

- [`Animate`](/docs/animate/)

  ↳ **`Popover`**

---

## Constructors

### constructor

• **new Popover**(): [`Popover`](/docs/popover/)

#### Returns

[`Popover`](/docs/popover/)

#### Overrides

[Animate](/docs/animate/).[constructor](/docs/animate/#constructor)

#### Defined in

[src/package/popover/index.ts:15](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L15)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Animate](/docs/animate/).[#listenerController](/docs/animate/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L17)

---

## Accessors

### animationOptions

• `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Inherited from

Animate.animationOptions

#### Defined in

[src/package/animate/index.ts:46](https://github.com/rossrobino/components/blob/6c33e7e/src/package/animate/index.ts#L46)

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

Animate.event

#### Defined in

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L30)

• `set` **event**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Inherited from

Animate.event

#### Defined in

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L34)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:128](https://github.com/rossrobino/components/blob/6c33e7e/src/package/animate/index.ts#L128)

### open

• `get` **open**(): `boolean`

Whether the popover is open or closed. This doesn't get set
automatically on the element like with the `HTMLDialogElement`.

#### Returns

`boolean`

#### Defined in

[src/package/popover/index.ts:23](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L23)

• `set` **open**(`value`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/package/popover/index.ts:27](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L27)

---

## Methods

### animateElement

▸ **animateElement**(`animateOptions?`): `Promise`\<`void`\>

#### Parameters

| Name                      | Type                       | Description                          |
| :------------------------ | :------------------------- | :----------------------------------- |
| `animateOptions`          | `Object`                   | animates `this.content()` by default |
| `animateOptions.element?` | `HTMLElement`              | -                                    |
| `animateOptions.options?` | `KeyframeAnimationOptions` | -                                    |

#### Returns

`Promise`\<`void`\>

**`Description`**

Animates a particular element using the web animations API.

- Disables animation if the user prefers reduced motion.
- Sets default options
- Uses the keyframes provided from `this.keyframes`
- Waits for the animation to complete
- Sets the start and end styles based on the first and last keyframe

#### Inherited from

[Animate](/docs/animate/).[animateElement](/docs/animate/#animateelement)

#### Defined in

[src/package/animate/index.ts:76](https://github.com/rossrobino/components/blob/6c33e7e/src/package/animate/index.ts#L76)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[connectedCallback](/docs/animate/#connectedcallback)

#### Defined in

[src/package/base/index.ts:129](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L129)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[disconnectedCallback](/docs/animate/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:133](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L133)

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

[Animate](/docs/animate/).[getContent](/docs/animate/#getcontent)

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L55)

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

[Animate](/docs/animate/).[getTrigger](/docs/animate/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L42)

### hide

▸ **hide**(): `Promise`\<`void`\>

`HTMLElement.hidePopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/popover/index.ts:42](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L42)

### mount

▸ **mount**(): `void`

Placeholder function is passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Animate](/docs/animate/).[mount](/docs/animate/#mount)

#### Defined in

[src/package/popover/index.ts:57](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L57)

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

[Animate](/docs/animate/).[safeListener](/docs/animate/#safelistener)

#### Defined in

[src/package/base/index.ts:96](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L96)

### show

▸ **show**(): `Promise`\<`void`\>

`HTMLElement.showPopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/popover/index.ts:36](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L36)

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

[Animate](/docs/animate/).[swapContent](/docs/animate/#swapcontent)

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L72)

### toggle

▸ **toggle**(): `Promise`\<`void`\>

`show` or `hide` depending on the current state.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/popover/index.ts:52](https://github.com/rossrobino/components/blob/6c33e7e/src/package/popover/index.ts#L52)

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

[Animate](/docs/animate/).[triggerListener](/docs/animate/#triggerlistener)

#### Defined in

[src/package/base/index.ts:113](https://github.com/rossrobino/components/blob/6c33e7e/src/package/base/index.ts#L113)
