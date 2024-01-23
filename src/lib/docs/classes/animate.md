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

- [`Base`](/docs/base/)

  ↳ **`Animate`**

  ↳↳ [`Details`](/docs/details/)

  ↳↳ [`Dialog`](/docs/dialog/)

  ↳↳ [`Popover`](/docs/popover/)

---

## Constructors

### constructor

• **new Animate**(): [`Animate`](/docs/animate/)

#### Returns

[`Animate`](/docs/animate/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/animate/index.ts:25](https://github.com/rossrobino/components/blob/0af6c6c/src/package/animate/index.ts#L25)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L18)

---

## Accessors

### animationOptions

• `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Defined in

[src/package/animate/index.ts:32](https://github.com/rossrobino/components/blob/0af6c6c/src/package/animate/index.ts#L32)

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

Base.event

#### Defined in

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L35)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Defined in

[src/package/animate/index.ts:111](https://github.com/rossrobino/components/blob/0af6c6c/src/package/animate/index.ts#L111)

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

#### Defined in

[src/package/animate/index.ts:62](https://github.com/rossrobino/components/blob/0af6c6c/src/package/animate/index.ts#L62)

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

[Base](/docs/base/).[content](/docs/base/#content)

#### Defined in

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:117](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L117)

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

[Base](/docs/base/).[safeListener](/docs/base/#safelistener)

#### Defined in

[src/package/base/index.ts:94](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L94)

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

[Base](/docs/base/).[swap](/docs/base/#swap)

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L74)

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

[Base](/docs/base/).[trigger](/docs/base/#trigger)

#### Defined in

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L43)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:111](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L111)
