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

Animations options can also be set:

```html
<drab-animate animation-option-property="value"></drab-animate>
```

---

## Hierarchy

- [`Animate`](/docs/classes/Animate.md)

  ↳ **`Details`**

---

## Constructors

### constructor

• **new Details**(): [`Details`](/docs/classes/Details.md)

#### Returns

[`Details`](/docs/classes/Details.md)

#### Overrides

[Animate](/docs/classes/Animate.md).[constructor](/docs/classes/Animate.md#constructor)

#### Defined in

[src/package/details/index.ts:4](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L4)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Animate](/docs/classes/Animate.md).[#listenerController](/docs/classes/Animate.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L14)

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

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/8918ae1/src/package/animate/index.ts#L32)

### details

• `get` **details**(): `HTMLDetailsElement`

#### Returns

`HTMLDetailsElement`

#### Defined in

[src/package/details/index.ts:8](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L8)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:108](https://github.com/rossrobino/components/blob/8918ae1/src/package/animate/index.ts#L108)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

Event for the trigger to execute.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Inherited from

Animate.triggerEvent

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L25)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L30)

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

[src/package/animate/index.ts:63](https://github.com/rossrobino/components/blob/8918ae1/src/package/animate/index.ts#L63)

### close

▸ **close**(): `Promise`\<`void`\>

Closes details with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:21](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L21)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:36](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L36)

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

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L52)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/classes/Animate.md).[disconnectedCallback](/docs/classes/Animate.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:77](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L77)

### open

▸ **open**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:15](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L15)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

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

[Animate](/docs/classes/Animate.md).[safeAddEventListener](/docs/classes/Animate.md#safeaddeventlistener)

#### Defined in

[src/package/base/index.ts:68](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L68)

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:28](https://github.com/rossrobino/components/blob/8918ae1/src/package/details/index.ts#L28)

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

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L38)
