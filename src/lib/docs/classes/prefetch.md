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

---

## Extends

- [`Base`](/docs/base/)

---

## Constructors

### new Prefetch()

> **new Prefetch**(): [`Prefetch`](/docs/prefetch/)

#### Returns

[`Prefetch`](/docs/prefetch/)

#### Overrides

[`Base`](/docs/base/).[`constructor`](/docs/base/#constructors)

#### Source

[src/package/prefetch/index.ts:80](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L80)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Base`](/docs/base/).[`#listenerController`](/docs/base/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L17)

### #prefetchedUrls

> `private` **#prefetchedUrls**: `string`[] = `[]`

#### Source

[src/package/prefetch/index.ts:78](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L78)

---

## Accessors

### #prerender

> `get` `private` **#prerender**(): `boolean`

Prerender with the Speculation Rules API.

#### Returns

`boolean`

#### Source

[src/package/prefetch/index.ts:90](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L90)

### #strategy

> `get` `private` **#strategy**(): `Strategy`

When to prefetch the url.

#### Returns

`Strategy`

#### Source

[src/package/prefetch/index.ts:85](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L85)

### #url

> `get` `private` **#url**(): `null` \| `string`

`url` to prefetch on `mount`.

#### Returns

`null` \| `string`

#### Source

[src/package/prefetch/index.ts:95](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L95)

### event

> `get` **event**(): keyof `HTMLElementEventMap`

Event for the `trigger` to execute.

For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.

#### Default

```ts
"click";
```

> `set` **event**(`value`): `void`

#### Parameters

• **value**: keyof `HTMLElementEventMap`

#### Returns

keyof `HTMLElementEventMap`

#### Source

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L30)

---

## Methods

### appendTag()

> **appendTag**(`options`): `void`

Appends `<link rel="prefetch">` or `<script type="speculationrules">` to the head of the document.

#### Parameters

• **options**

Configuration options.

• **options.prerender?**: `boolean`

Uses the Speculation Rules API when supported to prerender on the client.

• **options.url**: `string`

`url` to prefetch.

#### Returns

`void`

#### Source

[src/package/prefetch/index.ts:104](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L104)

### connectedCallback()

> **connectedCallback**(): `void`

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`connectedCallback`](/docs/base/#connectedcallback)

#### Source

[src/package/base/index.ts:155](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L155)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`destroy`](/docs/base/#destroy)

#### Source

[src/package/base/index.ts:162](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L162)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`disconnectedCallback`](/docs/base/#disconnectedcallback)

#### Source

[src/package/base/index.ts:167](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L167)

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Parameters

• **instance**= `undefined`

The instance of the desired element, ex: `HTMLDialogElement`.
Defaults to `HTMLElement`.

#### Returns

`T`

The element that matches the `content` selector.

#### Inherited from

[`Base`](/docs/base/).[`getContent`](/docs/base/#getcontent)

#### Default

```ts
this.querySelector("[data-content]");
```

#### Source

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L55)

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Inherited from

[`Base`](/docs/base/).[`getTrigger`](/docs/base/#gettrigger)

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Source

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/docs/base/).[`mount`](/docs/base/#mount)

#### Source

[src/package/prefetch/index.ts:241](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L241)

### prefetch()

> **prefetch**(`options`): `void`

Use to prefetch/prerender HTML.

Can be used more than once with different options for different selectors.

#### Parameters

• **options**= `undefined`

Prefetch options.

• **options.anchors?**: `NodeListOf`\<`HTMLAnchorElement`\>

The anchors to prefetch. Defaults to `trigger` elements.

• **options.prerender?**: `boolean`

Uses the Speculation Rules API when supported to prerender on the client.

• **options.strategy?**: `"load"` \| `"hover"` \| `"visible"`

Determines when the prefetch takes place.

**Default**

```ts
"hover";
```

#### Returns

`void`

#### Source

[src/package/prefetch/index.ts:163](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/prefetch/index.ts#L163)

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type parameters

• **K** _extends_ keyof `DocumentEventMap`

• **T** _extends_ `Window` \| `Document` \| `HTMLElement` = `HTMLElement`

#### Parameters

• **type**: `K`

• **listener**

• **element**: `T`= `undefined`

• **options**: `AddEventListenerOptions`= `{}`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`safeListener`](/docs/base/#safelistener)

#### Source

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L118)

### swapContent()

> **swapContent**(`revert`, `delay`): `void`

Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
swaps `this.content()` with the content of the element found.

#### Parameters

• **revert**: `boolean`= `true`

Swap back to old content

• **delay**: `number`= `800`

Wait time before swapping back

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`swapContent`](/docs/base/#swapcontent)

#### Source

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L72)

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

#### Type parameters

• **T** _extends_ `HTMLElement`

• **K** _extends_ keyof `HTMLElementEventMap`

#### Parameters

• **listener**

Listener to attach to all of the `trigger` elements.

• **type**: `K`= `undefined`

• **options?**: `AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`triggerListener`](/docs/base/#triggerlistener)

#### Source

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/44e4b4fb3af0ca5b9d4f714ce2189c0e59989749/src/package/base/index.ts#L135)
