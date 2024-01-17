# A Headless Custom Element Library

- [Docs](https://drab.robino.dev)
- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)

## Features

**drab** focuses on providing JavaScript functionality where it's most useful. Many of the elements are helpful wrappers around browser APIs. Here are some of the features of the library.

### Built on the web platform

- Each element is a [custom element](TODO), so you can use it with a framework, without one, or even directly in a markdown file.
- https://custom-elements-everywhere.com/
- **drab** does _not_ use the shadow DOM, so you can style content within these elements as usual with CSS.
- Since you provide the HTML, these elements can be easily utilized with server side rendering frameworks.
- Each element can be imported, extended, named, and used however you see fit.

### Minimal bundle size

- **drab** has zero dependencies.

### Write JavaScript, or don't

- Elements can be installed as a package, or utilized without writing any JavaScript by adding a script tag to your document.
- Each element can be configured through HTML attributes.

### Built in animations

- Uses the [web animations API]() for transitions.
- Transitions are disabled for users who prefer reduced motion.
- Extend the `Animate` element to build your own elements.

## Getting started

### Install

You can install **drab** from npm and import the custom elements from the package.

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

## Documentation

The library provides inline documentation for each element using JSDoc, allowing you to conveniently access the documentation by hovering over the custom element's class in your text editor after importing it. Further documentation can be found in

## Styling

Elements without styles can appear rather drab. You have the freedom to bring your own styles to these elements. Since **drab** doesn't use the shadow DOM, you can style any content inside these elements as you normally would. Using unstyled elements allows you to selectively choose what you need and avoid being tied to any specific library.

The examples in this documentation are styled with Tailwind with the [uico](https://uico.robino.dev) and [typography](https://tailwindcss.com/docs/typography-plugin) plugins. Tailwind does not have to be used with this library.

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab). **drab** is meant to house all kinds of components including ones outside of the standard UI elements.

Currently, **drab** has only one dependency - Svelte. Not to say it will never have another, but please consider this when proposing additional functionality. **drab** is meant to make the most of what Svelte and the web platform provide.

Since this is an unstyled library, simple components like a badge that can be easily created with HTML and CSS are not included.

### Local Development

This library is built with [Vite](https://vitejs.dev), [domco](https://domco.robino.dev), and TypeScript. The package contents are located in `src/package`.

#### Make changes

1. Clone the [repository](https://github.com/rossrobino/drab)
2. `bun i`
3. `bun dev`

#### Add or edit a component

revise this

1. Add or edit the component in `src/lib/components/Component.svelte` - if you're adding a new one, copy and paste an existing one to get started with the conventions
2. Add or edit the example in `src/routes/docs/Component/+page.svelte`
3. Document the component with an `@component` comment, include a description, and the `@slots` available. Add a placeholder `@props` and `@example` to the comment. These sections will be generated based on the JSDoc comment above each prop and the example route upon running `bun doc`
4. If new, add the link to `src/site/components/NavItems.svelte`
5. Run `bun package` to verify your build
