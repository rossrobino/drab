## Hierarchy

- `HTMLElement`

  ↳ **`Base`**

  ↳↳ [`Animate`](/docs/classes/Animate.md)

  ↳↳ [`Share`](/docs/classes/Share.md)

  ↳↳ [`YouTube`](/docs/classes/YouTube.md)

---

## Constructors

### constructor

• **new Base**(): [`Base`](/docs/classes/Base.md)

#### Returns

[`Base`](/docs/classes/Base.md)

#### Overrides

HTMLElement.constructor

#### Defined in

[src/package/base/index.ts:8](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L8)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Defined in

[src/package/base/index.ts:6](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L6)

---

## Accessors

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Defined in

[src/package/base/index.ts:12](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L12)

• `set` **triggerEvent**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L17)

---

## Methods

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

#### Defined in

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L38)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:61](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L61)

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

#### Defined in

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L52)

### trigger

▸ **trigger**(): `NodeListOf`\<`Element`\>

#### Returns

`NodeListOf`\<`Element`\>

All of the elements that match the `trigger` selector.

**`Default`**

`this.querySelectorAll("[data-trigger]")`

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/1e5c638/src/package/base/index.ts#L25)
