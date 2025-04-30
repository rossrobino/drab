---
"drab": major
---

Private members

The following elements have members that are now private (can't be accessed via JS). This allows the library to minify smaller and have less breaking changes in the future.

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
