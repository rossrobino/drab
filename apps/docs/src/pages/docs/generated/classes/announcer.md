Defined in: announcer/index.ts:34

Use the `Announcer` element to create a visually hidden ARIA live region
that announces content changes to screen readers.

It's recommended to create this element with JavaScript using the `Announcer.init` method,
then you can reuse the same announcer throughout the application to avoid duplicate
regions (see below).

`aria-live`

By default, the announcer is created with the
[`polite` ARIA live attribute](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/#1.-using-the-aria-live-attribute).
You can also specify a different live attribute by setting the `aria-live` attribute with
HTML or JavaScript.

## Example

```ts
import { Announcer } from "drab/announcer";

// creates and appends a new announcer to the body element
const announcer = Announcer.init();

// create announcement
announcer.announce("message");
```

> The `Base` element creates a single `Announcer` to share between all elements
> that can be accessed through `this.announce`. If you are using one of drab's other
> elements you can call `announce` directly on the element to announce changes.

## Extends

- `HTMLElement`

## Constructors

<a id="constructors"></a>

### new Announcer()

> **new Announcer**(): [`Announcer`](/elements/announcer/)

Defined in: announcer/index.ts:35

#### Returns

[`Announcer`](/elements/announcer/)

#### Overrides

`HTMLElement.constructor`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: announcer/index.ts:56

#### Parameters

##### message

`string`

message to announce to screen readers

#### Returns

`void`

---

<a id="connectedcallback"></a>

### connectedCallback()

> **connectedCallback**(): `void`

Defined in: announcer/index.ts:39

#### Returns

`void`

---

<a id="init"></a>

### init()

> `static` **init**(): [`Announcer`](/elements/announcer/)

Defined in: announcer/index.ts:70

Helper method to create a new `Announcer` element named `drab-announcer`
and append the element to the `<body>` tag. If an announcer already exists
on the page it will return the existing element.

#### Returns

[`Announcer`](/elements/announcer/)

the created or existing `Announcer` element
