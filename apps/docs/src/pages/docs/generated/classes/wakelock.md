Defined in: [wakelock/index.ts:44](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L44)

`WakeLock` uses the
[WakeLock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
to ensure the screen does not turn off when viewing the page on supported devices.
Use your best judgement for when this is necessary, for example, if you have a timer
that needs to stay on, or you are displaying a QR code.

- Use `content` and `swap` elements to adjust the UI based on the current state.
- `trigger` is disabled if not supported.
- WakeLock is released when the element is removed from the DOM.

### Attributes

`auto-lock`

By default, the WakeLock will be released when the tab is not active. Use the
`auto-lock` attribute to automatically request the WakeLock when the user views
the tab again.

`locked`

WakeLock can be toggled with a `trigger`, or will be requested if the element has
a `locked` attribute when connected.

## Constructors

<a id="constructor"></a>

### Constructor

> **new WakeLock**(): `WakeLock`

Defined in: [wakelock/index.ts:47](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L47)

#### Returns

`WakeLock`

#### Overrides

`Lifecycle(Trigger(Content(Announce()))).constructor`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:120](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L120)

Event for the `trigger` to execute.

For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.

##### Default

```ts
"click";
```

##### Returns

keyof `HTMLElementEventMap`

#### Set Signature

> **set** **event**(`value`): `void`

Defined in: [base/index.ts:126](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L126)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).event`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [base/index.ts:287](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L287)

#### Parameters

##### message

`string`

message to announce to screen readers

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).announce`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:76](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L76)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).connectedCallback`

---

<a id="content"></a>

### content()

#### Call Signature

> **content**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:215](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L215)

##### Type Parameters

###### T

`T` _extends_ `HTMLElement`

##### Parameters

###### instance

`Constructor`\<`T`\>

The instance of the desired element to validate against,
ex: `HTMLDialogElement`. Defaults to `HTMLElement`.

##### Returns

`T`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).content`

#### Call Signature

> **content**(): `HTMLElement`

Defined in: [base/index.ts:216](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L216)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).content`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [wakelock/index.ts:130](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L130)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Overrides

`Lifecycle(Trigger(Content(Announce()))).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:86](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L86)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).disconnectedCallback`

---

<a id="listener"></a>

### listener()

#### Call Signature

> **listener**\<`T`\>(`listener`, `options?`): `void`

Defined in: [base/index.ts:152](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L152)

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### listener

`Listener`\<`T`\>

Listener to attach to all of the `trigger` elements.

###### options?

`AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).listener`

#### Call Signature

> **listener**\<`T`\>(`type`, `listener`, `options?`): `void`

Defined in: [base/index.ts:161](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L161)

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### type

`T`

Event type.

###### listener

`Listener`\<`T`\>

Listener to attach to all of the `trigger` elements.

###### options?

`AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).listener`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [wakelock/index.ts:92](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L92)

Passed into `queueMicrotask` in `connectedCallback`.
It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte.
For SSR this isn't necessary, but when client side rendering, the HTML within the
custom element isn't available before `connectedCallback` is called. By waiting until
the next microtask, the HTML content is available---then for example, listeners can
be attached to elements inside.

#### Returns

`void`

#### Overrides

`Lifecycle(Trigger(Content(Announce()))).mount`

---

<a id="release"></a>

### release()

> **release**(): `Promise`\<`void`\>

Defined in: [wakelock/index.ts:87](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L87)

Releases the WakeLock, sets `this.wakeLock` to null.

#### Returns

`Promise`\<`void`\>

---

<a id="request"></a>

### request()

> **request**(): `Promise`\<`void`\>

Defined in: [wakelock/index.ts:65](https://github.com/rossrobino/components/blob/main/packages/drab/src/wakelock/index.ts#L65)

Requests WakeLock on the current page.

#### Returns

`Promise`\<`void`\>

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:35](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L35)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### element?

`HTMLElement`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).safeListener`

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `document`, `options?`): `void`

Defined in: [base/index.ts:41](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L41)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `DocumentEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### document

`Document`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).safeListener`

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `window`, `options?`): `void`

Defined in: [base/index.ts:47](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L47)

Wrapper around `addEventListener` that ensures when the element is
removed from the DOM, these event listeners are cleaned up.

##### Type Parameters

###### T

`T` _extends_ keyof `WindowEventMap`

##### Parameters

###### type

`T`

Event listener type - ex: `"keydown"`

###### listener

(`this`, `event`) => `any`

Listener to add to the target.

###### window

`Window`

###### options?

`AddEventListenerOptions`

Other options sans `signal`.

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).safeListener`

---

<a id="swap"></a>

### swap()

> **swap**(`revert`): `void`

Defined in: [base/index.ts:231](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L231)

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

##### revert

Wait time (ms) before swapping back, set to `false` to not revert.
default: `800`

`number` | `false`

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).swap`

---

<a id="triggers"></a>

### triggers()

#### Call Signature

> **triggers**\<`T`\>(`instance`): `NodeListOf`\<`T`\>

Defined in: [base/index.ts:136](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L136)

##### Type Parameters

###### T

`T` _extends_ `HTMLElement`

##### Parameters

###### instance

`Constructor`\<`T`\>

The instance of the desired element to validate against,
ex: `HTMLButtonElement`. Defaults to `HTMLElement`.

##### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).triggers`

#### Call Signature

> **triggers**(): `NodeListOf`\<`HTMLElement`\>

Defined in: [base/index.ts:137](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L137)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).triggers`
