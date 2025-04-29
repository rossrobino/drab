---
"drab": major
---

YouTube

The `YouTube` element has been removed. This element is better handled with a templating framework than client-side JS, the browser will be able to see the url sooner if it is server rendered so it will load faster.

An [example](http://drab.robino.dev/styles/youtube/) has been added to styles section for reference.

For a more optimized client-side js version see [`paulirish/lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed).

Here's an [example](https://github.com/rossrobino/blog/blob/main/src/lib/youtube-it.ts) of how to create a simple Markdown-It plugin to handle this as well.
