Wrap a `HTMLTableElement` in the `TableSort` element to have sortable column
headers. Set each `th` that you want to sort to the `trigger`. Set the `tbody`
element to the `content`.

The values of each cell default to the cell's `textContent`. If you would like to
provide an alternate value than what appears in the cell to sort by instead,
you can set a different value using the `data-value` attribute on the cell.

The cells will be sorted as `string` by default. If you want to provide a different
datatype `number` or `boolean`, set `data-type="number"` on the corresponding
`th`/`trigger` element. The data will be converted to the specified type before sorting.

---

## Extends

- [`Base`](/docs/base/)

---

## Constructors

### new TableSort()

> **new TableSort**(): [`TableSort`](/docs/tablesort/)

#### Returns

[`TableSort`](/docs/tablesort/)

#### Overrides

[`Base`](/docs/base/).[`constructor`](/docs/base/#constructors)

#### Source

[src/package/tablesort/index.ts:20](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/tablesort/index.ts#L20)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

[`Base`](/docs/base/).[`#listenerController`](/docs/base/##listenercontroller)

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L17)

---

## Accessors

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L30)

---

## Methods

### #setAttributes()

> `private` **#setAttributes**(`trigger`): `boolean`

Removes `data-asc` or `data-desc` from other triggers then sets the correct attribute on the selected trigger.

#### Parameters

• **trigger**: `HTMLElement`

#### Returns

`boolean`

true if ascending, false if descending

#### Source

[src/package/tablesort/index.ts:30](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/tablesort/index.ts#L30)

### connectedCallback()

> **connectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`connectedCallback`](/docs/base/#connectedcallback)

#### Source

[src/package/base/index.ts:152](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L152)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`destroy`](/docs/base/#destroy)

#### Source

[src/package/base/index.ts:159](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L159)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

#### Returns

`void`

#### Inherited from

[`Base`](/docs/base/).[`disconnectedCallback`](/docs/base/#disconnectedcallback)

#### Source

[src/package/base/index.ts:161](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L161)

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

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L55)

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

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/docs/base/).[`mount`](/docs/base/#mount)

#### Source

[src/package/tablesort/index.ts:49](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/tablesort/index.ts#L49)

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

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L118)

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

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L72)

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

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/7c5ef9c5560075bcaf1de43f0d5a025a6ebd2ca0/src/package/base/index.ts#L135)
