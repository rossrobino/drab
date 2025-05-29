---
"drab": patch
---

fix: `Dialog` - click-outside-close bug

Original PR was correct in using Math.abs. This fixes the bug where it closes regardless of where it clicks.

This fix also factors in the width of the scrollbar in the calculation and removes the threshold.
