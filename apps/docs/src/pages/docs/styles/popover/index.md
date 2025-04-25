The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) allows websites to show/hide content without using any JavaScript. Add the `popover` attribute and a unique `id` to any element to make it a popover. Then create a trigger by adding a `<button>` with the `popovertarget` attribute set to the same `id`.

## Animation

With [`transition behavior: allow-discrete`](https://tailwindcss.com/docs/transition-behavior#basic-example), you can animate the popover entirely with CSS.
