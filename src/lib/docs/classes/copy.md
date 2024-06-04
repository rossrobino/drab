Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
to copy text.

---

## Extends

- `BaseCopy`

---

## Constructors

### new Copy()

> **new Copy**(): [`Copy`](/docs/copy/)

#### Returns

[`Copy`](/docs/copy/)

#### Overrides

`BaseCopy.constructor`

#### Source

[src/package/copy/index.ts:11](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/copy/index.ts#L11)

---

## Properties

### #listenerController

> `private` **#listenerController**: `AbortController`

To clean up event listeners added to `document` when the element is removed.

#### Inherited from

`BaseCopy.#listenerController`

#### Source

[src/package/base/index.ts:17](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L17)

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

[src/package/base/index.ts:30](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L30)

### value

> `get` **value**(): `string`

The value to copy or share.

#### Default

```ts
"" the empty string
```

> `set` **value**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/package/base/copy/index.ts:13](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/copy/index.ts#L13)

---

## Methods

### connectedCallback()

> **connectedCallback**(): `void`

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`BaseCopy.connectedCallback`

#### Source

[src/package/base/index.ts:155](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L155)

### copy()

> **copy**(`text`): `Promise`\<`void`\>

Copies the `text`.

#### Parameters

• **text**: `string`= `undefined`

The `text` to share

#### Returns

`Promise`\<`void`\>

#### Inherited from

`BaseCopy.copy`

#### Source

[src/package/base/copy/index.ts:25](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/copy/index.ts#L25)

### destroy()

> **destroy**(): `void`

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`BaseCopy.destroy`

#### Source

[src/package/base/index.ts:162](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L162)

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`BaseCopy.disconnectedCallback`

#### Source

[src/package/base/index.ts:167](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L167)

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

`BaseCopy.getContent`

#### Default

```ts
this.querySelector("[data-content]");
```

#### Source

[src/package/base/index.ts:55](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L55)

### getTrigger()

> **getTrigger**\<`T`\>(): `NodeListOf`\<`T`\>

#### Type parameters

• **T** _extends_ `HTMLElement` = `HTMLElement`

#### Returns

`NodeListOf`\<`T`\>

All of the elements that match the `trigger` selector.

#### Inherited from

`BaseCopy.getTrigger`

#### Default

```ts
this.querySelectorAll("[data-trigger]");
```

#### Source

[src/package/base/index.ts:42](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L42)

### mount()

> **mount**(): `void`

#### Returns

`void`

#### Overrides

`BaseCopy.mount`

#### Source

[src/package/copy/index.ts:15](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/copy/index.ts#L15)

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

`BaseCopy.safeListener`

#### Source

[src/package/base/index.ts:118](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L118)

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

`BaseCopy.swapContent`

#### Source

[src/package/base/index.ts:72](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L72)

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

`BaseCopy.triggerListener`

#### Source

[src/package/base/index.ts:135](https://github.com/rossrobino/components/blob/33c45b8385b046591d3902fc8e91aef56864abde/src/package/base/index.ts#L135)
