# Share

Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) to share a link.

---

## Attributes

- `url` - url to share

---

## Hierarchy

- `Base`

  ↳ **`Share`**

---

## Constructors

### constructor

• **new Share**(): [`Share`](/docs/classes/Share.md)

#### Returns

[`Share`](/docs/classes/Share.md)

#### Overrides

Base.constructor

#### Defined in

src/package/elements/share/index.ts:13

---

## Properties

---

## Accessors

### content

• `get` **content**(): `HTMLElement`

#### Returns

`HTMLElement`

The element that matches the `content` selector.

**`Default`**

`this.querySelector("[data-content]")`

#### Inherited from

Base.content

#### Defined in

src/package/elements/base/index.ts:23

### trigger

• `get` **trigger**(): `NodeListOf`\<`HTMLElement`\>

#### Returns

`NodeListOf`\<`HTMLElement`\>

All of the elements that match the `trigger` selector.

**`Default`**

`this.querySelectorAll("[data-trigger]")`

#### Inherited from

Base.trigger

#### Defined in

src/package/elements/base/index.ts:10

---

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Defined in

src/package/elements/share/index.ts:17
