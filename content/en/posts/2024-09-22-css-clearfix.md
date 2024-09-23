---
title: What is Clearfix in CSS
date: 2024-09-22T00:00:00+08:00
slug: css-clearfix
tags:
  - css
  - web
lastmod: 2024-09-23T10:32:45+08:00
---

[Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) can be used to lay out elements. Clearfix is a method used to fix the zero-height container issue caused by floated elements.

Here is an example of arranging items vertically using float ([live preview](https://jsbin.com/covagehexa/1/edit?html,css,output)):

```html
<div class="container clearfix">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
</div>
<div class="outer">outer element</div>
```

```css
.item {
  border: 1px solid red;
  width: 60px;
  height: 60px;
  float: left;
}

.container {
  border: 1px solid green;
}
```

Three items are properly arranged, but the outer element is at the right side of item3.

```
item1 | item2 | item3 | outer element
```

The outer element should be under all items.

```
item1 | item2 | item3 |

outer element
```

Since three items are floated, they are removed from the [normal flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow). As a result, `.container` contains nothing, so its height is 0. That's why the outer element isn't under three items. Here is the classic method for fixing the height:

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

Breakdown:

- `.clearfix::after` creates an element and append it to `.clearfix` (`.container`)
- `content: '';` means the element is empty.
- `display: block;` means the element is a block element.
- `clear: both;` puts the element under left floated elements and right floated elements.
- Since `.clearfix` (`.container`) has an element now, its height becomes normal.
- You can see the element by applying `content: 'hi'`.

The classic method is obsolete and difficult to understand. Here is the modern and simpler method:

```css
.clearfix {
  display: flow-root;
}
```

`display: flow-root` makes the container establish a block formatting context, which contains internal floated elements. For more details on block formatting context, see [What is Block Formatting Context (BFC) in CSS](/en/posts/2024/09/22/css-block-formatting-context/).

---

Note that float layout is hacky and obsolete. Use flexbox or grid instead.