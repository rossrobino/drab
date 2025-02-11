---
"drab": minor
---

feat: add `Announcer` custom element

- Use the `Announcer` element to politely announce changes to screen readers. [View documentation](https://drab.robino.dev/elements/announcer/)
- In addition, the following interactive elements now announce changes to screen readers through the use of the `Announcer`
  - `Base` - creates a shared `Announcer` element for all elements to utilize, announce a message with the `announce` method
  - `Copy` and `Share` - announces text has been successfully copied
  - `TableSort` - announces the column and sort order upon sort
  - `WakeLock` - announces when the wake lock is activated/deactivated
