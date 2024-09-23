---
title: What is Block Formatting Context (BFC) in CSS
date: 2024-09-22T00:00:00+08:00
slug: css-block-formatting-context
tags:
  - css
  - web
lastmod: 2024-09-22T00:00:00+08:00
---

Block Formatting Context (BFC) is a mini layout in the page. When an element establishes a BFC, it:

- includes internal floated elements
- exclude external floated elements
- suppresses margin collapsing

A BFC is created in many situations, see [Block formatting context - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context). The simplest way to create a BFC is `display: flow-root`.

Here is an example of excluding external floated elements ([live preview](https://jsbin.com/bazarocomo/1/edit?html,css,output)):

```html
<div class="container">
  <div class="float">I am floated element.</div>
  <div class="content">I am content inside the container. I include the floated element.</div>
</div>
<hr>
<div class="container">
  <div class="float">I am floated element.</div>
  <div class="content flow-root">I am content inside the container. I have a BFC. I exclude the floated elements.</div>
</div>
```

```css
.float {
  float: left;
  border: 5px solid green;
}

.content {
  border: 5px solid blue;
}

.container {
  border: 5px solid red;
}

.content.flow-root {
  display: flow-root;
}
```

---

Further reading:

- [Block formatting context - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context)
- [Introduction to formatting contexts - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout/Introduction_to_formatting_contexts)