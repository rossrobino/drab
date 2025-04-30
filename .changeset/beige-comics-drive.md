---
"drab": major
---

Private fields

The following elements have fields that are now private (can't be accessed via JS). This allows the library to minify smaller and have less breaking changes in the future.

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
- Wakelock
  - `wakeLock`
