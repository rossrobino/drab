# An Unstyled Svelte Component Library

- [Docs](https://drab.robino.dev)
- [GitHub](https://github.com/rossrobino/drab)
- [npm](https://www.npmjs.com/package/drab)
- [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md)

## About

**drab** focuses on providing JavaScript functionality where it's most useful. Many of the components are helpful wrappers around browser APIs. Whenever possible, components are [progressively enhanced](https://drab.robino.dev/docs/ShareButton) or provide a fallback [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) message. Additionally, transitions are disabled for users who prefer reduced motion.

This library takes a more opinionated approach compared to some headless UI libraries by providing the basic HTML structure for every component, as well as default positioning for elements like the [sheet](https://drab.robino.dev/docs/Sheet). However, these components can still be further customized using styles, [slots](https://svelte.dev/tutorial/slots), and [slot props](https://svelte.dev/tutorial/slot-props).

## Install

If you haven't used Svelte before, start with the [tutorial](https://svelte.dev/tutorial/basics). **drab** works anywhere Svelte does.

- [SvelteKit](https://kit.svelte.dev)
- [Astro](https://docs.astro.build/en/tutorial/1-setup/2/)
- [Vite](https://vitejs.dev/guide/)

```bash
npm install -D drab
```

## Documentation

The library provides inline documentation for each component, allowing you to conveniently access the documentation by hovering over the component in your text editor after importing it. Additionally, every prop is documented using JSDoc and TypeScript. By hovering over a prop, you can retrieve its type and description.

These docs use the [TailwindCSS Typography plugin](https://tailwindcss.com/docs/typography-plugin). Styles on this site are based on [shadcn/ui](https://ui.shadcn.com/).

## Other UI Libraries

**drab** is a collection of useful components, not a complete UI kit. If **drab** isn't what you are looking for, here are some other libraries to check out.

- [Skeleton](https://skeleton.dev)
- [Melt UI](https://www.melt-ui.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Svelte-HeadlessUI](https://captaincodeman.github.io/svelte-headlessui/)

## Styling

Components without styles can appear rather drab. You have the freedom to bring your own styles to these components. Using unstyled components allows you to selectively choose what you need and avoid being tied to any specific library.

To style the markup provided by the components, you can make use of [global styles](https://joyofcode.xyz/global-styles-in-sveltekit). Each component exports `class` and `id` props that can be leveraged for this purpose. This process can be expedited by utilizing CSS frameworks like [TailwindCSS](https://tailwindcss.com/). Tailwind generates a global stylesheet based on the utility classes used in your project. The examples in this documentation are styled with Tailwind classes, but Tailwind does not have to be used with this library.

### Stylesheet

Here's a SvelteKit example using CSS imported in a layout. By using a layout, these styles can be accessed anywhere.

```css
/* src/app.css */
.button {
	border-radius: 5px;
	background-color: black;
	padding: 5px;
	color: white;
}
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import "../app.css";
</script>

<slot />
```

```svelte
<!-- src/routes/+page.svelte -->
<script>
	import { FullscreenButton } from "drab";
</script>

<FullscreenButton class="button" />
```

### Global modifier

Alternatively, the [`:global()` modifier](https://svelte.dev/docs/svelte-components#style) can be used instead of a separate stylesheet.

```svelte
<!-- src/routes/+page.svelte -->
<script>
	import { FullscreenButton } from "drab";
</script>

<FullscreenButton class="button" />

<style>
	:global(.button) {
		border-radius: 5px;
		background-color: black;
		padding: 5px;
		color: white;
	}
</style>
```

## Contributing

Find an bug or have an idea? Feel free to create an issue on [GitHub](https://github.com/rossrobino/drab). **drab** is meant to house all kinds of components including ones outside of the standard UI elements.

Currently, **drab** has only one dependency - Svelte. Not to say it will never have another, but please consider this when proposing additional functionality. **drab** is meant to make the most of what Svelte and the web platform provide.

Since this is an unstyled library, simple components like a badge that can be easily created with HTML and CSS are not included.

### Local Development

Contribute to the project, or use **drab** as a template for another component library. This library is built with SvelteKit, TypeScript, and npm. The package contents are located in `src/lib`, the site is contained within `src/routes` and `src/site`. If you are using this project as a template, be sure to [update the adapter](https://kit.svelte.dev/docs/adapters) based on how you deploy.

#### Make changes

1. Clone the [repository](https://github.com/rossrobino/drab)
2. `npm install`
3. `npm run dev -- --open`

#### Add or edit a component

1. Add or edit the component in `src/lib/components/Component.svelte` - if you're adding a new one, copy and paste an existing one to get started with the conventions
2. Add or edit the example in `src/routes/docs/Component/+page.svelte`
3. Document the component with an `@component` comment, include a description, and the `@slots` available. Add a placeholder `@props` and `@example` to the comment. These sections will be generated based on the JSDoc comment above each prop and the example route upon running `npm run doc`
4. If new, add the link to `src/site/components/NavItems.svelte`
5. Run `npm run build` to verify your build
