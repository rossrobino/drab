Defined in: [intersect/index.ts:16](https://github.com/rossrobino/components/blob/main/packages/drab/src/intersect/index.ts#L16)

Uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to add a `data-intersect` attribute to `content` when the `trigger` is intersecting.

Use `onIntersect` and `onExit` to customize further with JavaScript.

`threshold`

Specify a `threshold` between `0` and `1` to determine how much of the `trigger` should be visible for the intersection to occur.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new Intersect**(): `Intersect`

Defined in: [intersect/index.ts:23](https://github.com/rossrobino/components/blob/main/packages/drab/src/intersect/index.ts#L23)

#### Returns

`Intersect`

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructor)

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

Defined in: [base/index.ts:188](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L188)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:195](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L195)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:198](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L198)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:75](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L75)

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

[`Base`](/elements/base/).[`getContent`](/elements/base/#getcontent)

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

[`Base`](/elements/base/).[`getTrigger`](/elements/base/#gettrigger)

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [intersect/index.ts:50](https://github.com/rossrobino/components/blob/main/packages/drab/src/intersect/index.ts#L50)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="onexit"></a>

### onExit()

> **onExit**(`callback`): `void`

Defined in: [intersect/index.ts:46](https://github.com/rossrobino/components/blob/main/packages/drab/src/intersect/index.ts#L46)

#### Parameters

##### callback

`IntersectCallback`

Runs when `trigger` exits.

#### Returns

`void`

---

<a id="onintersect"></a>

### onIntersect()

> **onIntersect**(`callback`): `void`

Defined in: [intersect/index.ts:39](https://github.com/rossrobino/components/blob/main/packages/drab/src/intersect/index.ts#L39)

#### Parameters

##### callback

`IntersectCallback`

Runs when `trigger` intersects.

#### Returns

`void`

---

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:139](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L139)

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

Defined in: [base/index.ts:145](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L145)

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

Defined in: [base/index.ts:151](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L151)

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

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:94](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L94)

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

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options?`): `void`

Defined in: [base/index.ts:170](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L170)

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
