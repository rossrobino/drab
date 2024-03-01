Uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to add a `data-intersect` attribute to `content` when the `trigger` is intersecting.

Use `onIntersect` and `onExit` to customize further with JavaScript.

`threshold`

Specify a `threshold` between `0` and `1` to determine how much of the `trigger` should be visible for the intersection to occur.

---

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`Intersect`**

---

## Constructors

### constructor

• **new Intersect**(): [`Intersect`](/docs/intersect/)

#### Returns

[`Intersect`](/docs/intersect/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/intersect/index.ts:25](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L25)

---

## Properties

### #exitCallbacks

• `Private` **#exitCallbacks**: `IntersectCallback`[] = `[]`

Functions to run when the `trigger` exits.

#### Defined in

[src/package/intersect/index.ts:23](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L23)

### #intersectCallbacks

• `Private` **#intersectCallbacks**: `IntersectCallback`[] = `[]`

Functions to run when the `trigger` intersects.

#### Defined in

[src/package/intersect/index.ts:20](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L20)

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L17)

---

## Accessors

### #threshold

• `get` **#threshold**(): `number`

How much of the `trigger` should be visible for the intersection to occur. For example, given a threshold of `.5`, the intersection would occur when the `trigger` is 50% visible.

#### Returns

`number`

**`Default`**

```ts
0;
```

#### Defined in

[src/package/intersect/index.ts:34](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L34)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L30)

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

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L34)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[connectedCallback](/docs/base/#connectedcallback)

#### Defined in

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L152)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[destroy](/docs/base/#destroy)

#### Defined in

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L159)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:161](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L161)

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

[Base](/docs/base/).[getContent](/docs/base/#getcontent)

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L55)

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

[Base](/docs/base/).[getTrigger](/docs/base/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Base](/docs/base/).[mount](/docs/base/#mount)

#### Defined in

[src/package/intersect/index.ts:52](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L52)

### onExit

▸ **onExit**(`callback`): `void`

#### Parameters

| Name       | Type                | Description                |
| :--------- | :------------------ | :------------------------- |
| `callback` | `IntersectCallback` | Runs when `trigger` exits. |

#### Returns

`void`

#### Defined in

[src/package/intersect/index.ts:48](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L48)

### onIntersect

▸ **onIntersect**(`callback`): `void`

#### Parameters

| Name       | Type                | Description                     |
| :--------- | :------------------ | :------------------------------ |
| `callback` | `IntersectCallback` | Runs when `trigger` intersects. |

#### Returns

`void`

#### Defined in

[src/package/intersect/index.ts:41](https://github.com/rossrobino/components/blob/4320137/src/package/intersect/index.ts#L41)

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

[Base](/docs/base/).[safeListener](/docs/base/#safelistener)

#### Defined in

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L118)

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

[Base](/docs/base/).[swapContent](/docs/base/#swapcontent)

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L72)

### triggerListener

▸ **triggerListener**\<`T`, `K`\>(`listener`, `type?`, `options?`): `void`

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
| `options?` | `AddEventListenerOptions`                               | -                                                    |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/4320137/src/package/base/index.ts#L135)
