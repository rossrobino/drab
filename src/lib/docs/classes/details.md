This element provides a progressive enhancement on top of the `HTMLDetailsElement` to
animate it with the Web Animations API.

The best way I've found to animate the details element is using CSS grid from this
[Kevin Powell video](https://youtu.be/B_n4YONte5A?t=116). The example demonstrates
this animation. If you know the size of the details element, you could use height instead.

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

[src/package/details/index.ts:12](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L12)

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

### details

• `get` **details**(): `HTMLDetailsElement`

#### Returns

`HTMLDetailsElement`

#### Defined in

[src/package/details/index.ts:16](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L16)

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

Closes details with animation.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:29](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L29)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:44](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L44)

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

### open

▸ **open**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/details/index.ts:23](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L23)

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

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[src/package/details/index.ts:36](https://github.com/rossrobino/components/blob/67914d8/src/package/details/index.ts#L36)

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
