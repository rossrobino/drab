Each element in the library extends the `Base` class. It provides methods
for selecting elements via HTML attributes along with other helpers.

By default, `trigger`s and `content` will be selected via the `data-trigger` and
`data-content` attributes. Alternatively, you can set the `trigger` or
`content` attribute to a CSS selector to change the default selector from
`[data-trigger]` or `[data-content]` to a selector of your choosing.
This can be useful if you have multiple elements within one another.

Each element can have multiple `trigger`s, but will only have one `content`.

---

## Hierarchy

- `HTMLElement`

  ↳ **`Base`**

  ↳↳ [`Animate`](/docs/animate/)

  ↳↳ [`Breakpoint`](/docs/breakpoint/)

  ↳↳ [`Editor`](/docs/editor/)

  ↳↳ [`Fullscreen`](/docs/fullscreen/)

  ↳↳ [`Prefetch`](/docs/prefetch/)

  ↳↳ [`TableSort`](/docs/tablesort/)

  ↳↳ [`WakeLock`](/docs/wakelock/)

  ↳↳ [`YouTube`](/docs/youtube/)

---

## Constructors

### constructor

• **new Base**(): [`Base`](/docs/base/)

#### Returns

[`Base`](/docs/base/)

#### Overrides

HTMLElement.constructor

#### Defined in

[src/package/base/index.ts:19](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L19)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L17)

---

## Accessors

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

#### Defined in

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L30)

• `set` **event**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L34)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:151](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L151)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:158](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L158)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:160](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L160)

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

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L55)

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

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:149](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L149)

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

#### Defined in

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L118)

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

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L72)

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

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/d08c324/src/package/base/index.ts#L135)
