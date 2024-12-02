---
title: "box-sizing in CSS: How Width and Height Are Calculated"
date: 2024-09-24T00:00:00+08:00
slug: css-box-sizing
tags:
  - css
  - web
lastmod: 2024-12-02T13:29:00+08:00
---

In CSS, a block element is a box (rectangle) made up of four parts: content, padding, border, and margin. `box-sizing` determines how total width and height of an element is calculated.

![](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png "Box model")

By default (`box-sizing: content-box;`), the `width` property only sets the width of content, which is very unintuitive. When you set `width: 100%` and `border` to a element, it becomes wider than the parent element and its border extends beyond the parent element.

```html
<div class="container">Parent
  <div class="child">Child</div>
</div>
```

```css
.container {
  width: 100px;
  height: 100px;
  outline: 1px solid green;
}
.child {
  width: 100%;
  border: 10px solid blue;
  box-sizing: content-box;
}
```

If we use `box-sizing: border-box` on the child element, the `width` property sets the width of content, padding and border, so the child element won't be wider than the parent element.

It's recommended to set `border-box` to all elements to avoid pitfalls about width and height.

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

Further reading:

- [The box model - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [box-sizing - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [Inheriting Box-sizing Probably Slightly Better Best-Practice | CSS-Tricks](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)

---

Image source: the image used in this post is from [The box model - Learn web development | MDN#what_is_the_css_box_model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model#what_is_the_css_box_model).
