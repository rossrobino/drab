# An unstyled Svelte component library

- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)
- One dependency - [Svelte](https://svelte.dev)

## About

**drab** focuses on providing JavaScript functionality where it's most useful, while leaving out components that can be easily created using HTML, such as a label or badge. Whenever possible, components are [progressively enhanced](/docs/ShareButton) or provide a fallback [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) message. Additionally, transitions are disabled for users who prefer reduced motion.

This library takes a more opinionated approach compared to some headless UI libraries by providing the basic HTML structure for every component, as well as default positioning for elements like the [sheet](/docs/Sheet) or [popover](/docs/Popover). However, these components can still be further customized using styles, [slots](https://svelte.dev/tutorial/slots), and [slot props](https://svelte.dev/tutorial/slot-props).

Components without styles can appear rather drab. You have the freedom to bring your own styles to these components! Using unstyled components allows you to selectively choose what you need, seamlessly integrate with existing designs, and avoid being tied to any specific library.

To style the components, you can make use of [global styles](https://joyofcode.xyz/global-styles-in-sveltekit). This process can be expedited by utilizing CSS frameworks like [TailwindCSS](https://tailwindcss.com/). TailwindCSS generates a global stylesheet based on the utility classes used in your project. Each component exports `class` and `id` props that can be leveraged for this purpose.

## Install

If you haven't used Svelte before, start with the [tutorial](https://svelte.dev/tutorial/basics).

- [SvelteKit](https://kit.svelte.dev)
- [Astro](https://docs.astro.build/en/tutorial/1-setup/2/)
- [Vite](https://vitejs.dev/guide/)

```bash
npm install -D drab
```

## Documentation

The library provides inline documentation for each component, allowing you to conveniently access the documentation by hovering over the component in your text editor after importing it. Additionally, every prop is documented using JSDoc and TypeScript. By hovering over a prop, you can retrieve its type and description.

These docs use the [TailwindCSS Typography plugin](https://tailwindcss.com/docs/typography-plugin) for base styles along with a few custom utility classes you can find [here](https://github.com/rossrobino/drab/blob/main/src/app.postcss). Styles on this site are based on [shadcn/ui](https://ui.shadcn.com/).

## Alternatives

If **drab** isn't what you are looking for, here are some other Svelte UI libraries to check out.

- [Skeleton](https://skeleton.dev)
- [Melt UI](https://www.melt-ui.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Svelte-HeadlessUI](https://captaincodeman.github.io/svelte-headlessui/)

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab).

Since this is an unstyled library, simple components like a badge that can be easily created with HTML and CSS are not included.

### Local Development

Contribute to the project, or use **drab** as a template for another component library. This library is built with SvelteKit, TypeScript, and npm. The package contents are located in `src/lib`, the site is contained within `src/routes` and `src/site`. The site is deployed to Vercel using `@sveltejs/adapter-vercel` on their Edge Runtime. If you are using this project as a template, be sure to [update the adapter](https://kit.svelte.dev/docs/adapters) based on how you deploy.

#### Make changes

1. Clone the [repository](https://github.com/rossrobino/drab)
2. `npm install`
3. `npm run dev -- --open`

#### Add or edit a component

1. Add/edit the component in `src/lib/components/Component.svelte`, if you're adding a new one, copy and paste an existing one to get started with the conventions
2. Add/edit the example in `src/routes/docs/Component/+page.svelte`
3. Document the component with an `@component` comment, include a description, and the `@slots` available. Add a placeholder `@props` and `@example` to the comment. These sections will be generated based on the JSDoc comment above each prop and the example route created upon running `npm run doc`
4. If new, add the link to `src/site/components/NavItems.svelte`
5. Run `npm run build` to verify your build
