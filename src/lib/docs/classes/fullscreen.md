Toggles the `documentElement` or `content` element to fullscreen mode.

Disables the `trigger` if fullscreen is not supported.

---

## Hierarchy

- [`Base`](/docs/classes/Base.md)

  ↳ **`Fullscreen`**

---

## Constructors

### constructor

• **new Fullscreen**(): [`Fullscreen`](/docs/classes/Fullscreen.md)

#### Returns

[`Fullscreen`](/docs/classes/Fullscreen.md)

#### Overrides

[Base](/docs/classes/Base.md).[constructor](/docs/classes/Base.md#constructor)

#### Defined in

[src/package/fullscreen/index.ts:9](https://github.com/rossrobino/components/blob/3b25f8c/src/package/fullscreen/index.ts#L9)

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

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/fullscreen/index.ts:40](https://github.com/rossrobino/components/blob/3b25f8c/src/package/fullscreen/index.ts#L40)

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

### fullscreenSupported

▸ **fullscreenSupported**(): `boolean`

#### Returns

`boolean`

`true` if fullscreen is supported.

#### Defined in

[src/package/fullscreen/index.ts:23](https://github.com/rossrobino/components/blob/3b25f8c/src/package/fullscreen/index.ts#L23)

### isFullscreen

▸ **isFullscreen**(): `boolean`

#### Returns

`boolean`

`true` if fullscreen is currently enabled.

#### Defined in

[src/package/fullscreen/index.ts:16](https://github.com/rossrobino/components/blob/3b25f8c/src/package/fullscreen/index.ts#L16)

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

### toggle

▸ **toggle**(): `void`

Enables or disables fullscreen mode based on the current state.

#### Returns

`void`

#### Defined in

[src/package/fullscreen/index.ts:28](https://github.com/rossrobino/components/blob/3b25f8c/src/package/fullscreen/index.ts#L28)

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
