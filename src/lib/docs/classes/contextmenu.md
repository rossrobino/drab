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

[src/package/contextmenu/index.ts:13](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L13)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Animate](/docs/animate/).[#listenerController](/docs/animate/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L17)

### #touchTimer

• `Private` **#touchTimer**: `undefined` \| `Timeout`

Tracks the long press duration on mobile.

#### Defined in

[src/package/contextmenu/index.ts:11](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L11)

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

[src/package/contextmenu/index.ts:18](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L18)

### animationOptions

• `get` **animationOptions**(): `KeyframeAnimationOptions`

#### Returns

`KeyframeAnimationOptions`

An object containing the values of each `animation-option` attribute

#### Inherited from

Animate.animationOptions

#### Defined in

[src/package/animate/index.ts:46](https://github.com/rossrobino/components/blob/78ddbac/src/package/animate/index.ts#L46)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L30)

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

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L34)

### keyframes

• `get` **keyframes**(): `Keyframe`[]

#### Returns

`Keyframe`[]

#### Inherited from

Animate.keyframes

#### Defined in

[src/package/animate/index.ts:128](https://github.com/rossrobino/components/blob/78ddbac/src/package/animate/index.ts#L128)

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

[src/package/animate/index.ts:76](https://github.com/rossrobino/components/blob/78ddbac/src/package/animate/index.ts#L76)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[connectedCallback](/docs/animate/#connectedcallback)

#### Defined in

[src/package/base/index.ts:151](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L151)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[destroy](/docs/animate/#destroy)

#### Defined in

[src/package/base/index.ts:158](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L158)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[disconnectedCallback](/docs/animate/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:160](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L160)

### getContent

▸ **getContent**\<`T`\>(`instance?`): `T`

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

[Animate](/docs/animate/).[getContent](/docs/animate/#getcontent)

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L55)

### getTrigger

▸ **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `T`  | extends `HTMLElement` = `HTMLElement` |

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Animate](/docs/animate/).[getTrigger](/docs/animate/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L42)

### hide

▸ **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/contextmenu/index.ts:57](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L57)

### mount

▸ **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Animate](/docs/animate/).[mount](/docs/animate/#mount)

#### Defined in

[src/package/contextmenu/index.ts:66](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L66)

### safeListener

▸ **safeListener**\<`K`, `T`\>(`type`, `listener`, `element?`, `options?`): `void`

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `K`  | extends keyof `DocumentEventMap`                                |
| `T`  | extends `Window` \| `Document` \| `HTMLElement` = `HTMLElement` |

#### Parameters

| Name       | Type                                                  |
| :--------- | :---------------------------------------------------- |
| `type`     | `K`                                                   |
| `listener` | (`this`: `T`, `ev`: `DocumentEventMap`[`K`]) => `any` |
| `element`  | `T`                                                   |
| `options`  | `AddEventListenerOptions`                             |

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[safeListener](/docs/animate/#safelistener)

#### Defined in

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L118)

### show

▸ **show**(`e`): `Promise`\<`void`\>

#### Parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `e`  | `MouseEvent` \| `TouchEvent` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/contextmenu/index.ts:23](https://github.com/rossrobino/components/blob/78ddbac/src/package/contextmenu/index.ts#L23)

### swapContent

▸ **swapContent**(`revert?`, `delay?`): `void`

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

[Animate](/docs/animate/).[swapContent](/docs/animate/#swapcontent)

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L72)

### triggerListener

▸ **triggerListener**\<`T`, `K`\>(`listener`, `type?`): `void`

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends `HTMLElement`               |
| `K`  | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name       | Type                                                    | Description                                          |
| :--------- | :------------------------------------------------------ | :--------------------------------------------------- |
| `listener` | (`this`: `T`, `e`: `HTMLElementEventMap`[`K`]) => `any` | Listener to attach to all of the `trigger` elements. |
| `type`     | `K`                                                     | -                                                    |

#### Returns

`void`

#### Inherited from

[Animate](/docs/animate/).[triggerListener](/docs/animate/#triggerlistener)

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L135)
