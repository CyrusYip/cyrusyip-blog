---
title: CSS Flexbox 布局教程
date: 2024-09-06T00:00:00+08:00
slug: css-flexbox-layout-guide
tags:
  - css
  - web
lastmod: 2024-09-09T23:59:43+08:00
---

Flexbox（弹性盒子）是一维的布局方法，也就是在一条横线（row）或者竖线（column）上排列元素。推荐大家看完本文后做[文末提到的习题](#习题)。

## flex 容器的属性

flex 容器（flex container）的属性有 `display`、`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`、`row-gap`、`column-gap`、`gap`。

### flex 容器与 flex 项

以下的 `section` 元素包含了 3 个 `article` 元素。

```html
<section>
  <article>Article 1</article>
  <article>Article 2</article>
  <article>Article 3</article>
</section>
```

要排列 `article` 元素，将它们的父元素设置为 flex 容器。

```css
section {
  display: flex | inline-flex; /* inline-flex 表示容器是 inline 元素 */
}
```

在上述例子中，`section` 元素是 flex 容器（flex container），`article` 元素是 flex 项（flex item）。

### flex-direction 方向、主轴、交叉轴

`flex-direction` 定义排列方向和主轴。

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- `row`（默认值）：横向，和文字方向（[dir](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir)）一致，如果方向是从左往右，那么就是从左往右排列子元素
- `row-reverse`：和前者相反，从右往左
- `column`：纵向，从上到下
- `column-reverse`：和前者相反，从下到上

主轴（main axis）就是和 flex 项排列方向一致的轴，交叉轴（cross axis）则是与主轴垂直的轴。一定要分清楚方向和两条轴，在对齐 flex 项时会用到。

```css
.container {
  display: flex;
  flex-direction: row;
}
```

上述代码表示从左到右排列 flex 项，主轴是从左到右，交叉轴是从上到下。

![](https://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg "轴的图示")

### flex-wrap 换行

`flex-wrap` 控制是否换行，默认不换行。

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- `nowrap`（默认值）：全部 flex 项排列成一条线
- `wrap`：溢出时换行
- `wrap-reverse`：溢出时换行，但后面的元素会排到前面

示例代码（[在线示例](https://jsbin.com/yatubohoqe/7/edit?html,css,output)）：

```html
<section>
  <article>Article 1</article>
  <article>Article 2</article>
  <article>Article 3</article>
  <article>Article 4</article>
  <article>Article 5</article>
  <article>Article 6</article>
  <article>Article 7</article>
  <article>Article 8</article>
  <article>Article 9</article>
</section>
```

```css
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

article {
  width: 100%;
  outline: 1px solid green;
}
```

### flex-flow（flex-direction 和 flex-wrap 的缩写）

`flex-flow` 是 `flex-direction` 和 `flex-wrap` 的缩写，默认值为 `row nowrap`。

下面两份代码效果一样：

```css
section {
  flex-direction: row;
  flex-wrap: wrap;
}
```

```css
section {
  flex-flow: row wrap;
}
```

### justify-content 主轴对齐

`justify-content` 设置主轴的对齐方式。

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```

下面只介绍常用的值。

- `flex-start`（默认）：将所有 flex 项放到主轴的起点。如果主轴是 row（从左到右），那么所有 flex 项贴近左边。例子（`.` 表示空间）：`Item1Item2Item3......`。
- `flex-end`：将所有 flex 项放到主轴的终点。例子：`......Item1Item2Item3`。
- `center`：将所有 flex 项放在主轴的中间。例子：`....Item1Item2Item3....。`
- `space-between`：均匀分配 flex 项，每个 flex 项之间的距离一样，头部 flex 项贴近主轴开头，尾部 flex 项贴近主轴末尾，例子：`Item1..Item2..Item3`。
- `space-around`：均匀分配 flex 项，每个 flex 项的前后间隔一样，例子：`.Item1..Item2..Item3.`。
- `space-evenly`：均匀分配 flex 项，每个 flex 项之间的距离一样，头部 flex 项和主轴开头有一样的距离，尾部 flex 项和主轴末尾有一样的距离。例子：`..Item1..Item2..Item3..`。

### align-items 交叉轴对齐

交叉轴垂直于主轴。`align-items` 设置交叉轴的对齐方式。

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
```

`align-items` 用法和 `justify-content` 类似，这里介绍一些不一样的值。

- `stretch`（默认值）：使 flex 项填满容器。
- `baseline`：根据基线对齐，用于字体大小不同的 flex 项，[图示](https://stackoverflow.com/questions/34606879/whats-the-difference-between-flex-start-and-baseline/34611670#34611670)。

### align-content 交叉轴对齐（仅用于多行 flex 项）

`align-content` 设置多行 flex 项的交叉轴对齐方式，flex 项只有一行时（`flex-wrap: nowrap;`）无效，[图示](https://stackoverflow.com/questions/27539262/whats-the-difference-between-align-content-and-align-items/34944673#34944673)。

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
```

`align-content` 用法和 `align-items` 类似。

### row-gap、column-gap、gap 间隔

如果在 flex 项上画横线和竖线，`row-gap` 表示横线的间隔大小，`column-gap` 表示竖线的间隔大小，`gap` 是前面两者的缩写，[在线示例](https://jsbin.com/maliponaje/7/edit?html,css,output)。

```css
.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 5px;
  gap: 20px 5px; /* row-gap, column-gap */
  gap: 20px; /* row-gap 和 column-gap 都是 20px */
}
```

`gap` 只是设置最小间隔，使用 `space-between` 可以加大间隔。

## flex 项的属性

flex 项（flex item）的属性有 `order`、`flex-grow`、`flex-shrink`、`flex-basis`、`flex`、`align-self`。

flexbox 没有 `justify-self`，参看 [Box alignment in flexbox - CSS: Cascading Style Sheets | MDN#there_is_no_justify-self_in_flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment/Box_alignment_in_flexbox#there_is_no_justify-self_in_flexbox)。

### order 顺序

默认情况下，flex 项按照源代码出现的顺序排列。使用 `order` 属性可以改变顺序，默认值为 0，数字越大位置越后，可以使用负值（比如：-1）。如果多个 flex 项的 `order` 值一样，它们还是按原始顺序排列。

```css
#item1 {
  order: 2;
}
#item2 {
  order: 1;
}
#item3 {
  order: -1;
}
```

图示：

```
item3  |  item2 | item1
```

### flex-basis 大小

`flex-basis` 设置 flex 项的大小，默认为 `auto`。

```css
.item {
  flex-basis: 50px;
}
```

### flex-grow 增长

flex 容器有多余空间时，`flex-grow` 设置 flex 项的增长系数，默认为 0（不增长），负值无效。

```css
.item1 {
  flex-grow: 1;
}

.item2 {
  flex-grow: 2;
}

.item3 {
  flex-grow: 1;
}
```

上面代码表示将多余空间（假设为 100px）均分为 4 份，`.item1` 的宽度增加 1 份（25px），`.item2` 的宽度增加 2 份（50px），`.item3` 的宽度增加 1 份（25px），[在线示例](https://jsbin.com/hitoyoboqa/1/edit?html,css,output)。

### flex-shrink 收缩

空间不足时，`flex-shrink` 设置 flex 项的收缩指数，默认为 1（可收缩），0 表示不可收缩，负值无效。`flex-shrink` 的效果和 `flex-grow` 类似。

假设有 1 个 200px 宽度的 flex 容器，它包含 3 个 flex 项（每个宽度 100px，共 300px），此时有 100px 溢出的宽度。

```css
.container {
  display: flex;
  width: 200px;
}
.item {
  flex-basis: 100px;
}
```

如果 flex 项总宽度减去 100px，那么就不会溢出，[在线示例](https://jsbin.com/dikenicuwo/1/edit?html,css,output)。

```css
.item1 {
  flex-shrink: 1;
}
.item2 {
  flex-shrink: 2;
}
.item3 {
  flex-shrink: 1;
}
```

上面代码表示把溢出的 100px 均分为 4 份。`.item1` 宽度减去 1 份（25px），变成 75px；`.item2` 宽度减去 2 份（50px），变成 50px；`.item3` 宽度减去 1 份（25px），变成 75px。 

### flex（flex-grow、flex-shrink 和 flex-basis 的缩写）

`flex` 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的缩写，默认为 `0 1 auto`。推荐使用 `flex` 代替那 3 个属性，它会自动使用合理的默认值。比如使用 `flex: 1` 设置 `flex-grow: 1` 时，`flex-basis` 会变成 0%。

`flex` 可以使用 1~3 个值，具体用法请看 [flex - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)。

使用 `flex` 可以轻松设置 flex 项的大小比例，[在线示例](https://jsbin.com/mejucokihi/4/edit?html,css,output)。

```css
.container {
  display: flex;
  flex-direction: row;
  width: 100px;
}

.item1 { /* 25px */
  flex: 1;
}
.item2 { /* 50px */
  flex: 2;
}
.item3 { /* 25px */
  flex: 1;
}
```

### align-self 交叉轴对齐

`align-self` 设置单个 flex 项的交叉轴对齐方式，用法和 `align-items` 一样，两者可以同时用。

## 习题

<!-- 此标题被引用于第一段 -->

- [Flexbox Froggy](https://flexboxfroggy.com/)（点底下的 Settings 可以设置难度和语言，可以先用中等难度，不懂再调到新手难度看提示。第 24 题难得离谱，现实中不会遇到这种情况，想不到就去查答案吧。）
- [Test your skills: Flexbox - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox_skills)

## 参考资料

- [CSS Flexbox Layout Guide | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)（文中图片出自此）