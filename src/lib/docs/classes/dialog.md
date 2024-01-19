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

[src/package/dialog/index.ts:7](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L7)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Animate](/docs/classes/Animate.md).[#listenerController](/docs/classes/Animate.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:6](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L6)

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

[src/package/animate/index.ts:12](https://github.com/rossrobino/components/blob/630574a/src/package/animate/index.ts#L12)

### dialog

• `get` **dialog**(): `Element` & `HTMLDialogElement`

The `HTMLDialogElement` within the element.

#### Returns

`Element` & `HTMLDialogElement`

#### Defined in

[src/package/dialog/index.ts:12](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L12)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:88](https://github.com/rossrobino/components/blob/630574a/src/package/animate/index.ts#L88)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Inherited from

Animate.triggerEvent

#### Defined in

[src/package/base/index.ts:12](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L12)

• `set` **triggerEvent**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Inherited from

Animate.triggerEvent

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L17)

---

## Methods

### animateElement

▸ **animateElement**(`element`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name      | Type                       |
| :-------- | :------------------------- |
| `element` | `HTMLElement`              |
| `options` | `KeyframeAnimationOptions` |

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

[src/package/animate/index.ts:43](https://github.com/rossrobino/components/blob/630574a/src/package/animate/index.ts#L43)

### close

▸ **close**(): `Promise`\<`void`\>

`HTMLDialogElement.close()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:23](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L23)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/dialog/index.ts:36](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L36)

### content

▸ **content**\<`T`\>(`instance`): `null` \| `Element` & `T`

#### Type parameters

| Name | Type          |
| :--- | :------------ |
| `T`  | `HTMLElement` |

#### Parameters

| Name                 | Type      | Description                                                  |
| :------------------- | :-------- | :----------------------------------------------------------- |
| `instance`           | () => `T` | The instance of the desired element, ex: `HTMLDialogElement` |
| `instance.prototype` | `T`       | -                                                            |

#### Returns

`null` \| `Element` & `T`

The element that matches the `content` selector.

**`Default`**

```ts
this.querySelector("[data-content]");
```

#### Inherited from

[Animate](/docs/classes/Animate.md).[content](/docs/classes/Animate.md#content)

#### Defined in

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/classes/Animate.md).[disconnectedCallback](/docs/classes/Animate.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:61](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L61)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Wrapper around `document.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

| Name | Type                             |
| :--- | :------------------------------- |
| `K`  | extends keyof `DocumentEventMap` |

#### Parameters

| Name       | Type                                                         |
| :--------- | :----------------------------------------------------------- |
| `type`     | `K`                                                          |
| `listener` | (`this`: `Document`, `ev`: `DocumentEventMap`[`K`]) => `any` |
| `options`  | `AddEventListenerOptions`                                    |

#### Returns

`void`

#### Inherited from

[Animate](/docs/classes/Animate.md).[safeAddEventListener](/docs/classes/Animate.md#safeaddeventlistener)

#### Defined in

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L52)

### showModal

▸ **showModal**(): `Promise`\<`void`\>

`HTMLDialogElement.showModal()` with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:17](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L17)

### toggle

▸ **toggle**(): `Promise`\<`void`\>

`showModal` or `close` depending on the dialog's `open` attribute.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/dialog/index.ts:31](https://github.com/rossrobino/components/blob/630574a/src/package/dialog/index.ts#L31)

### trigger

▸ **trigger**(): `NodeListOf`\<`Element`\>

#### Returns

`NodeListOf`\<`Element`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Animate](/docs/classes/Animate.md).[trigger](/docs/classes/Animate.md#trigger)

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L25)
