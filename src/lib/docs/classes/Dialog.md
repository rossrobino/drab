Test

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

src/package/elements/dialog/index.ts:7

---

## Properties

### baseKeyframe

• `Private` **baseKeyframe**: `Keyframe`

#### Defined in

src/package/elements/dialog/index.ts:16

### modifiedKeyframe

• `Private` **modifiedKeyframe**: `Keyframe`

#### Defined in

src/package/elements/dialog/index.ts:18

---

## Accessors

### content

• `get` **content**(): `HTMLElement`

#### Returns

`HTMLElement`

The element that matches the `content` selector.

**`Default`**

`this.querySelector("[data-content]")`

#### Inherited from

Animate.content

#### Defined in

src/package/elements/base/index.ts:23

### dialog

• `get` **dialog**(): `HTMLDialogElement`

#### Returns

`HTMLDialogElement`

#### Defined in

src/package/elements/dialog/index.ts:11

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

src/package/elements/base/animate/index.ts:24

### trigger

• `get` **trigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

`this.querySelectorAll("[data-trigger]")`

#### Inherited from

Animate.trigger

#### Defined in

src/package/elements/base/index.ts:10

---

## Methods

### animateElement

▸ **animateElement**(`element`, `keyframes`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name        | Type                       |
| :---------- | :------------------------- |
| `element`   | `HTMLElement`              |
| `keyframes` | `Keyframe`[]               |
| `options`   | `KeyframeAnimationOptions` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

Animate.animateElement

#### Defined in

src/package/elements/base/animate/index.ts:9

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

src/package/elements/dialog/index.ts:30

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

src/package/elements/dialog/index.ts:43

### showModal

▸ **showModal**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

src/package/elements/dialog/index.ts:22

### toggle

▸ **toggle**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

src/package/elements/dialog/index.ts:38
