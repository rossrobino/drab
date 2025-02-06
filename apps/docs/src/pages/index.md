# Interactivity for You

## Overview

drab is a JavaScript library of interactive custom elements that can be used on any website.

### Write JavaScript, or don't

- The library can be [installed](http://drab.robino.dev/getting-started/#install) as a package (recommended), or utilized without writing any JavaScript by adding a `<script>` tag to your document.
- Each element can be configured using HTML attributes, making it possible to use an alternative language for your backend. Here's an example of a button that toggles the Fullscreen API.
- Since you provide the HTML, these elements can take advantage of what templating frameworks excel at---creating reusable markup that can be server side rendered.

```html
<drab-fullscreen>
	<button data-trigger type="button">Fullscreen</button>
</drab-fullscreen>
```

### Built on the web platform

- Each element is a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). So you can use them [with a framework](/getting-started/#frameworks), without one, or directly in a markdown file. These components will work [regardless of your project's architecture](https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/).
- drab does _not_ use the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), so you can style content within these elements as usual with CSS.
- Each element can be imported, extended, named, and used however you see fit.

### Minimal bundle size

- drab is [small](https://bundlephobia.com/package/drab), has zero dependencies, and is not built on top of web component framework.

---

## Contributing

Find an bug or have an idea? Create an issue on [GitHub](https://github.com/rossrobino/drab).

Since this is a headless library, simple elements like a badge that can be easily created with HTML and CSS are included in the JavaScript library, there are references to CSS only elements in the styles section. Elements such as a select, or a date picker are also not included in favor of the native HTML elements.

### Local Development

This library is built with [TypeScript](https://www.typescriptlang.org/), this site is built with [domco](https://domco.robino.dev) and [uico](https://uico.robino.dev). The package contents are located in `packages/drab/`.

1. Clone the [repository](https://github.com/rossrobino/drab)
2. Install dependencies with npm - `npm i`
3. Start the development server - `npm run dev`

### Making changes

1. Add or edit the element in `packages/drab/src/`---each element should extend `Base`. Each element has a `index.ts` file with the source code, and then a `define.ts` file where it is imported and defined for convenient usage.
2. Add or edit the example in `apps/docs/pages/`.
3. Export the element from `packages/drab/src/index.ts`.
4. Run `npm run doc` to document your element with [TypeDoc](https://typedoc.org/).
5. Add the element as an entry point to `package.json`, then run `npm run build` to verify your build.
