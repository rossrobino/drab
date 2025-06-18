# drab

## 7.0.1

### Patch Changes

- 3ac680f: fix: `Dialog` - click-outside-close bug

  Original PR was correct in using Math.abs. This fixes the bug where it closes regardless of where it clicks.

  This fix also factors in the width of the scrollbar in the calculation and removes the threshold.

## 7.0.0

### Major Changes

- 162382e: Private/removed properties

  The following elements have properties that are now private (can't be accessed via JS) or removed. This allows the library to minify smaller and have less breaking changes in the future.

  - Dialog
    - `dialog`
  - Editor
    - `text`
    - `textArea`
    - `keyPairs`
  - Fullscreen
    - `isFullscreen`
  - Prefetch
    - `appendTag`
  - Share
    - `value`
    - `share`
  - Wakelock
    - `wakeLock`

- 162382e: Intersect

  Instead of `onIntersect` and `onExit` methods, the `Intersect` element now fires the `intersect` and `exit` custom events instead. If you were using these methods via JavaScript you'll need to update your code to listen for the custom event instead of using the methods. If you aren't using these methods via JavaScript, no changes are needed.

  ```diff
  - intersect.onIntersect(() => {
  - 	console.log("intersected");
  - });

  + intersect.addEventListener("intersect", () => {
  + 	console.log("intersected");
  + });
  ```

- 162382e: YouTube

  The `YouTube` element has been removed. This element is better handled with a templating framework than client-side JS, the browser will be able to see the url sooner if it is server rendered so it will load faster.

  Here's the generated `<iframe>` element and the [supported parameters](https://developers.google.com/youtube/player_parameters#Parameters) for reference:

  ```html
  <iframe
  	loading="lazy"
  	title="Renegade - Kevin Olusola"
  	src="https://www.youtube-nocookie.com/embed/gouiY85kD2o"
  	allowfullscreen
  	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  ></iframe>
  ```

  For a more optimized client-side js version see [`paulirish/lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed).

  Here's an [example](https://github.com/rossrobino/blog/blob/main/src/lib/youtube-it.ts) of how to create a simple Markdown-It plugin to handle this as well.

- 162382e: Base

  If you are only using drab via HTML none of these changes to `Base` will affect the functionality of any elements. Please read other sections for possible breaking changes as some elements have been merged or removed.

  ### Mixins

  drab now uses mixins to construct each element instead of a singular `Base` class. This ensures each element only includes the base features that it needs.

  The main breaking change is the `Base` class has been removed along with the `drab/base/define` entry point.

  If you were extending `Base` and creating your own elements you now can use the mixins to use only the features from `Base` that are required. Or, you can recreate `Base` with all the mixins to have the same class as before.

  ```ts
  import { Announce, Content, Lifecycle, Trigger } from "drab/base";

  // everything - same as the v6 Base
  class Base extends Lifecycle(Trigger(Content(Announce()))) {
  	// ...
  }

  // for example, if only the lifecycle and trigger features are needed
  // just extends the mixins that are required
  class LifecycleAndTriggerOnly extends Lifecycle(Trigger()) {
  	// ...
  }
  ```

  There could be an edge case where you were using a feature of `Base` through another element that doesn't require the feature. Since each element only uses the mixins that it needs now, you'll need to add the mixin with your feature to keep using the feature from `Base`. For example, if you were getting some content via the `Prefetch` element, you'll now need to wrap `Prefetch` with the `Content` mixin to maintain the same functionality as before.

  ```ts
  import { Content } from "drab/base";
  import { Prefetch } from "drab/prefetch";

  class PrefetchWithContent extends Content(Prefetch) {
  	content = this.getContent(); // adds the `getContent` method back in

  	// ...
  }
  ```

  ### Renaming

  The following methods were renamed within the corresponding mixins of the `Base` class.

  - `getTrigger` => `triggers`
  - `triggerListener` => `listener`
  - `getContent` => `content`
  - `swapContent` => `swap`

  ### listener argument order

  In addition to the name change, `listener` has been updated to use overloads so the `type` can be passed in as the first argument instead of the second be more consistent with `addEventListener`.

  ```diff
  - el.triggerListener(() => console.log("hello"), "click", options);
  + el.listener("click", () => console.log("hello"), options);
  ```

  Using without a `type` will still default to `this.event`.

- 162382e: Share/Copy

  `Share` now has three attributes:

  - `url`: URL to share.
  - `text`: Text to copy, or the `ShareData` text if `url` is set (only supported on some targets).
  - `share-title`: `ShareData` title (only supported on some targets).

  Update the `value` attribute to `url`.

  ```diff
  - <drab-share value="https://...">...</drab-share>
  + <drab-share url="https://...">...</drab-share>
  ```

  The `Copy` element has been merged into `Share`. Replace `drab-copy` with `drab-share` and it will function the same with an enhancement---if a `url` is provided, it will try to share the url before falling back to copy. If `text` it provided without a `url` it will function exactly the same.

  ```diff
  - <drab-copy value="some text">...</drab-copy>
  + <drab-share text="some text">...</drab-share>
  ```

### Minor Changes

- 162382e: feat: `drab/types`

  Easily define all custom elements JSX types + attributes with the new `Elements` type exported from `drab/types`.

  [Framework examples](https://drab.robino.dev/frameworks/)

  For example in React:

  ```ts
  // drab.d.ts
  import type { Elements } from "drab/types";
  import type { HTMLAttributes } from "react";

  declare module "react" {
  	namespace JSX {
  		interface IntrinsicElements
  			extends Elements<HTMLAttributes<HTMLElement>> {}
  	}
  }
  ```

## 6.5.1

### Patch Changes

- cd3477c: fix: add drab/tabs entry point

## 6.5.0

### Minor Changes

- d99f996: feat: allow close on outside click when dialog cover full viewport

## 6.4.1

### Patch Changes

- 4899b76: fix: dialog regression body margin bug

## 6.4.0

### Minor Changes

- f0700a3: feat: Base mixins

  Creates the `Base` class with mixins to be more composable, thanks to [Carlos Verdes](https://github.com/rossrobino/drab/issues/29) for the suggestion.

  Four mixins are now exported from `drab/base`: `Trigger`, `Content`, `Lifecycle`, and `Announce`.

  Now users can create their own custom elements using only the features they need:

  ```ts
  import { Lifecycle, Trigger } from "drab/base";

  class MyCustomElement extends Trigger(Lifecycle(HTMLElement)) {
  	constructor() {
  		super();
  	}

  	override mount() {
  		this.triggerListener(() => alert("hello world"));
  	}
  }
  ```

  No breaking changes for now, in a future major other elements might use these mixins based on the features required and `Base` will be removed.

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
