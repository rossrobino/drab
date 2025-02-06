Defined in: prefetch/index.ts:77

The `Prefetch` element can prefetch a url, or enhance the `HTMLAnchorElement` by loading the HTML for a page before it is navigated to. This element speeds up the navigation for multi-page applications (MPAs).

If you are using a framework that already has a prefetch feature or uses a client side router, it is best to use the framework's feature instead of this element to ensure prefetching is working in accordance with the router.

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

- [`Base`](/elements/base/)

## Constructors

<a id="constructors"></a>

### new Prefetch()

> **new Prefetch**(): [`Prefetch`](/elements/prefetch/)

Defined in: prefetch/index.ts:80

#### Returns

[`Prefetch`](/elements/prefetch/)

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructors)

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: base/index.ts:30

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

Defined in: base/index.ts:34

##### Parameters

###### value

keyof `HTMLElementEventMap`

##### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`event`](/elements/base/#event)

## Methods

<a id="appendtag"></a>

### appendTag()

> **appendTag**(`options`): `void`

Defined in: prefetch/index.ts:104

Appends `<link rel="prefetch">` or `<script type="speculationrules">` to the head of the document.

#### Parameters

##### options

Configuration options.

###### prerender

`boolean`

Uses the Speculation Rules API when supported to prerender on the client.

###### url

`string`

`url` to prefetch.

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: base/index.ts:152

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: base/index.ts:159

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: base/index.ts:164

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: base/index.ts:55

#### Type Parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

##### instance

() => `T`

The instance of the desired element, ex: `HTMLDialogElement`.
Defaults to `HTMLElement`.

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

Defined in: base/index.ts:42

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

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: prefetch/index.ts:239

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

---

<a id="prefetch-1"></a>

### prefetch()

> **prefetch**(`options`): `void`

Defined in: prefetch/index.ts:163

Use to prefetch/prerender HTML.

Can be used more than once with different options for different selectors.

#### Parameters

##### options

Prefetch options.

###### anchors

`NodeListOf`\<`HTMLAnchorElement`\>

The anchors to prefetch. Defaults to `trigger` elements.

###### prerender

`boolean`

Uses the Speculation Rules API when supported to prerender on the client.

###### strategy

`"load"` \| `"hover"` \| `"visible"`

Determines when the prefetch takes place.

**Default**

```ts
"hover";
```

#### Returns

`void`

---

<a id="safelistener"></a>

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Defined in: base/index.ts:115

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

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: base/index.ts:72

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

Defined in: base/index.ts:132

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
