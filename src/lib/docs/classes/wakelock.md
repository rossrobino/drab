`WakeLock` uses the [WakeLock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) to ensure the screen does not turn off when viewing the page on supported devices. Use your best judgement for when this is necessary, for example, if you have a timer that needs to stay on, or you are displaying a QR code.

- WakeLock can be toggled with a `trigger`, or will be requested if the element has a `locked` attribute when connected.
- Use `content` and `swap` elements to adjust the UI based on the current state.
- `request` and `release` methods are provided to set the WakeLock with JavaScript.
- `trigger` is disabled if not supported.
- WakeLock is released when the element is removed from the DOM.

`auto-lock`

- By default, the WakeLock will be released when the tab is not active. Use the `auto-lock` attribute to automatically request the WakeLock when the user views the tab again.

---

## Hierarchy

- [`Base`](/docs/base/)

  ↳ **`WakeLock`**

---

## Constructors

### constructor

• **new WakeLock**(): [`WakeLock`](/docs/wakelock/)

#### Returns

[`WakeLock`](/docs/wakelock/)

#### Overrides

[Base](/docs/base/).[constructor](/docs/base/#constructor)

#### Defined in

[src/package/wakelock/index.ts:25](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L25)

---

## Properties

### #listenerController

• `Private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[Base](/docs/base/).[#listenerController](/docs/base/##listenercontroller)

#### Defined in

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L17)

### wakeLock

• **wakeLock**: `null` \| `WakeLockSentinel` = `null`

#### Defined in

[src/package/wakelock/index.ts:23](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L23)

---

## Accessors

### #autoLock

• `get` **#autoLock**(): `boolean`

the `auto-lock` attribute controls whether an active WakeLock should be restored when navigating back to the page.

#### Returns

`boolean`

#### Defined in

[src/package/wakelock/index.ts:37](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L37)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L30)

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

[src/package/base/index.ts:34](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L34)

---

## Methods

### #wakeLockSupported

▸ **#wakeLockSupported**(): `boolean`

If the WakeLock API is supported on the user's device.

#### Returns

`boolean`

#### Defined in

[src/package/wakelock/index.ts:30](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L30)

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[connectedCallback](/docs/base/#connectedcallback)

#### Defined in

[src/package/base/index.ts:151](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L151)

### destroy

▸ **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Overrides

[Base](/docs/base/).[destroy](/docs/base/#destroy)

#### Defined in

[src/package/wakelock/index.ts:105](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L105)

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[Base](/docs/base/).[disconnectedCallback](/docs/base/#disconnectedcallback)

#### Defined in

[src/package/base/index.ts:160](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L160)

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

[Base](/docs/base/).[getContent](/docs/base/#getcontent)

#### Defined in

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L55)

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

[Base](/docs/base/).[getTrigger](/docs/base/#gettrigger)

#### Defined in

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L42)

### mount

▸ **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[Base](/docs/base/).[mount](/docs/base/#mount)

#### Defined in

[src/package/wakelock/index.ts:67](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L67)

### release

▸ **release**(): `Promise`\<`void`\>

Releases the WakeLock, sets `this.wakeLock` to null.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/wakelock/index.ts:62](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L62)

### request

▸ **request**(): `Promise`\<`void`\>

Requests WakeLock on the current page.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/package/wakelock/index.ts:42](https://github.com/rossrobino/components/blob/1c302c1/src/package/wakelock/index.ts#L42)

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

[Base](/docs/base/).[safeListener](/docs/base/#safelistener)

#### Defined in

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L118)

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

[Base](/docs/base/).[swapContent](/docs/base/#swapcontent)

#### Defined in

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L72)

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

[Base](/docs/base/).[triggerListener](/docs/base/#triggerlistener)

#### Defined in

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/1c302c1/src/package/base/index.ts#L135)
