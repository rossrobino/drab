Provides animations for the Popover API.

The Popover API is not currently support in FireFox. [See the latest browser compatibility on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility).

This component can be deprecated once it can be animated with CSS only, this
is currently [only available in Chrome](https://developer.chrome.com/blog/introducing-popover-api#interactive_entry_and_exit).

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

src/package/popover/index.ts:12

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Animate](/docs/animate/).[#listenerController](/docs/animate/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L18)

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

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/8302597/src/package/animate/index.ts#L32)

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

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L35)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:111](https://github.com/rossrobino/components/blob/8302597/src/package/animate/index.ts#L111)

### open

• `get` **open**(): `boolean`

Whether the popover is open or closed. This doesn't get set
automatically on the element like with the `HTMLDialogElement`.

#### Returns

`boolean`

#### Defined in

src/package/popover/index.ts:20

• `set` **open**(`value`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

src/package/popover/index.ts:24

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

[src/package/animate/index.ts:62](https://github.com/rossrobino/components/blob/8302597/src/package/animate/index.ts#L62)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

src/package/popover/index.ts:54

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

[Animate](/docs/animate/).[content](/docs/animate/#content)

#### Defined in

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[disconnectedCallback](/docs/animate/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:112](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L112)

### hidePopover

▸ **hidePopover**(): `Promise`\<`void`\>

`HTMLElement.hidePopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Overrides

[Animate](/docs/animate/).[hidePopover](/docs/animate/#hidepopover)

#### Defined in

src/package/popover/index.ts:39

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

[Animate](/docs/animate/).[safeListener](/docs/animate/#safelistener)

#### Defined in

[src/package/base/index.ts:94](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L94)

### showPopover

▸ **showPopover**(): `Promise`\<`void`\>

`HTMLElement.showPopover()` with animation.

#### Returns

`Promise`\<`void`\>

#### Overrides

[Animate](/docs/animate/).[showPopover](/docs/animate/#showpopover)

#### Defined in

src/package/popover/index.ts:33

### swap

▸ **swap**(`revert?`, `delay?`): `void`

Finds the `HTMLTemplateElement` via the `swap` selector and
swaps `this.content().innerHTML` with the content of the template.

#### Parameters

| Name     | Type      | Default value | Description                    |
| :------- | :-------- | :------------ | :----------------------------- |
| `revert` | `boolean` | `true`        | swap back to old content       |
| `delay`  | `number`  | `800`         | wait time before swapping back |

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[swap](/docs/animate/#swap)

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L74)

### toggle

▸ **toggle**(): `Promise`\<`void`\>

`showPopover` or `hidePopover` depending on the current state.

#### Returns

`Promise`\<`void`\>

#### Defined in

src/package/popover/index.ts:49

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

[Animate](/docs/animate/).[trigger](/docs/animate/#trigger)

#### Defined in

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L43)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[triggerListener](/docs/animate/#triggerlistener)

#### Defined in

[src/package/base/index.ts:106](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L106)
