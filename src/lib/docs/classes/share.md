Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
to share a `url`.

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

[src/package/share/index.ts:8](https://github.com/rossrobino/components/blob/8302597/src/package/share/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

BaseCopy.#listenerController

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L18)

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

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L35)

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

[src/package/base/copy/index.ts:11](https://github.com/rossrobino/components/blob/8302597/src/package/base/copy/index.ts#L11)

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

[src/package/base/copy/index.ts:15](https://github.com/rossrobino/components/blob/8302597/src/package/base/copy/index.ts#L15)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/share/index.ts:33](https://github.com/rossrobino/components/blob/8302597/src/package/share/index.ts#L33)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L57)

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

[src/package/base/copy/index.ts:23](https://github.com/rossrobino/components/blob/8302597/src/package/base/copy/index.ts#L23)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.disconnectedCallback

#### Defined in

[src/package/base/index.ts:112](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L112)

### safeListener

▸ **safeListener**\<`K`\>(`type`, `listener`, `options?`): `void`

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

BaseCopy.safeListener

#### Defined in

[src/package/base/index.ts:94](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L94)

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

[src/package/share/index.ts:18](https://github.com/rossrobino/components/blob/8302597/src/package/share/index.ts#L18)

### swap

▸ **swap**(`revert?`, `delay?`): `void`

Finds the `HTMLTemplateElement` via the `swap` selector and
swaps `this.content().innerHTML` with the content of the template.

#### Parameters

| Name     | Type      | Default value | Description                    |
| :------- | :-------- | :------------ | :----------------------------- |
| `revert` | `boolean` | `true`        | swap back to old content       |
| `delay`  | `number`  | `800`         | wait time before swapping back |

#### Returns

`void`

#### Inherited from

BaseCopy.swap

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L74)

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

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L43)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

BaseCopy.triggerListener

#### Defined in

[src/package/base/index.ts:106](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L106)
