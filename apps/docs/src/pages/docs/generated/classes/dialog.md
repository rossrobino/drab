Defined in: [dialog/index.ts:36](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L36)

Provides triggers for the `HTMLDialogElement`.

### Attributes

`click-outside-close`

By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
Add a `click-outside-close` attribute to close when the user clicks outside.

If the dialog covers the full viewport and this attribute is present, the first child
of the dialog will be assumed to be the content of the dialog and the dialog will close
if there is a click outside of the first child element.

`remove-body-scroll`

Add the `remove-body-scroll` attribute to remove the scroll from `document.body` when the dialog
is open.

## Constructors

<a id="constructor"></a>

### Constructor

> **new Dialog**(): `Dialog`

Defined in: [dialog/index.ts:37](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L37)

#### Returns

`Dialog`

#### Overrides

`Lifecycle(Trigger(Content())).constructor`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:43](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L43)

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

Defined in: [base/index.ts:49](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L49)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).event`

## Methods

<a id="close"></a>

### close()

> **close**(): `void`

Defined in: [dialog/index.ts:69](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L69)

Wraps `HTMLDialogElement.close()`.

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:254](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L254)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).connectedCallback`

---

<a id="content"></a>

### content()

#### Call Signature

> **content**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:138](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L138)

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

`Lifecycle(Trigger(Content())).content`

#### Call Signature

> **content**(): `HTMLElement`

Defined in: [base/index.ts:139](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L139)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

`Lifecycle(Trigger(Content())).content`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:261](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L261)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:264](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L264)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).disconnectedCallback`

---

<a id="listener"></a>

### listener()

#### Call Signature

> **listener**\<`T`\>(`listener`, `options?`): `void`

Defined in: [base/index.ts:75](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L75)

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

`Lifecycle(Trigger(Content())).listener`

#### Call Signature

> **listener**\<`T`\>(`type`, `listener`, `options?`): `void`

Defined in: [base/index.ts:84](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L84)

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

`Lifecycle(Trigger(Content())).listener`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [dialog/index.ts:80](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L80)

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

`Lifecycle(Trigger(Content())).mount`

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:213](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L213)

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

`Lifecycle(Trigger(Content())).safeListener`

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `document`, `options?`): `void`

Defined in: [base/index.ts:219](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L219)

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

`Lifecycle(Trigger(Content())).safeListener`

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `window`, `options?`): `void`

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

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

`Lifecycle(Trigger(Content())).safeListener`

---

<a id="show"></a>

### show()

> **show**(): `void`

Defined in: [dialog/index.ts:63](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L63)

Wraps `HTMLDialogElement.showModal()`.

#### Returns

`void`

---

<a id="swap"></a>

### swap()

> **swap**(`revert`): `void`

Defined in: [base/index.ts:154](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L154)

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

`Lifecycle(Trigger(Content())).swap`

---

<a id="toggle"></a>

### toggle()

> **toggle**(): `void`

Defined in: [dialog/index.ts:75](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L75)

`show` or `close` depending on the dialog's `open` attribute.

#### Returns

`void`

---

<a id="triggers"></a>

### triggers()

#### Call Signature

> **triggers**\<`T`\>(`instance`): `NodeListOf`\<`T`\>

Defined in: [base/index.ts:59](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L59)

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

`Lifecycle(Trigger(Content())).triggers`

#### Call Signature

> **triggers**(): `NodeListOf`\<`HTMLElement`\>

Defined in: [base/index.ts:60](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L60)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger(Content())).triggers`
