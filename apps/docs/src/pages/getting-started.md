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

## Import

There are two ways to import the elements:

1. In a client-side JavaScript module, import the element and define with with a name. Each element's class is exported from `drab/{element}`.

```js
import { Dialog } from "drab/dialog";

customElements.define("drab-dialog", Dialog); // define with any name
```

2. Import the `drab/{element}/define` module where it's defined for you, in this case the element will be named `drab-{element}`.

```js
import "drab/dialog/define";
```

## Template

After importing the element and defining it to the registry, you can use the element in your template. See examples in the documentation for copy/paste starter templates.

```html
<drab-dialog>...</drab-dialog>
```

## Styling

Elements without styles can appear rather _drab_. You have the freedom to bring your own styles to these elements. Since drab doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind and [uico](https://uico.robino.dev). These do **not** have to be used with this library, any styling solution will work.

## Fundamentals

Each element extends one or more of the [mixins from `drab/base`](/custom/). Each element can contain **trigger** elements, which the user can interact with, and **content** that gets updated during the interaction.

### Trigger

Each element can have one or multiple trigger elements. By default, drab will look for any elements with with the `data-trigger` attribute within the element.

```html
<drab-prefetch>
	<a data-trigger href="/">Home</a>
	<a data-trigger href="/about">About</a>

	<!-- not prefetched (no data-trigger attribute) -->
	<a href="/expensive">Expensive</a>
</drab-prefetch>
```

Alternatively, you can add a `trigger` attribute to the element to customize the selector. The value is passed directly into `querySelectorAll` to identify the trigger elements instead.

```html
<drab-prefetch trigger="a[href^='/']">
	<!-- now all <a> tags with a href that start with '/' are triggers -->
	<a href="/">Home</a>
	<a href="/about">About</a>
</drab-prefetch>
```

### Content

The content element is identified in a similar manner. By default, the first element with the `data-content` attribute will be selected.

```html
<drab-dialog>
	<dialog data-content>...</dialog>
</drab-dialog>
```

This can also be customized by adding the `content` attribute, the value will be passed into `querySelector` to identify the content element instead.

```html
<drab-dialog content="dialog">
	<dialog>...</dialog>
</drab-dialog>
```

### Swap

If the element supports swapping the content when the interaction takes place, you can add the `data-swap` attribute to the element that contains the content. Usually it makes sense to use a `<template>` element to hold the swap content so it won't display to the user.

```html
<drab-share value="text">
	<button data-trigger>
		<span data-content>Copy</span>
		<template data-swap>Copied!</template>
	</button>
</drab-share>
```

You can also add the `swap` attribute to the element and use a custom selector just like the `trigger` and `content` attributes.

---

You now have a basic understanding of how the elements function!

To learn how to integrate with your favorite framework, visit the [frameworks](/frameworks/) page, or explore the [individual elements](/elements/dialog/) to see what they can do.
