# An unstyled Svelte component library

- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)
- One dependency - [Svelte](https://svelte.dev)

## About

While these components without styles can appear rather plain, having many websites look similar can also lead to a monotonous visual experience. In both cases, the word "drab" becomes quite fitting. You bring the styles for these components! Using unstyled components allows you to pick and choose what you need, without getting locked in to any particular library.

Components can be styled by [using global styles](https://joyofcode.xyz/global-styles-in-sveltekit). This can be fast-tracked with CSS frameworks like [TailwindCSS](https://tailwindcss.com/), Tailwind builds a global stylesheet based on the utility classes used in the project. Each component exports `class` and `id` props to utilize for this purpose.

This library is designed to provide JavaScript functionality where it makes sense. Components that can be more easily created by using HTML, such as a label or a text input, are not included. Components are progressively enhanced or provide a fallback [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) message wherever feasible. Transitions are disabled if the user prefers reduced motion.

## Install

- [SvelteKit](https://kit.svelte.dev)
- [Astro](https://docs.astro.build/en/tutorial/1-setup/2/)
- [Vite](https://vitejs.dev/guide/)

```bash
npm install -D drab
```

## Documentation

Components are documented inline, hover over the component in a text editor after importing to see the documentation. Each prop is documented with JSDoc and TypeScript, hover over the prop to get the type and description.

These docs use the [TailwindCSS Typography plugin](https://tailwindcss.com/docs/typography-plugin) for base styles along with a few custom utility classes you can find [here](https://github.com/rossrobino/drab/blob/main/src/app.postcss).
