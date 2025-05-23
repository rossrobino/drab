---
title: Contributing
description: How to contribute to drab.
---

# Contributing

Find an bug or have an idea? Create an issue on [GitHub](https://github.com/rossrobino/drab).

drab is licensed under the [MIT License](https://github.com/rossrobino/drab/blob/main/LICENSE.md).

Since this is a headless library, simple elements like a badge that can be easily created with HTML and CSS are not included in the JavaScript library, there are references to [CSS only elements](/styles/details/) in the styles section.

## Local development

This library is built with TypeScript, the documentation site is built with Vite.

To set up your development environment locally you'll need to have NodeJS installed on your computer. Then follow these steps:

1. Clone the [repository](https://github.com/rossrobino/drab).
2. Install dependencies with npm.
3. Start the development server, this will start `tsc` and `vite dev` together when run from the root directory.

```bash
git clone https://github.com/rossrobino/drab.git
cd drab
npm i
npm run dev
```

## Making changes

1. Each element is housed in `packages/drab/src/`---in most cases, each element extends a combinations of mixins from `drab/base`.
2. Each element also has a `define.ts` file where it is imported and defined.
3. Examples demos are contained in `apps/docs/pages/`.
4. For new elements:
   1. Export the element from `packages/drab/src/index.ts`.
   2. Import the `define` module in `packages/drab/src/define.ts`.
   3. Add the element's attribute types to `packages/drab/src/types/index.ts`.
   4. Add the element's entry points to `package.json`.
5. Run `npm run doc` to document your element with [TypeDoc](https://typedoc.org/).
6. Run `npm run build && npm run preview` to verify your build.
