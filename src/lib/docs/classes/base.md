The `Base` class provides the `trigger` and `content` methods for
selecting elements via HTML attributes along with other helpers for
each custom element in the library.

Set a `trigger` or `content` attribute to a CSS selector to change the
default selector from `[data-trigger]` and `[data-content]`.

---

## Hierarchy

- `HTMLElement`

  ↳ **`Base`**

  ↳↳ [`Animate`](/docs/classes/Animate.md)

  ↳↳ [`Fullscreen`](/docs/classes/Fullscreen.md)

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

[src/package/base/index.ts:16](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L16)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when
when the element is removed.

#### Defined in

[src/package/base/index.ts:14](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L14)

---

## Accessors

### triggerEvent

• `get` **triggerEvent**(): keyof `HTMLElementEventMap`

Event for the trigger to execute.

#### Returns

keyof `HTMLElementEventMap`

**`Default`**

```ts
"click";
```

#### Defined in

[src/package/base/index.ts:25](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L25)

• `set` **triggerEvent**(`value`): `void`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `value` | keyof `HTMLElementEventMap` |

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L30)

---

## Methods

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

#### Defined in

[src/package/base/index.ts:52](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L52)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/base/index.ts:77](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L77)

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

#### Defined in

[src/package/base/index.ts:68](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L68)

### trigger

▸ **trigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

```ts
this.querySelectorAll("[data-trigger]");
```

#### Defined in

[src/package/base/index.ts:38](https://github.com/rossrobino/components/blob/c8d936f/src/package/base/index.ts#L38)
