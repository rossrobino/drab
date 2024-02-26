Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
to copy text.

---

## Hierarchy

- `BaseCopy`

  ↳ **`Copy`**

---

## Constructors

### constructor

• **new Copy**(): [`Copy`](/docs/copy/)

#### Returns

[`Copy`](/docs/copy/)

#### Overrides

BaseCopy.constructor

#### Defined in

[src/package/copy/index.ts:11](https://github.com/rossrobino/components/blob/78ddbac/src/package/copy/index.ts#L11)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

BaseCopy.#listenerController

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L17)

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

#### Inherited from

BaseCopy.event

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

BaseCopy.event

#### Defined in

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L34)

### value

• `get` **value**(): `string`

The value to copy or share.

#### Returns

`string`

**`Default`**

```ts
"" the empty string
```

#### Inherited from

BaseCopy.value

#### Defined in

[src/package/base/copy/index.ts:13](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/copy/index.ts#L13)

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

[src/package/base/copy/index.ts:17](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/copy/index.ts#L17)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.connectedCallback

#### Defined in

[src/package/base/index.ts:151](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L151)

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

[src/package/base/copy/index.ts:25](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/copy/index.ts#L25)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

BaseCopy.destroy

#### Defined in

[src/package/base/index.ts:158](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L158)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.disconnectedCallback

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

BaseCopy.getContent

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

BaseCopy.getTrigger

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

#### Returns

`void`

#### Overrides

BaseCopy.mount

#### Defined in

[src/package/copy/index.ts:15](https://github.com/rossrobino/components/blob/78ddbac/src/package/copy/index.ts#L15)

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

BaseCopy.safeListener

#### Defined in

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L118)

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

BaseCopy.swapContent

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

BaseCopy.triggerListener

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/78ddbac/src/package/base/index.ts#L135)
