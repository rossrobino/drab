Defined in: [tabs/index.ts:36](https://github.com/rossrobino/components/blob/main/packages/drab/src/tabs/index.ts#L36)

Progressively enhance a list of links and content to be tabs by
wrapping with the `Tabs` element. Each `trigger` should be an
`HTMLAnchorElement` with the `href` attribute set to the `id` of the
corresponding tab panel.

> Tip: Set the `height` of the element the `panel`s are contained in with
> CSS to prevent layout shift when JS is loaded.

This element is based on
[Chris Ferdinandi's Toggle Tabs](https://gomakethings.com/a-web-component-ui-library-for-people-who-love-html/#toggle-tabs)
design.

[ARIA Reference](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

- Sets the correct ARIA attributes on each element.
- Supports keyboard navigation based on the `orientation` attribute.
- First tab is selected by default if no `aria-selected="true"` attribute is
  found on another tab.
- `tablist` is calculated based on the deepest common parent of the tabs,
  throws an error if not found.

### Attributes

`orientation`

Set `orientation="vertical"` if the `tablist` element is displayed vertically.

## Constructors

<a id="constructor"></a>

### Constructor

> **new Tabs**(): `Tabs`

Defined in: [tabs/index.ts:43](https://github.com/rossrobino/components/blob/main/packages/drab/src/tabs/index.ts#L43)

#### Returns

`Tabs`

#### Overrides

`Lifecycle(Trigger()).constructor`

## Accessors

<a id="event"></a>

### event

#### Get Signature

> **get** **event**(): keyof `HTMLElementEventMap`

Defined in: [base/index.ts:43](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L43)

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

Defined in: [base/index.ts:49](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L49)

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

Defined in: [base/index.ts:254](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L254)

Called when custom element is added to the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).connectedCallback`

---

<a id="destroy"></a>

### destroy()

> **destroy**(): `void`

Defined in: [base/index.ts:261](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L261)

Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).destroy`

---

<a id="disconnectedcallback"></a>

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Defined in: [base/index.ts:264](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L264)

Called when custom element is removed from the page.

#### Returns

`void`

#### Inherited from

`Lifecycle(Trigger()).disconnectedCallback`

---

<a id="listener"></a>

### listener()

#### Call Signature

> **listener**\<`T`\>(`listener`, `options?`): `void`

Defined in: [base/index.ts:75](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L75)

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### listener

`Listener`\<`T`\>

Listener to attach to all of the `trigger` elements.

###### options?

`AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger()).listener`

#### Call Signature

> **listener**\<`T`\>(`type`, `listener`, `options?`): `void`

Defined in: [base/index.ts:84](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L84)

##### Type Parameters

###### T

`T` _extends_ keyof `HTMLElementEventMap`

##### Parameters

###### type

`T`

Event type.

###### listener

`Listener`\<`T`\>

Listener to attach to all of the `trigger` elements.

###### options?

`AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Lifecycle(Trigger()).listener`

---

<a id="mount"></a>

### mount()

> **mount**(): `void`

Defined in: [tabs/index.ts:86](https://github.com/rossrobino/components/blob/main/packages/drab/src/tabs/index.ts#L86)

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

<a id="safelistener"></a>

### safeListener()

#### Call Signature

> **safeListener**\<`T`\>(`type`, `listener`, `element?`, `options?`): `void`

Defined in: [base/index.ts:213](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L213)

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

Defined in: [base/index.ts:219](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L219)

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

Defined in: [base/index.ts:225](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L225)

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

Defined in: [base/index.ts:59](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L59)

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

Defined in: [base/index.ts:60](https://github.com/rossrobino/components/blob/main/packages/drab/src/base/index.ts#L60)

##### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

##### Default

```ts
this.querySelectorAll("[data-trigger]");
```

##### Inherited from

`Lifecycle(Trigger()).triggers`
