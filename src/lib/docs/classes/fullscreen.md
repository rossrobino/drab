Toggles the `documentElement` or `content` element to fullscreen mode.

Disables the `trigger` if fullscreen is not supported.

---

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`Fullscreen`**

---

## Constructors

### constructor

• **new Fullscreen**(): [`Fullscreen`](/docs/fullscreen/)

#### Returns

[`Fullscreen`](/docs/fullscreen/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/fullscreen/index.ts:9](https://github.com/rossrobino/components/blob/8302597/src/package/fullscreen/index.ts#L9)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

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

Base.event

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

Base.event

#### Defined in

[src/package/base/index.ts:35](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L35)

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

[src/package/fullscreen/index.ts:40](https://github.com/rossrobino/components/blob/8302597/src/package/fullscreen/index.ts#L40)

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

[src/package/base/index.ts:57](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L57)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:112](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L112)

### fullscreenSupported

▸ **fullscreenSupported**(): `boolean`

#### Returns

`boolean`

`true` if fullscreen is supported.

#### Defined in

[src/package/fullscreen/index.ts:23](https://github.com/rossrobino/components/blob/8302597/src/package/fullscreen/index.ts#L23)

### isFullscreen

▸ **isFullscreen**(): `boolean`

#### Returns

`boolean`

`true` if fullscreen is currently enabled.

#### Defined in

[src/package/fullscreen/index.ts:16](https://github.com/rossrobino/components/blob/8302597/src/package/fullscreen/index.ts#L16)

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

[Base](/docs/base/).[safeListener](/docs/base/#safelistener)

#### Defined in

[src/package/base/index.ts:94](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L94)

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

[src/package/base/index.ts:74](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L74)

### toggle

▸ **toggle**(): `void`

Enables or disables fullscreen mode based on the current state.

#### Returns

`void`

#### Defined in

[src/package/fullscreen/index.ts:28](https://github.com/rossrobino/components/blob/8302597/src/package/fullscreen/index.ts#L28)

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

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:106](https://github.com/rossrobino/components/blob/8302597/src/package/base/index.ts#L106)
