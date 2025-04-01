Defined in: [announcer/index.ts:36](https://github.com/rossrobino/components/blob/main/packages/drab/src/announcer/index.ts#L36)

Use the `Announcer` element to create a visually hidden ARIA live region
that announces content changes to screen readers. Use this element when you
need to announce changes to screen readers that something has changed. If changed
element is visible on the page, add the appropriate ARIA live attribute to the
visible element instead of using this announcer.

It's recommended to create this element with JavaScript using the `Announcer.init` method,
then you can reuse the same announcer throughout the application to
[avoid duplicate regions](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#limit-the-number-of-live-regions-on-the-page)
(see below).

`aria-live`

By default, the announcer is created with the
[`polite` ARIA live attribute](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/#1.-using-the-aria-live-attribute).

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

<a id="constructor"></a>

### Constructor

> **new Announcer**(): `Announcer`

Defined in: [announcer/index.ts:37](https://github.com/rossrobino/components/blob/main/packages/drab/src/announcer/index.ts#L37)

#### Returns

`Announcer`

#### Overrides

`HTMLElement.constructor`

## Methods

<a id="announce"></a>

### announce()

> **announce**(`message`): `void`

Defined in: [announcer/index.ts:58](https://github.com/rossrobino/components/blob/main/packages/drab/src/announcer/index.ts#L58)

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

Defined in: [announcer/index.ts:41](https://github.com/rossrobino/components/blob/main/packages/drab/src/announcer/index.ts#L41)

#### Returns

`void`

---

<a id="init"></a>

### init()

> `static` **init**(): `Announcer`

Defined in: [announcer/index.ts:75](https://github.com/rossrobino/components/blob/main/packages/drab/src/announcer/index.ts#L75)

Helper method to create a new `Announcer` element named `drab-announcer`
and append the element to the `<body>` tag. If an announcer already exists
on the page it will return the existing element.

#### Returns

`Announcer`

the created or existing `Announcer` element
