---
title: Contributing
description: How to contribute to drab.
---

# Contributing

Find an bug or have an idea? Create an issue on [GitHub](https://github.com/rossrobino/drab).

Since this is a headless library, simple elements like a badge that can be easily created with HTML and CSS are included in the JavaScript library, there are references to [CSS only elements](/styles/details/) in the styles section. Elements such as a select, or a date picker are also not included in favor of the native HTML elements.

## Local development

This library is built with [TypeScript](https://www.typescriptlang.org/), this site is built with [domco](https://domco.robino.dev) and [uico](https://uico.robino.dev). The package contents are located in `packages/drab/`.

1. Clone the [repository](https://github.com/rossrobino/drab)
2. Install dependencies with npm
3. Start the development server

```bash
git clone https://github.com/rossrobino/drab.git
cd drab
npm i
npm run dev
```

## Making changes

1. Add or edit the element in `packages/drab/src/`---each element should extend `Base`.
2. Each element has a `index.ts` file with the source code, and then a `define.ts` file where it is imported and defined.
3. Add or edit the example in `apps/docs/pages/`.
4. Export the element from `packages/drab/src/index.ts`.
5. Run `npm run doc` to document your element with [TypeDoc](https://typedoc.org/).
6. Add the element as an entry point to `package.json`.
7. Run `npm run build` to verify your build.
