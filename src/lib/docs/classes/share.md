Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) to share a url. If `share` is not supported, falls back to copy the text instead.

---

## Hierarchy

- `BaseCopy`

  ↳ **`Share`**

---

## Constructors

### constructor

• **new Share**(): [`Share`](/docs/share/)

#### Returns

[`Share`](/docs/share/)

#### Overrides

BaseCopy.constructor

#### Defined in

[src/package/share/index.ts:10](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/share/index.ts#L10)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

BaseCopy.#listenerController

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L17)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L30)

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

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L34)

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

[src/package/base/copy/index.ts:13](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/copy/index.ts#L13)

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

[src/package/base/copy/index.ts:17](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/copy/index.ts#L17)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.connectedCallback

#### Defined in

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L152)

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

[src/package/base/copy/index.ts:25](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/copy/index.ts#L25)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

BaseCopy.destroy

#### Defined in

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L159)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.disconnectedCallback

#### Defined in

[src/package/base/index.ts:161](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L161)

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

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L55)

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

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

#### Returns

`void`

#### Overrides

BaseCopy.mount

#### Defined in

[src/package/share/index.ts:35](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/share/index.ts#L35)

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

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L118)

### share

▸ **share**(`url?`): `Promise`\<`void`\>

Shares or copies the `value`.

#### Parameters

| Name  | Type     | Description                                  |
| :---- | :------- | :------------------------------------------- |
| `url` | `string` | The `url` to share, defaults to `this.value` |

#### Returns

`Promise`\<`void`\>

An object containing a `result` - whether the `url` was copied or shared
depending on browser support.

#### Defined in

[src/package/share/index.ts:20](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/share/index.ts#L20)

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

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L72)

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

BaseCopy.triggerListener

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/faf99b1bd566f2d71aa6e002e12c21647e78f138/src/package/base/index.ts#L135)
