Wrap a `HTMLTableElement` in the `TableSort` element to have sortable column
headers. Set each `th` that you want to sort to the `trigger`. Set the `tbody`
element to the `content`.

The values of each cell default to the cell's `textContent`. If you would like to
provide an alternate value than what appears in the cell to sort by instead,
you can set a different value using the `data-value` attribute on the cell.

The cells will be sorted as `string` by default. If you want to provide a different
datatype `number` or `boolean`, set `data-type="number"` on the corresponding
`th`/`trigger` element. The data will be converted to the specified type before sorting.

---

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`TableSort`**

---

## Constructors

### constructor

• **new TableSort**(): [`TableSort`](/docs/tablesort/)

#### Returns

[`TableSort`](/docs/tablesort/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/tablesort/index.ts:17](https://github.com/rossrobino/components/blob/0af6c6c/src/package/tablesort/index.ts#L17)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:18](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L18)

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

Base.event

#### Defined in

[src/package/base/index.ts:31](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L31)

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

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L35)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/tablesort/index.ts:21](https://github.com/rossrobino/components/blob/0af6c6c/src/package/tablesort/index.ts#L21)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:117](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L117)

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

[src/package/base/index.ts:94](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L94)

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

[Base](/docs/base/).[swap](/docs/base/#swap)

#### Defined in

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L74)

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

[src/package/base/index.ts:43](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L43)

### triggerListener

▸ **triggerListener**(`listener`): `void`

#### Parameters

| Name       | Type            | Description                                          |
| :--------- | :-------------- | :--------------------------------------------------- |
| `listener` | `EventListener` | Listener to attach to all of the `trigger` elements. |

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:111](https://github.com/rossrobino/components/blob/0af6c6c/src/package/base/index.ts#L111)
