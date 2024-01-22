Provides triggers and animations for the `HTMLDialogElement`.

---

## Hierarchy

- [`Animate`](/docs/classes/Animate.md)

  ↳ **`Dialog`**

---

## Constructors

### constructor

• **new Dialog**(): [`Dialog`](/docs/classes/Dialog.md)

#### Returns

[`Dialog`](/docs/classes/Dialog.md)

#### Overrides

[Animate](/docs/classes/Animate.md).[constructor](/docs/classes/Animate.md#constructor)

#### Defined in

[src/package/dialog/index.ts:7](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L7)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Animate](/docs/classes/Animate.md).[#listenerController](/docs/classes/Animate.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L14)

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

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L32)

### dialog

• `get` **dialog**(): `HTMLDialogElement`

The `HTMLDialogElement` within the element.

#### Returns

`HTMLDialogElement`

#### Defined in

[src/package/dialog/index.ts:12](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L12)

### event

• `get` **event**(): keyof `HTMLElementEventMap`

Event for the `trigger` to execute.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Inherited from

Animate.event

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L25)

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

[src/package/base/index.ts:29](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L29)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:111](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L111)

---

## Methods

### animateElement

▸ **animateElement**(`animateOptions?`): `Promise`\<`void`\>

#### Parameters

| Name                      | Type                       |
| :------------------------ | :------------------------- |
| `animateOptions`          | `Object`                   |
| `animateOptions.element?` | `HTMLElement`              |
| `animateOptions.options?` | `KeyframeAnimationOptions` |

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

[Animate](/docs/classes/Animate.md).[animateElement](/docs/classes/Animate.md#animateelement)

#### Defined in

[src/package/animate/index.ts:62](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L62)

### close

▸ **close**(): `Promise`\<`void`\>

`HTMLDialogElement.close()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:23](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L23)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/dialog/index.ts:38](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L38)

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

[Animate](/docs/classes/Animate.md).[content](/docs/classes/Animate.md#content)

#### Defined in

[src/package/base/index.ts:51](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L51)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/classes/Animate.md).[disconnectedCallback](/docs/classes/Animate.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:85](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L85)

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

[Animate](/docs/classes/Animate.md).[safeListener](/docs/classes/Animate.md#safelistener)

#### Defined in

[src/package/base/index.ts:67](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L67)

### showModal

▸ **showModal**(): `Promise`\<`void`\>

`HTMLDialogElement.showModal()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:17](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L17)

### toggle

▸ **toggle**(): `Promise`\<`void`\>

`showModal` or `close` depending on the dialog's `open` attribute.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:33](https://github.com/rossrobino/components/blob/67914d8/src/package/dialog/index.ts#L33)

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

[Animate](/docs/classes/Animate.md).[trigger](/docs/classes/Animate.md#trigger)

#### Defined in

[src/package/base/index.ts:37](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L37)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

[Animate](/docs/classes/Animate.md).[triggerListener](/docs/classes/Animate.md#triggerlistener)

#### Defined in

[src/package/base/index.ts:79](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L79)
