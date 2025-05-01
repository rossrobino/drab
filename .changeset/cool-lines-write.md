---
"drab": major
---

Intersect

Instead of `onIntersect` and `onExit` methods, the `Intersect` element now fires the `intersect` and `exit` custom events instead. If you were using these methods via JavaScript you'll need to update your code to listen for the custom event instead of using the methods. If you aren't using these methods via JavaScript, no changes are needed.

```diff
- intersect.onIntersect(() => {
- 	console.log("intersected");
- });

+ intersect.addEventListener("intersect", () => {
+ 	console.log("intersected");
+ });
```
