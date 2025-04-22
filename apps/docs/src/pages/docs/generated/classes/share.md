Defined in: [share/index.ts:9](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L9)

Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
to share a url. If `share` is not supported, falls back to copy the text instead.

## Extends

- [`Copy`](/elements/copy/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Share**(): `Share`

Defined in: [share/index.ts:10](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L10)

#### Returns

`Share`

#### Overrides

[`Copy`](/elements/copy/).[`constructor`](/elements/copy/#constructor)

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:42](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L42)

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

Defined in: [base/index.ts:46](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L46)

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`event`](/elements/copy/#event)

---

<a id="value"></a>

### value

#### Get Signature

> **get** **value**(): `string`

Defined in: [copy/index.ts:19](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L19)

The value to copy.

##### Default

```ts
("");
```

##### Returns

`string`

#### Set Signature

> **set** **value**(`value`): `void`

Defined in: [copy/index.ts:23](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L23)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`value`](/elements/copy/#value)

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [base/index.ts:53](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L53)

#### Parameters

##### message

`string`

message to announce to screen readers

#### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`announce`](/elements/copy/#announce)

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:186](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L186)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`connectedCallback`](/elements/copy/#connectedcallback)

---

<a id="copy"></a>

### copy()

> **copy**(`value`): `Promise`\<`void`\>

Defined in: [copy/index.ts:30](https://github.com/rossrobino/components/blob/main/packages/drab/src/copy/index.ts#L30)

#### Parameters

##### value

`string` = `...`

The `value` to copy

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Copy`](/elements/copy/).[`copy`](/elements/copy/#copy)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:193](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L193)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`destroy`](/elements/copy/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:196](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L196)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Copy`](/elements/copy/).[`disconnectedCallback`](/elements/copy/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:73](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L73)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

##### instance

() => `T`

The instance of the desired element to validate against,
ex: `HTMLDialogElement`. Defaults to `HTMLElement`.

#### Returns

`T`

The element that matches the `content` selector.

#### Default

```ts
this.querySelector("[data-content]");
```

#### Inherited from

[`Copy`](/elements/copy/).[`getContent`](/elements/copy/#getcontent)

---

<a id="gettrigger"></a>

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

Defined in: [base/index.ts:61](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L61)

#### Type Parameters

##### T

`T` _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[`Copy`](/elements/copy/).[`getTrigger`](/elements/copy/#gettrigger)

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [share/index.ts:27](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L27)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Copy`](/elements/copy/).[`mount`](/elements/copy/#mount)

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:137](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L137)

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

[`Copy`](/elements/copy/).[`safeListener`](/elements/copy/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `document`, `options?`): `void`

Defined in: [base/index.ts:143](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L143)

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

[`Copy`](/elements/copy/).[`safeListener`](/elements/copy/#safelistener)

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `window`, `options?`): `void`

Defined in: [base/index.ts:149](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L149)

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

[`Copy`](/elements/copy/).[`safeListener`](/elements/copy/#safelistener)

---

<a id="share"></a>

### share()

> **share**(`url`): `Promise`\<`void`\>

Defined in: [share/index.ts:18](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L18)

Shares or copies the `value`.

#### Parameters

##### url

`string` = `...`

The `url` to share, defaults to `this.value`

#### Returns

`Promise`\<`void`\>

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:92](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L92)

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

[`Copy`](/elements/copy/).[`swapContent`](/elements/copy/#swapcontent)

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

Defined in: [base/index.ts:168](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L168)

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

[`Copy`](/elements/copy/).[`triggerListener`](/elements/copy/#triggerlistener)
