Displays content when the `trigger` element is right clicked, or long pressed on mobile.

---

## Hierarchy

- [`Animate`](/docs/animate/)

  ↳ **`ContextMenu`**

---

## Constructors

### constructor

• **new ContextMenu**(): [`ContextMenu`](/docs/contextmenu/)

#### Returns

[`ContextMenu`](/docs/contextmenu/)

#### Overrides

[Animate](/docs/animate/).[constructor](/docs/animate/#constructor)

#### Defined in

[src/package/contextmenu/index.ts:10](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L10)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Animate](/docs/animate/).[#listenerController](/docs/animate/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L18)

### #touchTimer

• `Private` **#touchTimer**: `undefined` \| `Timeout`

Tracks the long press duration on mobile.

#### Defined in

[src/package/contextmenu/index.ts:8](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L8)

---

## Accessors

### #coordinates

• `set` **#coordinates**(`value`): `void`

Sets the context menu's `style.left` and `style.top` position.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `value`   | `Object` |
| `value.x` | `number` |
| `value.y` | `number` |

#### Returns

`void`

#### Defined in

[src/package/contextmenu/index.ts:15](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L15)

### animationOptions

• `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Inherited from

Animate.animationOptions

#### Defined in

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/14dac44/src/package/animate/index.ts#L32)

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

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/contextmenu/index.ts:61](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L61)

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

### hide

▸ **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/contextmenu/index.ts:54](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L54)

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

### show

▸ **show**(`e`): `Promise`\<`void`\>

#### Parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `e`  | `MouseEvent` \| `TouchEvent` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/contextmenu/index.ts:20](https://github.com/rossrobino/components/blob/14dac44/src/package/contextmenu/index.ts#L20)

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
