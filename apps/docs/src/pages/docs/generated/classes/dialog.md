Defined in: [packages/drab/src/dialog/index.ts:23](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L23)

Provides triggers for the `HTMLDialogElement`.

`click-outside-close`

By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
Add a `click-outside-close` attribute to close when the user clicks outside.

### Attributes

`remove-body-scroll`

Add the `remove-body-scroll` attribute to remove the scroll from `document.body` when the dialog
is open.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Dialog**(): `Dialog`

Defined in: [packages/drab/src/dialog/index.ts:29](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L29)

#### Returns

`Dialog`

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructor)

## Accessors

<a id="dialog"></a>

### dialog

#### Get Signature

> **get** **dialog**(): `HTMLDialogElement`

Defined in: [packages/drab/src/dialog/index.ts:34](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L34)

The `HTMLDialogElement` within the element.

##### Returns

`HTMLDialogElement`

---

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [packages/drab/src/base/index.ts:39](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L39)

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

Defined in: [packages/drab/src/base/index.ts:45](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L45)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`event`](/elements/base/#event)

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [packages/drab/src/base/index.ts:249](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L249)

#### Parameters

##### message

`string`

message to announce to screen readers

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`announce`](/elements/base/#announce)

---

<a id="close"></a>

### close()

> **close**(): `void`

Defined in: [packages/drab/src/dialog/index.ts:60](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L60)

`HTMLDialogElement.close()` with animation.

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [packages/drab/src/base/index.ts:207](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L207)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [packages/drab/src/base/index.ts:214](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L214)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [packages/drab/src/base/index.ts:217](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L217)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

#### Call Signature

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [packages/drab/src/base/index.ts:93](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L93)

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

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

#### Call Signature

> **getContent**(): `HTMLElement`

Defined in: [packages/drab/src/base/index.ts:94](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L94)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

---

<a id="gettrigger"></a>

### getTrigger()

#### Call Signature

> **getTrigger**\<`T`\>(`instance`): `NodeListOf`\<`T`\>

Defined in: [packages/drab/src/base/index.ts:55](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L55)

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

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

#### Call Signature

> **getTrigger**(): `NodeListOf`\<`HTMLElement`\>

Defined in: [packages/drab/src/base/index.ts:56](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L56)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [packages/drab/src/dialog/index.ts:71](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L71)

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

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [packages/drab/src/base/index.ts:166](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L166)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `document`, `options?`): `void`

Defined in: [packages/drab/src/base/index.ts:172](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L172)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `window`, `options?`): `void`

Defined in: [packages/drab/src/base/index.ts:178](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L178)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

---

<a id="show"></a>

### show()

> **show**(): `void`

Defined in: [packages/drab/src/dialog/index.ts:54](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L54)

`HTMLDialogElement.showModal()` with animation.

#### Returns

`void`

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [packages/drab/src/base/index.ts:109](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L109)

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

[`Base`](/elements/base/).[`swapContent`](/elements/base/#swapcontent)

---

<a id="toggle"></a>

### toggle()

> **toggle**(): `void`

Defined in: [packages/drab/src/dialog/index.ts:66](https://github.com/rossrobino/components/blob/main/packages/drab/src/dialog/index.ts#L66)

`show` or `close` depending on the dialog's `open` attribute.

#### Returns

`void`

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

Defined in: [packages/drab/src/base/index.ts:70](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L70)

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

[`Base`](/elements/base/).[`triggerListener`](/elements/base/#triggerlistener)
