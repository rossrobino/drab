Defined in: [contextmenu/index.ts:8](https://github.com/rossrobino/components/blob/main/packages/drab/src/contextmenu/index.ts#L8)

Displays content when the `trigger` element is right clicked, or long pressed on mobile.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructors"></a>

### new ContextMenu()

> **new ContextMenu**(): [`ContextMenu`](/elements/contextmenu/)

Defined in: [contextmenu/index.ts:12](https://github.com/rossrobino/components/blob/main/packages/drab/src/contextmenu/index.ts#L12)

#### Returns

[`ContextMenu`](/elements/contextmenu/)

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructors)

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

[`Base`](/elements/base/).[`event`](/elements/base/#event)

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

[`Base`](/elements/base/).[`announce`](/elements/base/#announce)

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:171](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L171)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:178](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L178)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:181](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L181)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:74](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L74)

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

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

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

---

<a id="gettrigger"></a>

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

Defined in: [base/index.ts:61](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L61)

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Inherited from

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

---

<a id="hide"></a>

### hide()

> **hide**(): `Promise`\<`void`\>

Defined in: [contextmenu/index.ts:54](https://github.com/rossrobino/components/blob/main/packages/drab/src/contextmenu/index.ts#L54)

#### Returns

`Promise`\<`void`\>

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [contextmenu/index.ts:58](https://github.com/rossrobino/components/blob/main/packages/drab/src/contextmenu/index.ts#L58)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="safelistener"></a>

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Defined in: [base/index.ts:136](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L136)

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type Parameters

• **K** _extends_ keyof `DocumentEventMap`

• **T** _extends_ `HTMLElement` \| `Document` \| `Window` = `HTMLElement`

#### Parameters

##### type

`K`

##### listener

(`this`, `ev`) => `any`

##### element

`T` = `...`

##### options

`AddEventListenerOptions` = `{}`

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

---

<a id="show"></a>

### show()

> **show**(`e`): `Promise`\<`void`\>

Defined in: [contextmenu/index.ts:22](https://github.com/rossrobino/components/blob/main/packages/drab/src/contextmenu/index.ts#L22)

#### Parameters

##### e

`MouseEvent` | `TouchEvent`

#### Returns

`Promise`\<`void`\>

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:93](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L93)

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

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

Defined in: [base/index.ts:153](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L153)

#### Type Parameters

• **T** _extends_ `HTMLElement`

• **K** _extends_ keyof `HTMLElementEventMap`

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
