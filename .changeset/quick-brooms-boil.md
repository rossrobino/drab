---
"drab": major
---

v6.0

Version 6 optimizes the library in a variety of ways and removes some elements that are no longer necessary due to advances in CSS.

drab has a new documentation site with a `styles` section that is a reference for how to create components with HTML. The removed `Details` and `Popover` elements now live in this section since they do not require JavaScript to be created.

#### Breaking changes

##### Overall

- Attribute types no longer include every method on the JS element, only the attributes you can set on it.
- Only unbundled ESM is published to npm now. IIFE files are no longer published, CDNs like jsdelivr already take care of the bundling and minification for users who want to just use a script tag.

##### Elements

`Animate`

- This element has been removed in favor of [CSS animations](https://drab.robino.dev/styles/popover/), with `starting-style` and `discrete` animations, it's now possible to animate from `display: none`, making the animations within drab obsolete. This greatly reduces the bundle size of the package and removes the odd animation attribute syntax.

`Base`

- `swapContent` now takes one argument - `revert` set to the delay in ms or `false` to not revert back to the old content.

`Breakpoint`

- The `Breakpoint` element has been removed, the same information can easily be found in dev tools.

`Details`

- The `Details` element has been removed, it's now possible to animate entirely with CSS. See the style [example here](https://drab.robino.dev/styles/details/).

`Fullscreen`

- `#fullscreenSupported` is now a private method.

`Popover`

- The `Popover` element has been removed, it's now possible to animate entirely with CSS. See the style [example here](https://drab.robino.dev/styles/popover/).

#### Patch changes

- Export attributes as `type`
- Add `override` to methods that override the base/animate
- Refactor define all to use `Object.entries`
