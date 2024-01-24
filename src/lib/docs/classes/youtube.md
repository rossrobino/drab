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

[src/package/youtube/index.ts:9](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L9)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L18)

### observedAttributes

▪ `Static` **observedAttributes**: readonly [``"autoplay"``, ``"start"``, ``"uid"``]

#### Defined in

[src/package/youtube/index.ts:7](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L7)

---

## Accessors

### autoplay

• `get` **autoplay**(): `boolean`

Whether the video should start playing when loaded.

#### Returns

`boolean`

#### Defined in

[src/package/youtube/index.ts:19](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L19)

• `set` **autoplay**(`value`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:23](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L23)

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

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L35)

### iframe

• `get` **iframe**(): `HTMLIFrameElement`

The `HTMLIFrameElement` within the element.

#### Returns

`HTMLIFrameElement`

#### Defined in

[src/package/youtube/index.ts:14](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L14)

### start

• `get` **start**(): `string`

The start time of the video (seconds).

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:29](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L29)

• `set` **start**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:33](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L33)

### uid

• `get` **uid**(): `string`

The video's YouTube uid, found within the url of the video.

For example if the video url is https://youtu.be/gouiY85kD2o,
the `uid` is `"gouiY85kD2o"`.

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:43](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L43)

• `set` **uid**(`v`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:49](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L49)

---

## Methods

### attributeChangedCallback

▸ **attributeChangedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:59](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L59)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:53](https://github.com/rossrobino/components/blob/14dac44/src/package/youtube/index.ts#L53)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:124](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L124)

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

[src/package/base/index.ts:98](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L98)

### swap

▸ **swap**(`revert?`, `delay?`): `void`

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

[Base](/docs/base/).[swap](/docs/base/#swap)

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L74)

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

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L43)

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

[src/package/base/index.ts:115](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L115)
