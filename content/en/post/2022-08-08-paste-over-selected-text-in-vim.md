---
title: How to Paste over Selected Text without Overwriting the Unnamed Register in Vim
date: '2022-08-08'
slug: paste-over-selected-text-in-vim
tags:
  - Vim
---

Summary: paste with `P` in visual mode.

It's painful to paste over selected text in Vim, because the unnamed register is overwritten by the selected text. Thus, we can not paste the original yanked text twice.

If you have a file:

```
hello
kitty
```

You want to copy `hello` , paste it over `kitty`, and paste it again. You type these commands in Vim.

```vim
gg " move to the top
yy " copy current line
jV " move to the next line and select it
p  " paste over the select line
p  " paste again
```

You expect to get:

```
hello
hello
hello
```

However, you will get:

```
hello
hello
kitty
```

You should use `P` in visual mode, so the unnamed register is not changed. Put the original file content in Vim:

```
hello
kitty
```

Type `ggyyjVPp`, and you will get:

```
hello
hello
hello
```

You can read the help file by [`:h v_P`](https://vimhelp.org/change.txt.html#v_P) for more information.
