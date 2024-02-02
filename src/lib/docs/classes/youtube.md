Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

---

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`YouTube`**

---

## Constructors

### constructor

• **new YouTube**(): [`YouTube`](/docs/youtube/)

#### Returns

[`YouTube`](/docs/youtube/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/youtube/index.ts:12](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L12)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L17)

### observedAttributes

▪ `Static` **observedAttributes**: readonly [``"autoplay"``, ``"start"``, ``"uid"``]

#### Defined in

[src/package/youtube/index.ts:10](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L10)

---

## Accessors

### autoplay

• `get` **autoplay**(): `boolean`

Whether the video should start playing when loaded.

#### Returns

`boolean`

#### Defined in

[src/package/youtube/index.ts:22](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L22)

• `set` **autoplay**(`value`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:26](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L26)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L30)

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

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L34)

### iframe

• `get` **iframe**(): `HTMLIFrameElement`

The `HTMLIFrameElement` within the element.

#### Returns

`HTMLIFrameElement`

#### Defined in

[src/package/youtube/index.ts:17](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L17)

### start

• `get` **start**(): `string`

The start time of the video (seconds).

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:32](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L32)

• `set` **start**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:36](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L36)

### uid

• `get` **uid**(): `string`

The video's YouTube uid, found within the url of the video.

For example if the video url is https://youtu.be/gouiY85kD2o,
the `uid` is `"gouiY85kD2o"`.

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:46](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L46)

• `set` **uid**(`v`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:52](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L52)

---

## Methods

### attributeChangedCallback

▸ **attributeChangedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:62](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L62)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[connectedCallback](/docs/base/#connectedcallback)

#### Defined in

[src/package/base/index.ts:129](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L129)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:133](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L133)

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

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L55)

### getTrigger

▸ **getTrigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Base](/docs/base/).[getTrigger](/docs/base/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

Placeholder function is passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Base](/docs/base/).[mount](/docs/base/#mount)

#### Defined in

[src/package/youtube/index.ts:56](https://github.com/rossrobino/components/blob/d27153e/src/package/youtube/index.ts#L56)

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

[src/package/base/index.ts:96](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L96)

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

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L72)

### triggerListener

▸ **triggerListener**\<`T`, `K`\>(`listener`, `type?`): `void`

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `T`  | extends `HTMLElement`               |
| `K`  | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name       | Type                                                     | Description                                          |
| :--------- | :------------------------------------------------------- | :--------------------------------------------------- |
| `listener` | (`this`: `T`, `ev`: `HTMLElementEventMap`[`K`]) => `any` | Listener to attach to all of the `trigger` elements. |
| `type`     | `K`                                                      | -                                                    |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:113](https://github.com/rossrobino/components/blob/d27153e/src/package/base/index.ts#L113)
