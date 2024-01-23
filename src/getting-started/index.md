# Getting started

## Install

You can install **drab** from [npm](https://www.npmjs.com/package/drab) and import the custom elements from the package (recommended).

```bash
npm i -D drab
```

```js
// client.js
import { Dialog } from "drab";

customElements.define("drab-dialog", Dialog);
```

Alternatively, add a script tag to your HTML, each element will be named `drab-{element}`.

```html
<script type="module" src="https://unpkg.com/drab/dialog.global.js"></script>
```

## Usage

Add the element to your HTML.

```html
<drab-dialog>...</drab-dialog>
```

## Styling

Elements without styles can appear rather drab. You have the freedom to bring your own styles to these elements. Since **drab** doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind using the [uico](https://uico.robino.dev) and [typography](https://tailwindcss.com/docs/typography-plugin) plugins. Tailwind does not have to be used with this library.
