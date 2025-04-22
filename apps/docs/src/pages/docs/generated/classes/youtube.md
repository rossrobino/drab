Defined in: [youtube/index.ts:12](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L12)

Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

## Extends

- [`Base`](/elements/base/)

## Constructors

<a id="constructor"></a>

### Constructor

> **new YouTube**(): `YouTube`

Defined in: [youtube/index.ts:15](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L15)

#### Returns

`YouTube`

#### Overrides

[`Base`](/elements/base/).[`constructor`](/elements/base/#constructor)

## Properties

<a id="observedattributes"></a>

### observedAttributes

> `static` **observedAttributes**: readonly \[`"autoplay"`, `"start"`, `"uid"`\]

Defined in: [youtube/index.ts:13](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L13)

## Accessors

<a id="autoplay"></a>

### autoplay

#### Get Signature

> **get** **autoplay**(): `boolean`

Defined in: [youtube/index.ts:25](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L25)

Whether the video should start playing when loaded.

##### Returns

`boolean`

#### Set Signature

> **set** **autoplay**(`value`): `void`

Defined in: [youtube/index.ts:29](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L29)

##### Parameters

###### value

`boolean`

##### Returns

`void`

---

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

---

<a id="iframe"></a>

### iframe

#### Get Signature

> **get** **iframe**(): `HTMLIFrameElement`

Defined in: [youtube/index.ts:20](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L20)

The `HTMLIFrameElement` within the element.

##### Returns

`HTMLIFrameElement`

---

<a id="start"></a>

### start

#### Get Signature

> **get** **start**(): `string`

Defined in: [youtube/index.ts:35](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L35)

The start time of the video (seconds).

##### Returns

`string`

#### Set Signature

> **set** **start**(`value`): `void`

Defined in: [youtube/index.ts:39](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L39)

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

Defined in: [youtube/index.ts:49](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L49)

The video's YouTube uid, found within the url of the video.

For example if the video url is https://youtu.be/gouiY85kD2o,
the `uid` is `"gouiY85kD2o"`.

##### Returns

`string`

#### Set Signature

> **set** **uid**(`v`): `void`

Defined in: [youtube/index.ts:55](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L55)

##### Parameters

###### v

`string`

##### Returns

`void`

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

<a id="attributechangedcallback"></a>

### attributeChangedCallback()

> **attributeChangedCallback**(): `void`

Defined in: [youtube/index.ts:65](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L65)

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: [base/index.ts:186](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L186)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`connectedCallback`](/elements/base/#connectedcallback)

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:193](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L193)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`destroy`](/elements/base/#destroy)

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:196](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L196)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

[`Base`](/elements/base/).[`disconnectedCallback`](/elements/base/#disconnectedcallback)

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

Defined in: [youtube/index.ts:59](https://github.com/rossrobino/components/blob/main/packages/drab/src/youtube/index.ts#L59)

Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.

The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.

#### Returns

`void`

#### Overrides

[`Base`](/elements/base/).[`mount`](/elements/base/#mount)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

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

[`Base`](/elements/base/).[`safeListener`](/elements/base/#safelistener)

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

[`Base`](/elements/base/).[`swapContent`](/elements/base/#swapcontent)

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

[`Base`](/elements/base/).[`triggerListener`](/elements/base/#triggerlistener)
