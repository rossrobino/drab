The [`<details>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) is a standard element designed to hide and show content. Notably, it works without using any JavaScript.

## Animation

You can animate the `<details>` element with discrete transitions the [`interpolate-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) property. This example was adapted from [this article](https://nerdy.dev/6-css-snippets-every-front-end-developer-should-know-in-2025#transition-animation-for-%3Ccode%3E%3Cdetails%3E%3C/code%3E) from Adam Argyle.

## Group

Add the same `name` attribute to each `<details>` element to create a group which can have only one open at a time. Here, `name=accordion` is applied to each element creating an accordion component. If you are making an accordion component using a UI framework, be sure to [generate a unique `name`](<https://svelte.dev/docs/svelte/$props#$props.id()>) for each accordion group added to the page.
