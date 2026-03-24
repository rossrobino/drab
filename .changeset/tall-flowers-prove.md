---
"drab": major
---

Remove `Dialog`, `drab/dialog`, and `drab/dialog/define`.

Migrate from `drab-dialog`...

```html
<drab-dialog click-outside-close>
	<button data-trigger type="button">Show</button>
	<dialog data-content>
		<button data-trigger type="button">Close</button>
	</dialog>
</drab-dialog>
```

...to the Invoker Commands API.

```html
<button commandfor="dialog" command="show-modal" type="button">Show</button>
<dialog id="dialog" closedby="any">
	<button commandfor="dialog" command="close" type="button">Close</button>
</dialog>
```

Attribute changes:

- Remove `click-outside-close` from `drab-dialog`; add `closedby="any"` to the native `<dialog>` when you want outside clicks to close it.
- Remove `data-trigger` from open and close buttons; add `commandfor="<dialog-id>"` and `command="show-modal"` or `command="close"`.
- Remove `data-content` from `<dialog>`; add an `id` so invoker buttons can target it.

[See demo of the HTML/CSS only version](https://drab.robino.dev/styles/dialog/)
