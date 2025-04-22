---
"drab": patch
---

patch: clean up

- Removes private class `BaseCopy`, now `Share` just extends `Copy`
- Cleans up various async methods that should have been synchronous
