Defined in: [dialog/index.ts:44](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L44)

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

Use the CSS `scrollbar-gutter: stable` to eliminate layout shift when removing the body scroll.

```css
:root {
  scrollbar-gutter: stable;
}
```

## Extends

- `Lifecycle`\<\{(...`args`): `Trigger`\<\{(...`args`): `Content`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>\>; `prototype`: `Trigger`\<`any`\>; \} & \{(...`args`): `Content`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Trigger`\<\{(...`args`): `Content`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Content`\<`Constructor`\<`HTMLElement`\>, `this`\> & `HTMLElement`\<`this`\>

## Constructors

<a id="constructor"></a>

### Constructor

> **new Dialog**(): `Dialog`

Defined in: [dialog/index.ts:45](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L45)

#### Returns

`Dialog`

#### Overrides

`Lifecycle(Trigger(Content())).constructor`

## Accessors

<a id="dialog"></a>

### dialog

#### Get Signature

> **get** **dialog**(): `HTMLDialogElement`

Defined in: [dialog/index.ts:50](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L50)

The `HTMLDialogElement` within the element.

##### Returns

`HTMLDialogElement`

---

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

`Lifecycle(Trigger(Content())).event`

## Methods

<a id="close"></a>

### close()

> **close**(): `void`

Defined in: [dialog/index.ts:68](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L68)

Wraps `HTMLDialogElement.close()`.

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).connectedCallback`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:232](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L232)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:235](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L235)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger(Content())).disconnectedCallback`

---

<a id="getcontent"></a>

### getContent()

#### Call Signature

> **getContent**\<`T`\>(`instance`): `T`

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

`Lifecycle(Trigger(Content())).getContent`

#### Call Signature

> **getContent**(): `HTMLElement`

Defined in: [base/index.ts:110](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L110)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

`Lifecycle(Trigger(Content())).getContent`

---

<a id="gettrigger"></a>

### getTrigger()

#### Call Signature

> **getTrigger**\<`T`\>(`instance`): `NodeListOf`\<`T`\>

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

`Lifecycle(Trigger(Content())).getTrigger`

#### Call Signature

> **getTrigger**(): `NodeListOf`\<`HTMLElement`\>

Defined in: [base/index.ts:62](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L62)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger(Content())).getTrigger`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [dialog/index.ts:79](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L79)

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

`Lifecycle(Trigger(Content())).safeListener`

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

`Lifecycle(Trigger(Content())).safeListener`

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

`Lifecycle(Trigger(Content())).safeListener`

---

<a id="show"></a>

### show()

> **show**(): `void`

Defined in: [dialog/index.ts:62](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L62)

Wraps `HTMLDialogElement.showModal()`.

#### Returns

`void`

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

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

`Lifecycle(Trigger(Content())).swapContent`

---

<a id="toggle"></a>

### toggle()

> **toggle**(): `void`

Defined in: [dialog/index.ts:74](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L74)

`show` or `close` depending on the dialog's `open` attribute.

#### Returns

`void`

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

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

`Lifecycle(Trigger(Content())).triggerListener`
