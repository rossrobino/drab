---
"drab": major
---

Copy

The `Copy` element has been merged into `Share`. Replace `drab-copy` with `drab-share` and it will function the same with an enhancement---if the value starts with `http`, it will try to share the value before falling back to copy. `Share` works the same as before.

```diff
- <drab-copy value="some text">...</drab-copy>
+ <drab-share value="some text">...</drab-share>
```
