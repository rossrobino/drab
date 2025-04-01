Defined in: [share/index.ts:8](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L8)

Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) to share a url. If `share` is not supported, falls back to copy the text instead.

## Extends

- `BaseCopy`

## Constructors

<a id="constructor"></a>

### Constructor

> **new Share**(): `Share`

Defined in: [share/index.ts:9](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L9)

#### Returns

`Share`

#### Overrides

`BaseCopy.constructor`

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

`BaseCopy.event`

---

<a id="value"></a>

### value

#### Get Signature

> **get** **value**(): `string`

Defined in: [base/copy/index.ts:15](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/copy/index.ts#L15)

The value to copy or share.

##### Default

```ts
"" the empty string
```

##### Returns

`string`

#### Set Signature

> **set** **value**(`value`): `void`

Defined in: [base/copy/index.ts:19](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/copy/index.ts#L19)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

`BaseCopy.value`

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

`BaseCopy.announce`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:171](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L171)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`BaseCopy.connectedCallback`

---

<a id="copy"></a>

### copy()

> **copy**(`text`): `Promise`\<`void`\>

Defined in: [base/copy/index.ts:27](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/copy/index.ts#L27)

Copies the `text`.

#### Parameters

##### text

`string` = `...`

The `text` to share

#### Returns

`Promise`\<`void`\>

#### Inherited from

`BaseCopy.copy`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:178](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L178)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`BaseCopy.destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:181](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L181)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`BaseCopy.disconnectedCallback`

---

<a id="getcontent"></a>

### getContent()

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:74](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L74)

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

`BaseCopy.getContent`

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

`BaseCopy.getTrigger`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [share/index.ts:34](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L34)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

`BaseCopy.mount`

---

<a id="safelistener"></a>

### safeListener()

> **safeListener**\<`K`, `T`\>(`type`, `listener`, `element`, `options`): `void`

Defined in: [base/index.ts:136](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L136)

Wrapper around `document.body.addEventListener` that ensures when the
element is removed from the DOM, these event listeners are cleaned up.

#### Type Parameters

##### K

`K` _extends_ keyof `DocumentEventMap`

##### T

`T` _extends_ `HTMLElement` \| `Document` \| `Window` = `HTMLElement`

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

`BaseCopy.safeListener`

---

<a id="share"></a>

### share()

> **share**(`url`): `Promise`\<`void`\>

Defined in: [share/index.ts:19](https://github.com/rossrobino/components/blob/main/packages/drab/src/share/index.ts#L19)

Shares or copies the `value`.

#### Parameters

##### url

`string` = `...`

The `url` to share, defaults to `this.value`

#### Returns

`Promise`\<`void`\>

An object containing a `result` - whether the `url` was copied or shared
depending on browser support.

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

`BaseCopy.swapContent`

---

<a id="triggerlistener"></a>

### triggerListener()

> **triggerListener**\<`T`, `K`\>(`listener`, `type`, `options`?): `void`

Defined in: [base/index.ts:153](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L153)

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

`BaseCopy.triggerListener`
