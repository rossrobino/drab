This element provides a progressive enhancement on top of the `HTMLDetailsElement` to
animate it with the Web Animations API.

The best way I've found to animate the details element is using CSS grid from this
[Kevin Powell video](https://youtu.be/B_n4YONte5A?t=116). The example demonstrates
this animation. If you know the exact height of the content, you could animate `height`
instead.

---

## Hierarchy

- [`Animate`](/docs/animate/)

  ↳ **`Details`**

---

## Constructors

### constructor

• **new Details**(): [`Details`](/docs/details/)

#### Returns

[`Details`](/docs/details/)

#### Overrides

[Animate](/docs/animate/).[constructor](/docs/animate/#constructor)

#### Defined in

[src/package/details/index.ts:13](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L13)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Animate](/docs/animate/).[#listenerController](/docs/animate/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L18)

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

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/14dac44/src/package/animate/index.ts#L32)

### details

• `get` **details**(): `HTMLDetailsElement`

#### Returns

`HTMLDetailsElement`

#### Defined in

[src/package/details/index.ts:17](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L17)

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

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L35)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:111](https://github.com/rossrobino/components/blob/14dac44/src/package/animate/index.ts#L111)

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

[src/package/animate/index.ts:62](https://github.com/rossrobino/components/blob/14dac44/src/package/animate/index.ts#L62)

### close

▸ **close**(): `Promise`\<`void`\>

Closes details with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:30](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L30)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:45](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L45)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[disconnectedCallback](/docs/animate/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:124](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L124)

### open

▸ **open**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:24](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L24)

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

[src/package/base/index.ts:98](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L98)

### swap

▸ **swap**(`revert?`, `delay?`): `void`

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

[Animate](/docs/animate/).[swap](/docs/animate/#swap)

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L74)

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:37](https://github.com/rossrobino/components/blob/14dac44/src/package/details/index.ts#L37)

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

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L43)

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

[src/package/base/index.ts:115](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L115)