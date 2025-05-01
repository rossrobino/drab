---
"drab": major
---

Share/Copy

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
