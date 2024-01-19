Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

---

## Hierarchy

- [`Base`](/docs/classes/Base.md)

  ↳ **`YouTube`**

---

## Constructors

### constructor

• **new YouTube**(): [`YouTube`](/docs/classes/YouTube.md)

#### Returns

[`YouTube`](/docs/classes/YouTube.md)

#### Overrides

[Base](/docs/classes/Base.md).[constructor](/docs/classes/Base.md#constructor)

#### Defined in

[src/package/youtube/index.ts:9](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L9)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Base](/docs/classes/Base.md).[#listenerController](/docs/classes/Base.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:6](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L6)

### observedAttributes

▪ `Static` **observedAttributes**: readonly [``"autoplay"``, ``"start"``, ``"uid"``]

#### Defined in

[src/package/youtube/index.ts:7](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L7)

---

## Accessors

### autoplay

• `get` **autoplay**(): `boolean`

Whether the video should start playing when loaded.

#### Returns

`boolean`

#### Defined in

[src/package/youtube/index.ts:19](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L19)

• `set` **autoplay**(`value`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:23](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L23)

### iframe

• `get` **iframe**(): `Element` & `HTMLIFrameElement`

The `HTMLIFrameElement` within the element.

#### Returns

`Element` & `HTMLIFrameElement`

#### Defined in

[src/package/youtube/index.ts:14](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L14)

### start

• `get` **start**(): `string`

The start time of the video (seconds).

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:29](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L29)

• `set` **start**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:33](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L33)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Inherited from

Base.triggerEvent

#### Defined in

[src/package/base/index.ts:12](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L12)

• `set` **triggerEvent**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Inherited from

Base.triggerEvent

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L17)

### uid

• `get` **uid**(): `string`

The video's YouTube uid, found within the url of the video.

For example if the video url is https://youtu.be/gouiY85kD2o,
the `uid` is `"gouiY85kD2o"`.

#### Returns

`string`

#### Defined in

[src/package/youtube/index.ts:43](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L43)

• `set` **uid**(`v`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `string` |

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:49](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L49)

---

## Methods

### attributeChangedCallback

▸ **attributeChangedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:59](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L59)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/youtube/index.ts:53](https://github.com/rossrobino/components/blob/630574a/src/package/youtube/index.ts#L53)

### content

▸ **content**\<`T`\>(`instance`): `null` \| `Element` & `T`

#### Type parameters

| Name | Type          |
| :--- | :------------ |
| `T`  | `HTMLElement` |

#### Parameters

| Name                 | Type      | Description                                                  |
| :------------------- | :-------- | :----------------------------------------------------------- |
| `instance`           | () => `T` | The instance of the desired element, ex: `HTMLDialogElement` |
| `instance.prototype` | `T`       | -                                                            |

#### Returns

`null` \| `Element` & `T`

The element that matches the `content` selector.

**`Default`**

```ts
this.querySelector("[data-content]");
```

#### Inherited from

[Base](/docs/classes/Base.md).[content](/docs/classes/Base.md#content)

#### Defined in

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[disconnectedCallback](/docs/classes/Base.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:61](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L61)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Wrapper around `document.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

| Name | Type                             |
| :--- | :------------------------------- |
| `K`  | extends keyof `DocumentEventMap` |

#### Parameters

| Name       | Type                                                         |
| :--------- | :----------------------------------------------------------- |
| `type`     | `K`                                                          |
| `listener` | (`this`: `Document`, `ev`: `DocumentEventMap`[`K`]) => `any` |
| `options`  | `AddEventListenerOptions`                                    |

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[safeAddEventListener](/docs/classes/Base.md#safeaddeventlistener)

#### Defined in

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L52)

### trigger

▸ **trigger**(): `NodeListOf`\<`Element`\>

#### Returns

`NodeListOf`\<`Element`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[Base](/docs/classes/Base.md).[trigger](/docs/classes/Base.md#trigger)

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/630574a/src/package/base/index.ts#L25)
