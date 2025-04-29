---
title: Getting Started
description: How to start using drab custom elements.
---

# Getting Started

## Install

You can install drab from [npm](https://www.npmjs.com/package/drab) and import the custom elements from the package, or add a `<script>` tag that points to your preferred CDN.

```bash
npm i drab
```

In a client-side JavaScript module, import the element and define with with a name. Each element's class is exported from `drab/{element}`.

```js
import { Dialog } from "drab/dialog";

customElements.define("drab-dialog", Dialog);
```

Or, import the `drab/{element}/define` module where it's defined for you, in this case the element will be named `drab-{element}`

```js
import "drab/dialog/define";
```

## Styling

Elements without styles can appear rather drab. You have the freedom to bring your own styles to these elements. Since drab doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind and [uico](https://uico.robino.dev). Tailwind does **not** have to be used with this library.
