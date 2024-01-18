Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
to share a `url`.

---

## Hierarchy

- [`Base`](/docs/classes/Base.md)

  ↳ **`Share`**

---

## Constructors

### constructor

• **new Share**(): [`Share`](/docs/classes/Share.md)

#### Returns

[`Share`](/docs/classes/Share.md)

#### Overrides

[Base](/docs/classes/Base.md).[constructor](/docs/classes/Base.md#constructor)

#### Defined in

[src/package/share/index.ts:8](https://github.com/rossrobino/components/blob/c91c737/src/package/share/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Base](/docs/classes/Base.md).[#listenerController](/docs/classes/Base.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:6](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L6)

---

## Accessors

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Inherited from

Base.triggerEvent

#### Defined in

[src/package/base/index.ts:12](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L12)

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

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L17)

### url

• `get` **url**(): `string`

The `url` to share.

#### Returns

`string`

**`Default`**

```ts
window.location.href;
```

#### Defined in

[src/package/share/index.ts:17](https://github.com/rossrobino/components/blob/c91c737/src/package/share/index.ts#L17)

• `set` **url**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:21](https://github.com/rossrobino/components/blob/c91c737/src/package/share/index.ts#L21)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:42](https://github.com/rossrobino/components/blob/c91c737/src/package/share/index.ts#L42)

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

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[disconnectedCallback](/docs/classes/Base.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:61](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L61)

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

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L52)

### share

▸ **share**(`url?`): `Promise`\<\{ `result`: `"copy"` \| `"share"` }\>

Shares or copies the `url`.

#### Parameters

| Name  | Type     | Description        |
| :---- | :------- | :----------------- |
| `url` | `string` | The `url` to share |

#### Returns

`Promise`\<\{ `result`: `"copy"` \| `"share"` }\>

An object containing a `result` - whether the `url` was copied or shared
depending on browser support.

#### Defined in

[src/package/share/index.ts:31](https://github.com/rossrobino/components/blob/c91c737/src/package/share/index.ts#L31)

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

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/c91c737/src/package/base/index.ts#L25)
