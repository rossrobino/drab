---
title: drab
description: Interactivity for You
---

# Interactivity for You

drab is a JavaScript library of interactive primitives designed to work on any website.

## Write JavaScript, or don't

drab adds interactivity by enhancing your markup with custom elements. Each element is configured using HTML attributes, making it compatible with any backend or templating system. For example, this button toggles fullscreen mode:

```html
<drab-fullscreen>
	<button data-trigger type="button">Fullscreen</button>
</drab-fullscreen>
```

## Features

- Each element is a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). So you can use them [with a framework](/getting-started/#frameworks), without one, or directly in a markdown file. These components will work [regardless of your project's architecture](https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/).
- drab does **_not_** use the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), so you can style content within these elements as usual with CSS.
- If you are writing JavaScript, each element can be extended or renamed to be used however you see fit.
- The library is [small](https://bundlephobia.com/package/drab), with zero dependencies.
- drab is not built on top of a web component framework.

<a class="button" href="/getting-started/">Get Started</a>
