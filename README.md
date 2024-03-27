# A Headless Custom Element Library

## Features

**drab** focuses on providing JavaScript functionality where it's most useful. Many of the elements are helpful wrappers around browser APIs. Here are some of the features of the library.

### Built on the web platform

- Each element is a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). So you can use them [with a framework](http://drab.robino.dev/getting-started/#frameworks), without one, or even directly in a markdown file. These components will work [regardless of your project's architecture](https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/).
- **drab** does _not_ use the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), so you can style content within these elements as usual with CSS.
- Since you provide the HTML, these elements can take advantage of what JavaScript frameworks excel at---creating reusable markup that can be server side rendered.
- Each element can be imported, extended, named, and used however you see fit.

### Minimal bundle size

- **drab** has zero dependencies.

### Write JavaScript, or don't

- Elements can be [installed](http://drab.robino.dev/getting-started/#install) as a package (recommended), or utilized without writing any JavaScript by adding a `script` tag to your document.
- Each element can be configured through HTML attributes, making it possible to use an alternative language for your backend.

### Built in animations

- Uses the [web animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) for transitions.
- Transitions are disabled for users who prefer reduced motion.
- Extend the `Animate` element to build your own elements.

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab).

Since this is an headless library, simple elements like a badge that can be easily created with HTML and CSS are not included. Elements such as a select, or a date picker are also not included in favor of the native HTML elements.

### Local Development

This library is built with [TypeScript](https://www.typescriptlang.org/) and [tsup](https://tsup.egoist.dev/). The docs are built with [Vite](https://vitejs.dev), [domco](https://domco.robino.dev), and [TailwindCSS](https://tailwindcss.com). The package contents are located in `src/package`.

1. Clone the [repository](https://github.com/rossrobino/drab)
2. `bun i`
3. `bun dev`

### Making changes

1. Add or edit the element in `src/package`---each element should extend `Base` or `Animate`. Each element has a `index.ts` file with the source code, and then a `define.ts` file where it is imported and called for use with a CDN.
2. Add or edit the example in `src/docs`.
3. Export the element from `src/package/index.ts`.
4. Run `bun doc` to document your element with [TypeDoc](https://typedoc.org/).
5. Add the element as an entry point to `tsup.config.ts`, then run `bun package` to build with tsup.
