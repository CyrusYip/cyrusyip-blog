---
title: Introduction to Inheritance in CSS
date: 2024-09-23T00:00:00+08:00
slug: css-inheritance
tags:
  - css
  - web
lastmod: 2024-09-24T14:57:00+08:00
---

Elements inherit some CSS properties from their ancestors. You can check whether a property is inherited in the formal definition section on MDN, e.g. [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width#formal_definition) and [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color#formal_definition).

```html
<div class="grandparent">
  <div class="parent">
    <div class="child">I inherit the green color from my parent, and the italic style from my grandparent. I don't inherit the border.</div>
  </div>
</div>
```

```css
.grandparent {
  font-style: italic;
  border: 2px solid black; /* not inherited */
}
.parent {
  color: green;  
}
```

CSS provides five universal property values to control inheritance.

- [`inherit`](https://developer.mozilla.org/en-US/docs/Web/CSS/inherit)
- [`initial`](https://developer.mozilla.org/en-US/docs/Web/CSS/initial)
- [`revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)
- [`revert-layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/revert-layer)
- [`unset`](https://developer.mozilla.org/en-US/docs/Web/CSS/unset)

The CSS shorthand property [`all`](https://developer.mozilla.org/en-US/docs/Web/CSS/all) applies one of these values to all properties of an element.