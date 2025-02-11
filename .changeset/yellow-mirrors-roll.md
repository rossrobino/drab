---
"drab": patch
---

qol: in `drab/{element}/define` modules, check to see if the element is already defined before defining

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
