Defined in: [prefetch/index.ts:73](https://github.com/rossrobino/components/blob/main/packages/drab/src/prefetch/index.ts#L73)

The `Prefetch` element can prefetch a url, or enhance the `HTMLAnchorElement` by loading the HTML for a page before it is navigated to. This element speeds up the navigation for multi-page applications (MPAs).

If you are using a framework that already has a prefetch feature or uses a client side router, it is best to use the framework's feature instead of this element to ensure prefetching is working in accordance with the router.

### Attributes

`strategy`

Set the `strategy` attribute to specify the when the prefetch will take place.

- `"hover"` - (default) After `mouseover`, `focus`, or `touchstart` for > 200ms
- `"visible"` - Uses an intersection observer to prefetch when the anchor is within the viewport.
- `"load"` - Immediately prefetches when the element is loaded, use carefully.

`prerender`

Use the `prerender` attribute to use the Speculation Rules API when supported to prerender on the client. This allows you to run client side JavaScript in advance instead of only fetching the HTML.

Browsers that do not support will still use `<link rel="prefetch">` instead.

[Speculation Rules Reference](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)

`url`

Add a `url` attribute to immediately prefetch a url without having to provide
(or in addition to) `trigger` anchor elements.

This element can be deprecated once the Speculation Rules API is supported across browsers. The API will be able to prefetch assets in a similar way with the `source: "document"` and `eagerness` features, and will work without JavaScript.

## Extends

- `Lifecycle`\<\{(...`args`): `Trigger`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Trigger`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Trigger`\<`Constructor`\<`HTMLElement`\>, `this`\> & `HTMLElement`\<`this`\>

## Constructors

<a id="constructor"></a>

### Constructor

> **new Prefetch**(): `Prefetch`

Defined in: [prefetch/index.ts:76](https://github.com/rossrobino/components/blob/main/packages/drab/src/prefetch/index.ts#L76)

#### Returns

`Prefetch`

#### Overrides

`Lifecycle(Trigger()).constructor`

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

`Lifecycle(Trigger()).event`

## Methods

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).connectedCallback`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:232](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L232)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:235](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L235)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).disconnectedCallback`

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

`Lifecycle(Trigger()).listener`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [prefetch/index.ts:143](https://github.com/rossrobino/components/blob/main/packages/drab/src/prefetch/index.ts#L143)

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

`Lifecycle(Trigger()).mount`

---

<a id="prefetch"></a>

### prefetch()

> **prefetch**(`options`): `void`

Defined in: [prefetch/index.ts:101](https://github.com/rossrobino/components/blob/main/packages/drab/src/prefetch/index.ts#L101)

Appends `<link rel="prefetch">` or `<script type="speculationrules">`
to the head of the document.

#### Parameters

##### options

Configuration options.

###### prerender?

`boolean`

Uses the Speculation Rules API when supported to prerender on the client.

###### url

`string`

`url` to prefetch.

#### Returns

`void`

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

`Lifecycle(Trigger()).safeListener`

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

`Lifecycle(Trigger()).safeListener`

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

`Lifecycle(Trigger()).safeListener`

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

`Lifecycle(Trigger()).triggers`

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

`Lifecycle(Trigger()).triggers`
