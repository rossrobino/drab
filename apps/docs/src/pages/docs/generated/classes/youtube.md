Defined in: [youtube/index.ts:17](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L17)

Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

## Extends

- `Lifecycle`\<\{(...`args`): `Content`\<`Constructor`\<`HTMLElement`\>\>; `prototype`: `Content`\<`any`\>; \} & `Constructor`\<`HTMLElement`\>, `this`\> & `Content`\<`Constructor`\<`HTMLElement`\>, `this`\> & `HTMLElement`\<`this`\>

## Constructors

<a id="constructor"></a>

### Constructor

> **new YouTube**(): `YouTube`

Defined in: [youtube/index.ts:20](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L20)

#### Returns

`YouTube`

#### Overrides

`Lifecycle(Content()).constructor`

## Properties

<a id="observedattributes"></a>

### observedAttributes

> `static` **observedAttributes**: readonly \[`"autoplay"`, `"start"`, `"uid"`\]

Defined in: [youtube/index.ts:18](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L18)

## Accessors

<a id="autoplay"></a>

### autoplay

#### Get Signature

> **get** **autoplay**(): `boolean`

Defined in: [youtube/index.ts:30](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L30)

Whether the video should start playing when loaded.

##### Returns

`boolean`

#### Set Signature

> **set** **autoplay**(`value`): `void`

Defined in: [youtube/index.ts:34](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L34)

##### Parameters

###### value

`boolean`

##### Returns

`void`

---

<a id="iframe"></a>

### iframe

#### Get Signature

> **get** **iframe**(): `HTMLIFrameElement`

Defined in: [youtube/index.ts:25](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L25)

The `HTMLIFrameElement` within the element.

##### Returns

`HTMLIFrameElement`

---

<a id="start"></a>

### start

#### Get Signature

> **get** **start**(): `string`

Defined in: [youtube/index.ts:40](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L40)

The start time of the video (seconds).

##### Returns

`string`

#### Set Signature

> **set** **start**(`value`): `void`

Defined in: [youtube/index.ts:44](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L44)

##### Parameters

###### value

`string`

##### Returns

`void`

---

<a id="uid"></a>

### uid

#### Get Signature

> **get** **uid**(): `string`

Defined in: [youtube/index.ts:54](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L54)

The video's YouTube uid, found within the url of the video.

For example if the video url is https://youtu.be/gouiY85kD2o,
the `uid` is `"gouiY85kD2o"`.

##### Returns

`string`

#### Set Signature

> **set** **uid**(`v`): `void`

Defined in: [youtube/index.ts:60](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L60)

##### Parameters

###### v

`string`

##### Returns

`void`

## Methods

<a id="attributechangedcallback"></a>

### attributeChangedCallback()

> **attributeChangedCallback**(): `void`

Defined in: [youtube/index.ts:70](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L70)

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Content()).connectedCallback`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:232](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L232)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Content()).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:235](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L235)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Content()).disconnectedCallback`

---

<a id="getcontent"></a>

### getContent()

#### Call Signature

> **getContent**\<`T`\>(`instance`): `T`

Defined in: [base/index.ts:109](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L109)

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

`Lifecycle(Content()).getContent`

#### Call Signature

> **getContent**(): `HTMLElement`

Defined in: [base/index.ts:110](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L110)

##### Returns

`HTMLElement`

The element that matches the `content` selector.

##### Default

```ts
this.querySelector("[data-content]");
```

##### Inherited from

`Lifecycle(Content()).getContent`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [youtube/index.ts:64](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L64)

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

`Lifecycle(Content()).mount`

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

`Lifecycle(Content()).safeListener`

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

`Lifecycle(Content()).safeListener`

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

`Lifecycle(Content()).safeListener`

---

<a id="swapcontent"></a>

### swapContent()

> **swapContent**(`revert`): `void`

Defined in: [base/index.ts:125](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L125)

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

`Lifecycle(Content()).swapContent`
