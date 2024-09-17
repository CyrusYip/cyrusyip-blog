---
title: Introduction to CSS BEM Naming Convention
date: 2024-09-08T00:00:00+08:00
slug: css-bem-guide
tags:
  - css
  - web
lastmod: 2024-09-18T00:35:41+08:00
translationKey: css-bem-guide
---

BEM (Block, Element, Modifier) is a naming convention for class names in HTML and CSS. It makes HTML and CSS code more orgranized.

## Concepts and Usage

Don't worry if you don't understand it at first. There are examples later on.

- Block: independent HTML element (such as `<nav>`), and it may not contain any HTML elements.
- Element: any HTML element inside a block, it can't be independently used (example: `<li>`), and double underscores `__` should be added before it.
- Modifier: it indicates the state or appearance of a block or element, and double hyphens `--` should be added before it.
- Use single hyphen to connect words, example: `search-form`.  
- An element only belongs to a block, not another element. Wrong: `block__element1__element2`. Correct: `block__element2`.
- When using modifier, keep the class name without the modifier. Example: `<a class="menu__link menu__link--active" href="/en/">Home</a>`.

## HTML Demo

`<nav>` is a block, which contains the elements `<ul>`, `<li>` and `<a>`. `--active` is a modifier.

```html
<nav class="menu">
  <ul class="menu__list">
    <li class="menu__item">
      <a class="menu__link menu__link--active" href="/en/">Home</a>
    </li>
    <li class="menu__item">
      <a class="menu__link" href="/en/posts/">Posts</a>
    </li>
    <li class="menu__item">
      <a class="menu__link" href="/en/about/">About</a>
    </li>
  </ul>
</nav>
```

## CSS Demo

[Online demo](https://jsbin.com/tilavasome/2/edit?html,css,output)

```css
/* Horizontal list */
.menu__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  padding-inline-start: 0;
}

/* Embolden the link that matches the current page */
.menu__link--active {
  font-weight: bolder;
}
```

## SCSS Demo

I strongly recommend SCSS because you can use the parent selector `&` to group together all styles of both a block and its elements. This structure clearly reflects the hierarchical relationship between them.

```scss
.menu {
  // Horizontal list
  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style-type: none;
    padding-inline-start: 0;
  }

  // Embolden the link that matches the current page
  &__link {
    &--active {
      font-weight: bolder;
    }
  }
}
```

## Alternative: Atomic CSS

If you find BEM too verbose or difficult to maintain, you can try atomic CSS frameworks like [Tailwind CSS](https://tailwindcss.com/) and [UnoCSS](https://unocss.dev/) that provide utilities (predefined classes). Developers only need to write predefined class names and don't need to write CSS code. Here are some utilities in Tailwind CSS:

```css
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
```

To rewrite the previous CSS code in Tailwind CSS ([online demo](https://jsbin.com/kolanoyele/2/edit?html,css,output)):

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    corePlugins: {
      preflight: false,
    }
  }
</script>
<nav>
  <ul class="flex flex-row flex-wrap justify-between list-none ps-0">
    <li>
      <a class="font-bold" href="/en/">Home</a>
    </li>
    <li>
      <a href="/en/posts/">Posts</a>
    </li>
    <li>
      <a href="/en/about/">About</a>
    </li>
  </ul>
</nav>
```

## Further Reading

- <https://en.bem.info/> (official guide)
- <https://getbem.com> (unofficial guide)
- [Naming convention / Methodology / BEM](https://en.bem.info/methodology/naming-convention/)
- [troxler/awesome-css-frameworks: List of awesome CSS frameworks](https://github.com/troxler/awesome-css-frameworks)