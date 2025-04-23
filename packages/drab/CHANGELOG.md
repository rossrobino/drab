# drab

## 6.3.0

### Minor Changes

- 31f3bb4: feat: Adds `Tabs` element [see documentation](https://drab.robino.dev/elements/tabs/).
- 31f3bb4: feat: `getTrigger` now optionally validates triggers are the expected elements by passing in the expected element's constructor.

## 6.2.2

### Patch Changes

- 62bf211: patch: clean up

  - Removes private class `BaseCopy`, now `Share` just extends `Copy`
  - Cleans up various async methods that should have been synchronous

## 6.2.1

### Patch Changes

- fc2cef0: fix: `Editor` - should trigger currentTarget

## 6.2.0

### Minor Changes

- 3b627e5: feat: `Editor` - `tab + shift` will dedent tab when inside of a codeblock

### Patch Changes

- 7dcb159: `Base` - better type inference for `safeListener`
- 9d858db: fix: `Editor` - remove double push to open chars on key pair type

## 6.1.3

### Patch Changes

- d43f320: `Editor` - dispatch `input` event

## 6.1.2

### Patch Changes

- 4d5c449: fix: stop checking for trimmed block element to repeat only full should repeat to next line

## 6.1.1

### Patch Changes

- 136e024: fix: `Editor` - ordered list increment bug

  Other clean up reduces size of minified packages by about 0.8kb.

## 6.1.0

### Minor Changes

- 593a21a: feat: add `Announcer` custom element

  - Use the `Announcer` element to politely announce changes to screen readers. [View documentation](https://drab.robino.dev/elements/announcer/)
  - In addition, the following interactive elements now announce changes to screen readers through the use of the `Announcer`
    - `Base` - creates a shared `Announcer` element for all elements to utilize, announce a message with the `announce` method
    - `Copy` and `Share` - announces text has been successfully copied
    - `TableSort` - announces the column and sort order upon sort
    - `WakeLock` - announces when the wake lock is activated/deactivated

### Patch Changes

- 9005bfa: types: export trigger attribute helper types

  - `EditorTriggerAttributes`
  - `TableSortTriggerAttributes`

- 00c2e26: a11y: `TableSort` - add `role`, `tabindex`, and default event listeners for keyboard navigation
- 593a21a: qol: in `drab/{element}/define` modules, check to see if the element is already defined before defining

  Instead of this:

  ```ts
  if (!customElements.get("drab-dialog")) {
  	await import("drab/dialog/define");
  }
  ```

  The check happens inside the define module, so this can be imported without checking if the element is defined first.

  ```ts
  await import("drab/dialog/define");
  ```

## 6.0.0

### Major Changes

- 9a625ed: v6.0

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
