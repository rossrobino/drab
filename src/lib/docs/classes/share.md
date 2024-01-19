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

[src/package/share/index.ts:8](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

[Base](/docs/classes/Base.md).[#listenerController](/docs/classes/Base.md##listenercontroller)

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L14)

---

## Accessors

### complete

• `get` **complete**(): `string`

Optional text to display when copy is complete.

#### Returns

`string`

#### Defined in

[src/package/share/index.ts:28](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L28)

• `set` **complete**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:32](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L32)

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

Event for the trigger to execute.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Inherited from

Base.triggerEvent

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L25)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L30)

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

[src/package/share/index.ts:17](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L17)

• `set` **url**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:21](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L21)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:53](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L53)

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

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L52)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/classes/Base.md).[disconnectedCallback](/docs/classes/Base.md#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:77](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L77)

### safeAddEventListener

▸ **safeAddEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

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

[Base](/docs/classes/Base.md).[safeAddEventListener](/docs/classes/Base.md#safeaddeventlistener)

#### Defined in

[src/package/base/index.ts:68](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L68)

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

[src/package/share/index.ts:42](https://github.com/rossrobino/components/blob/3b25f8c/src/package/share/index.ts#L42)

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

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/3b25f8c/src/package/base/index.ts#L38)
