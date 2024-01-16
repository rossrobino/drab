# YouTube

Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.

---

## Attributes

- `autoplay` - auto-plays the video
- `start` - start time (seconds)
- `uid` - unique YouTube id found in the url

---

## Hierarchy

- `Base`

  ↳ **`YouTube`**

---

## Constructors

### constructor

• **new YouTube**(): [`YouTube`](/docs/classes/YouTube.md)

#### Returns

[`YouTube`](/docs/classes/YouTube.md)

#### Overrides

Base.constructor

#### Defined in

src/package/elements/youtube/index.ts:15

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

src/package/elements/youtube/index.ts:19
