# A Headless Custom Element Library

- [Docs](https://drab.robino.dev)
- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)

## About

**drab** focuses on providing JavaScript functionality where it's most useful. Many of the components are helpful wrappers around browser APIs. Here are some of the features of the library.

- Components are minimal in size, **drab** has zero dependencies
- Transitions are disabled for users who prefer reduced motion

This library takes a more opinionated approach compared to some headless UI libraries by providing the basic HTML structure for every component, as well as default positioning for elements like the [sheet](https://drab.robino.dev/docs/Sheet). However, these components can still be further customized using styles, [slots](https://svelte.dev/tutorial/slots), and [slot props](https://svelte.dev/tutorial/slot-props).

Use within md files...

TODO: Figure out attributes and properties

## Install

https://custom-elements-everywhere.com/

```bash
npm i -D drab
```

or script?

## Documentation

The library provides inline documentation for each element using JSDoc, allowing you to conveniently access the documentation by hovering over the custom element's class in your text editor after importing it.

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
