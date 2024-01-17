## Description

Provides triggers and animations for the `HTMLDialogElement`.

---

## Hierarchy

- `Animate`

  ↳ **`Dialog`**

---

## Constructors

### constructor

• **new Dialog**(): [`Dialog`](/docs/classes/Dialog.md)

#### Returns

[`Dialog`](/docs/classes/Dialog.md)

#### Overrides

Animate.constructor

#### Defined in

[src/package/elements/dialog/index.ts:9](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L9)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

Animate.#listenerController

#### Defined in

[src/package/elements/base/index.ts:6](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L6)

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

[src/package/elements/base/animate/index.ts:12](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/animate/index.ts#L12)

### dialog

• `get` **dialog**(): `Element` & `HTMLDialogElement`

#### Returns

`Element` & `HTMLDialogElement`

#### Defined in

[src/package/elements/dialog/index.ts:13](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L13)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/elements/base/animate/index.ts:88](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/animate/index.ts#L88)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Inherited from

Animate.triggerEvent

#### Defined in

[src/package/elements/base/index.ts:12](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L12)

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

[src/package/elements/base/index.ts:17](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L17)

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

Animate.animateElement

#### Defined in

[src/package/elements/base/animate/index.ts:43](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/animate/index.ts#L43)

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/elements/dialog/index.ts:22](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L22)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/elements/dialog/index.ts:34](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L34)

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

`this.querySelector("[data-content]")`

#### Inherited from

Animate.content

#### Defined in

[src/package/elements/base/index.ts:38](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

Animate.disconnectedCallback

#### Defined in

[src/package/elements/base/index.ts:61](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L61)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Wrapper around `document.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up

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

Animate.safeAddEventListener

#### Defined in

[src/package/elements/base/index.ts:52](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L52)

### showModal

▸ **showModal**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/elements/dialog/index.ts:17](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L17)

### toggle

▸ **toggle**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/elements/dialog/index.ts:29](https://github.com/rossrobino/components/blob/1925528/src/package/elements/dialog/index.ts#L29)

### trigger

▸ **trigger**(): `NodeListOf`\<`Element`\>

#### Returns

`NodeListOf`\<`Element`\>

All of the elements that match the `trigger` selector.

**`Default`**

`this.querySelectorAll("[data-trigger]")`

#### Inherited from

Animate.trigger

#### Defined in

[src/package/elements/base/index.ts:25](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L25)
