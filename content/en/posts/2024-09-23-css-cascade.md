---
title: Introduction to Cascade in CSS
date: 2024-09-23T00:00:00+08:00
slug: css-cascade
tags:
  - css
  - web
lastmod: 2024-09-23T00:00:00+08:00
---

The cascade is the algorithm that determines the correct rule when multiple CSS rules apply to an HTML element.

The cascade is determined by several factors (from least important to most important):

1. source order (least important)
1. specificity
    1. type
    1. class
    1. id
1. inline styles
1. `!important` (most important)

## Source order

Later declared rules override previous rules.

```
<p>Hello, world!</p>
```

```css
p {
  color: green;
}
p {
  /* This rule wins */
  color: blue;
}
```

## Specificity

Specificity determines the importance of a selector. In general, the more specific a selector is, the more weight is has.

For example, an id selector is more specific than a type selector, so the id selector has more weight.

```html
<p id="p">Hello, world!</p>
```

```css
#p {
  /* This rule wins */
  color: green;
}
p {
  color: blue;
}
```

### Specificity calculation

The specificity score is calculated using three components:

- A = the number of **ID selectors**
- B = the number of **class selectors, attribute selectors and pseudo-classes**
- C = the number of **type selectors and pseudo-elements**

Specificity scores are compared by comparing three components in order. The specificity score with a larger A value is higher. If two A values are equal, compare B values. If two B values are also equal, compare C values. If all values are equal, two specificity scores are equal. For example, `(1,0,0)` is larger than `(0,2,0)`.

When you inspect an element using devtools and hover the cursor to a selector of a style declaration, you will see the specificity score in the form of `Specificity: (A,B,C)`.

Here are some specificity score examples:

| Selector                      | A (ID) | B (Class) | C (Type) | Score |
| ----------------------------- | ------ | --------- | -------- | ----- |
| `*`                           | 0      | 0         | 0        | 0,0,0 |
| `p`                           | 0      | 0         | 1        | 0,0,1 |
| `div.highlight`               | 0      | 1         | 1        | 0,1,1 |
| `main .table-wrapper > table` | 0      | 1         | 2        | 0,1,2 |
| `#avatar`                     | 1      | 0         | 0        | 1,0,0 |

## Inline styles

Inline styles are declared inside a `style` attribute. Inline styles have the highest specificity score (`1,0,0,0`).

```html
<p style="color: blue;" id="p">I am blue</p>
```

```css
#p {
  color: green;
}
```

## !important

`!important` flag overrides all other factors (source order, specificity, and inline styles).

```html
<p style="color: blue;" id="p">I am green</p>
```

```css
#p {
  color: green !important;
}
```

`!important` can make CSS work unexpectedly. Don't use it unless you really need it.

---

## References

- [Cascade, specificity, and inheritance - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [Specificity - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [Selectors Level 4#specificity-rules](https://drafts.csswg.org/selectors/#specificity-rules)

## Further reading

- [Cascade, specificity, and inheritance - Learn web development | MDN#the_effect_of_css_location](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#the_effect_of_css_location)
- [Cascade, specificity, and inheritance - Learn web development | MDN#order_of_cascade_layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#order_of_cascade_layers)
- [Cascade, specificity, and inheritance - Learn web development | MDN#scoping_proximity](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#scoping_proximity)
- [Introducing the CSS Cascade - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)

## Test

- [Test your skills: The Cascade - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_tasks)