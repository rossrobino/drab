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

[src/package/copy/index.ts:8](https://github.com/rossrobino/components/blob/14dac44/src/package/copy/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

BaseCopy.#listenerController

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L18)

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

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L35)

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

[src/package/base/copy/index.ts:11](https://github.com/rossrobino/components/blob/14dac44/src/package/base/copy/index.ts#L11)

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

[src/package/base/copy/index.ts:15](https://github.com/rossrobino/components/blob/14dac44/src/package/base/copy/index.ts#L15)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/copy/index.ts:12](https://github.com/rossrobino/components/blob/14dac44/src/package/copy/index.ts#L12)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L57)

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

[src/package/base/copy/index.ts:23](https://github.com/rossrobino/components/blob/14dac44/src/package/base/copy/index.ts#L23)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

BaseCopy.disconnectedCallback

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

BaseCopy.safeListener

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

BaseCopy.swap

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

BaseCopy.trigger

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

BaseCopy.triggerListener

#### Defined in

[src/package/base/index.ts:115](https://github.com/rossrobino/components/blob/14dac44/src/package/base/index.ts#L115)