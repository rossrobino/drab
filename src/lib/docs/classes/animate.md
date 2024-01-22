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

- [`Base`](/docs/classes/Base.md)

  ↳ **`Animate`**

  ↳↳ [`Details`](/docs/classes/Details.md)

  ↳↳ [`Dialog`](/docs/classes/Dialog.md)

---

## Constructors

### constructor

• **new Animate**(): [`Animate`](/docs/classes/Animate.md)

#### Returns

[`Animate`](/docs/classes/Animate.md)

#### Overrides

[Base](/docs/classes/Base.md).[constructor](/docs/classes/Base.md#constructor)

#### Defined in

[src/package/animate/index.ts:25](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L25)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Base](/docs/classes/Base.md).[#listenerController](/docs/classes/Base.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L14)

---

## Accessors

### animationOptions

• `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Defined in

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L32)

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

Base.event

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

Base.event

#### Defined in

[src/package/base/index.ts:29](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L29)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

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

#### Defined in

[src/package/animate/index.ts:62](https://github.com/rossrobino/components/blob/67914d8/src/package/animate/index.ts#L62)

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

[Base](/docs/classes/Base.md).[content](/docs/classes/Base.md#content)

#### Defined in

[src/package/base/index.ts:51](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L51)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[disconnectedCallback](/docs/classes/Base.md#disconnectedcallback)

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

[Base](/docs/classes/Base.md).[safeListener](/docs/classes/Base.md#safelistener)

#### Defined in

[src/package/base/index.ts:67](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L67)

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

[Base](/docs/classes/Base.md).[trigger](/docs/classes/Base.md#trigger)

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

[Base](/docs/classes/Base.md).[triggerListener](/docs/classes/Base.md#triggerlistener)

#### Defined in

[src/package/base/index.ts:79](https://github.com/rossrobino/components/blob/67914d8/src/package/base/index.ts#L79)
