Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
to copy text.

---

## Hierarchy

- `BaseCopy`

  ↳ **`Copy`**

---

## Constructors

### constructor

• **new Copy**(): [`Copy`](/docs/classes/Copy.md)

#### Returns

[`Copy`](/docs/classes/Copy.md)

#### Overrides

BaseCopy.constructor

#### Defined in

[src/package/copy/index.ts:8](https://github.com/rossrobino/components/blob/8918ae1/src/package/copy/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Inherited from

BaseCopy.#listenerController

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L14)

---

## Accessors

### complete

• `get` **complete**(): `string`

Optional text to display when copy is complete.

#### Returns

`string`

#### Inherited from

BaseCopy.complete

#### Defined in

src/package/base/copy/index.ts:22

• `set` **complete**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

BaseCopy.complete

#### Defined in

src/package/base/copy/index.ts:26

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

BaseCopy.triggerEvent

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L25)

• `set` **triggerEvent**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Inherited from

BaseCopy.triggerEvent

#### Defined in

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L30)

### value

• `get` **value**(): `string`

#### Returns

`string`

**`Default`**

```ts
"" the empty string
```

#### Inherited from

BaseCopy.value

#### Defined in

src/package/base/copy/index.ts:11

• `set` **value**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

BaseCopy.value

#### Defined in

src/package/base/copy/index.ts:15

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/copy/index.ts:12](https://github.com/rossrobino/components/blob/8918ae1/src/package/copy/index.ts#L12)

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

BaseCopy.content

#### Defined in

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L52)

### copy

▸ **copy**(`text?`): `Promise`\<`void`\>

Copies the `text`.

#### Parameters

| Name   | Type     | Description         |
| :----- | :------- | :------------------ |
| `text` | `string` | The `text` to share |

#### Returns

`Promise`\<`void`\>

#### Inherited from

BaseCopy.copy

#### Defined in

src/package/base/copy/index.ts:34

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.disconnectedCallback

#### Defined in

[src/package/base/index.ts:77](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L77)

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

BaseCopy.safeAddEventListener

#### Defined in

[src/package/base/index.ts:68](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L68)

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

BaseCopy.trigger

#### Defined in

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/8918ae1/src/package/base/index.ts#L38)
