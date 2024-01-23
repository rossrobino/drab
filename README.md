# A Headless Custom Element Library

- [Docs](https://drab.robino.dev)
- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)

## Features

https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/

**drab** focuses on providing JavaScript functionality where it's most useful. Many of the elements are helpful wrappers around browser APIs. Here are some of the features of the library.

### Built on the web platform

- Each element is a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), so you can use it [with a framework](https://custom-elements-everywhere.com/), without one, or even directly in a markdown file.
- **drab** does _not_ use the shadow DOM, so you can style content within these elements as usual with CSS.
- Since you provide the HTML, these elements can be easily utilized with server side rendering frameworks.
- Each element can be imported, extended, named, and used however you see fit.

### Minimal bundle size

- **drab** has zero dependencies.

### Write JavaScript, or don't

- Elements can be installed as a package, or utilized without writing any JavaScript by adding a script tag to your document.
- Each element can be configured through HTML attributes.

### Built in animations

- Uses the [web animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) for transitions.
- Transitions are disabled for users who prefer reduced motion.
- Extend the `Animate` element to build your own elements.

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab).

Since this is an headless library, simple components like a badge that can be easily created with HTML and CSS are not included.

### Local Development

This library is built with [Vite](https://vitejs.dev), [domco](https://domco.robino.dev), and TypeScript. The package contents are located in `src/package`.

#### Make changes

1. Clone the [repository](https://github.com/rossrobino/drab)
2. `bun i`
3. `bun dev`

#### Add or edit a component

1. Add or edit the component in `src/package` - each element should extend `Base` or `Animate`.
2. Add or edit the example in `src/docs`.
3. Run `bun package` to verify your build
