# An unstyled Svelte component library

- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)
- One dependency - [Svelte](https://svelte.dev)

## About

This library focuses on providing JavaScript functionality where it's most useful, while leaving out components that can be easily created using HTML, such as labels or text inputs. Whenever possible, components are progressively enhanced or provide a fallback [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) message. Additionally, transitions are disabled for users who prefer reduced motion.

Drab takes a more opinionated approach compared to other headless libraries by providing the basic HTML structure for every component, as well as default positioning for elements like the [sheet](/docs/Sheet) or [popover](/docs/Popover). However, these components can still be further customized using [slots](https://svelte.dev/tutorial/slots) and [slot props](https://svelte.dev/tutorial/slot-props).

While these components without styles can appear rather plain, having many websites look similar can also lead to a monotonous visual experience. In both cases, the word "drab" becomes quite fitting. You have the freedom to bring your own styles to these components! Using unstyled components allows you to selectively choose what you need, seamlessly integrate with existing designs, and avoid being tied to any specific library.

To style the components, you can make use of [global styles](https://joyofcode.xyz/global-styles-in-sveltekit). This process can be expedited by utilizing CSS frameworks like [TailwindCSS](https://tailwindcss.com/). TailwindCSS generates a global stylesheet based on the utility classes used in your project. Each component exports `class` and `id` props that can be leveraged for this purpose.

## Install

- [SvelteKit](https://kit.svelte.dev)
- [Astro](https://docs.astro.build/en/tutorial/1-setup/2/)
- [Vite](https://vitejs.dev/guide/)

```bash
npm install -D drab
```

## Documentation

The library provides inline documentation for each component, allowing you to conveniently access the documentation by hovering over the component in your text editor after importing it. Additionally, every prop is thoroughly documented using JSDoc and TypeScript. By hovering over a prop, you can retrieve its type and description.

These docs use the [TailwindCSS Typography plugin](https://tailwindcss.com/docs/typography-plugin) for base styles along with a few custom utility classes you can find [here](https://github.com/rossrobino/drab/blob/main/src/app.postcss).

## Alternatives

If drab isn't what you are looking for, here are some other Svelte UI libraries to check out.

- [Skeleton](https://skeleton.dev)
- [Melt UI](https://www.melt-ui.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Svelte-HeadlessUI](https://captaincodeman.github.io/svelte-headlessui/)

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab).
