---
title: What is Margin Collapsing in CSS
date: 2024-09-21T00:00:00+08:00
slug: css-margin-collapsing
tags:
  - css
  - web
lastmod: 2024-09-23T10:19:45+08:00
---

Margin collapsing is a feature in the [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout). When an block element comes after another block elements, the bottom margin of the upper element and the top margin of the lower element collapse (merge into a single margin). The larger margin remains, and the smaller margin disappears. If the two margins are equal, one of them remains. Margins don't collapse in a flex container or a grid container.

Example ([live preview](https://jsbin.com/panalarele/1/edit?html,css,output)):

```html
<!-- Margin collapsing example -->
<div class="container">
  <p class="upper">Upper element</p>
  <p class="lower">Lower element</p>
</div>
```

```css
p {
  /* Remove default margins */
  margin: 0;
}

.upper {
  /* Larger margin remains */
  margin-block-end: 50px;
}

.lower {
  /* Smaller margin disappears */
  margin-block-start: 10px;
}

.container {
  border: 1px solid purple;
  /* Margins don't collapse in the flex layout or grid layout */
  /* display: grid; */
}

p {
  border: 1px solid green;
}
```

The bottom margin of the upper element (50px) is larger, so it remains and another margin (10px) disappears. When we add `display: grid;` to the container to make it a grid container, the two margins exist at the same time.

---

Further reading: [Mastering margin collapsing - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)