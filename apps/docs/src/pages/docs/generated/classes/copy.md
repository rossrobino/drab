Defined in: [copy/index.ts:25](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L25)

Uses the
[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
to copy text.

### Attributes

`value`

Text to copy.

## Extends

- `Lifecycle`\<\{(...`args`): `Trigger`\<\{(...`args`): `Content`\<\{(...`args`): ...; `prototype`: ...; \} & `Constructor`\<...\>\>; `prototype`: `Content`\<`any`\>; \} & \{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>\>; `prototype`: `Trigger`\<`any`\>; \} & \{(...`args`): `Content`\<\{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & \{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Trigger`\<\{(...`args`): `Content`\<\{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & \{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Content`\<\{(...`args`): `Announce`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Announce`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Announce`\<`Constructor`\<`HTMLElement`\>, `this`\> & `HTMLElement`\<`this`\>

## Extended by

- [`Share`](/elements/share/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Copy**(): `Copy`

Defined in: [copy/index.ts:26](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L26)

#### Returns

`Copy`

#### Overrides

`Lifecycle(Trigger(Content(Announce()))).constructor`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:45](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L45)

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

Defined in: [base/index.ts:51](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L51)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).event`

---

<a id="value"></a>

### value

#### Get Signature

> **get** **value**(): `string`

Defined in: [copy/index.ts:35](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L35)

The value to copy.

##### Default

```ts
("");
```

##### Returns

`string`

#### Set Signature

> **set** **value**(`value`): `void`

Defined in: [copy/index.ts:39](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L39)

##### Parameters

###### value

`string`

##### Returns

`void`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [base/index.ts:258](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L258)

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

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

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

Defined in: [base/index.ts:109](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L109)

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

Defined in: [base/index.ts:110](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L110)

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

<a id="copy"></a>

### copy()

> **copy**(`value`): `Promise`\<`void`\>

Defined in: [copy/index.ts:46](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L46)

#### Parameters

##### value

`string` = `...`

The `value` to copy

#### Returns

`Promise`\<`void`\>

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:232](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L232)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:235](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L235)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).disconnectedCallback`

---

<a id="listener"></a>

### listener()

> **listener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

Defined in: [base/index.ts:76](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L76)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement`

##### K

`K` _extends_ keyof `HTMLElementEventMap`

#### Parameters

##### listener

(`this`, `e`) => `any`

Listener to attach to all of the `trigger` elements.

##### type

`K` = `...`

##### options?

`AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content(Announce()))).listener`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [copy/index.ts:53](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L53)

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

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:184](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L184)

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

Defined in: [base/index.ts:190](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L190)

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

Defined in: [base/index.ts:196](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L196)

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

Defined in: [base/index.ts:125](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L125)

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

Defined in: [base/index.ts:61](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L61)

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

Defined in: [base/index.ts:62](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L62)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger(Content(Announce()))).triggers`
