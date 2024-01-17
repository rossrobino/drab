Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

---

## Attributes

- `autoplay` - auto-plays the video
- `start` - start time (seconds)
- `uid` - unique YouTube id found in the url

---

## Hierarchy

- `Base`

  ↳ **`YouTube`**

---

## Constructors

### constructor

• **new YouTube**(): [`YouTube`](/docs/classes/YouTube.md)

#### Returns

[`YouTube`](/docs/classes/YouTube.md)

#### Overrides

Base.constructor

#### Defined in

[src/package/elements/youtube/index.ts:13](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L13)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

Base.#listenerController

#### Defined in

[src/package/elements/base/index.ts:6](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L6)

---

## Accessors

### autoplay

• `get` **autoplay**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/package/elements/youtube/index.ts:21](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L21)

• `set` **autoplay**(`v`): `void`

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `v`  | `boolean` |

#### Returns

`void`

#### Defined in

[src/package/elements/youtube/index.ts:25](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L25)

### iframe

• `get` **iframe**(): `Element` & `HTMLIFrameElement`

#### Returns

`Element` & `HTMLIFrameElement`

#### Defined in

[src/package/elements/youtube/index.ts:17](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L17)

### src

• `get` **src**(): `string`

#### Returns

`string`

#### Defined in

[src/package/elements/youtube/index.ts:48](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L48)

### start

• `get` **start**(): `string`

#### Returns

`string`

#### Defined in

[src/package/elements/youtube/index.ts:40](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L40)

• `set` **start**(`v`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `string` |

#### Returns

`void`

#### Defined in

[src/package/elements/youtube/index.ts:44](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L44)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Inherited from

Base.triggerEvent

#### Defined in

[src/package/elements/base/index.ts:12](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L12)

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

[src/package/elements/base/index.ts:17](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L17)

### uid

• `get` **uid**(): `string`

#### Returns

`string`

#### Defined in

[src/package/elements/youtube/index.ts:30](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L30)

• `set` **uid**(`v`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `string` |

#### Returns

`void`

#### Defined in

[src/package/elements/youtube/index.ts:36](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L36)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/elements/youtube/index.ts:56](https://github.com/rossrobino/components/blob/1925528/src/package/elements/youtube/index.ts#L56)

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

`this.querySelector("[data-content]")`

#### Inherited from

Base.content

#### Defined in

[src/package/elements/base/index.ts:38](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

Base.disconnectedCallback

#### Defined in

[src/package/elements/base/index.ts:61](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L61)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Wrapper around `document.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up

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

Base.safeAddEventListener

#### Defined in

[src/package/elements/base/index.ts:52](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L52)

### trigger

▸ **trigger**(): `NodeListOf`\<`Element`\>

#### Returns

`NodeListOf`\<`Element`\>

All of the elements that match the `trigger` selector.

**`Default`**

`this.querySelectorAll("[data-trigger]")`

#### Inherited from

Base.trigger

#### Defined in

[src/package/elements/base/index.ts:25](https://github.com/rossrobino/components/blob/1925528/src/package/elements/base/index.ts#L25)
