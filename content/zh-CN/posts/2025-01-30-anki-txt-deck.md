---
title: 用文本文件制作 Anki 牌组
date: 2025-01-30T00:00:00+08:00
slug: anki-txt-deck
tags:
  - anki
lastmod: 2025-01-30T00:00:00+08:00
---

Anki 是开源的记忆软件。我们可以用文本文件制作牌组（一组需要记忆的内容），文本文件更易于修改。

将下面文本保存为 `deck.txt`，然后用文本编辑器编辑。

```
#separator:Pipe
#html:true
hi|你好
why|为何
two lines|第 1 行<br>第 2 行
```

此文本对应的导出格式是「Cards in Plain Text(.txt)」。

第 1 行的 separator（分隔符）用于区分正面和反面，可以用 Comma（`,`）、Semicolon（`;`）、Tab（`	`）、Space（` `）、Pipe（`|`）、Colon（`:`），用名称（例如：`Pipe`）和符号（`|`）都可以。我推荐用 `|`，它很少在卡片里用到，而且可以用键盘直接输入。

第 2 行表示可以使用 HTML 代码。比如：`<br>` 表示换行。

第 3 行开始就是卡片，一行就是一张卡，分隔符左边是卡片正面，分隔符右边是卡片反面。

在 Anki 创建牌组，将 `deck.txt` 导入到这个牌组。如果你想制作翻转卡片（反面->正面），导入时 Note Type 选择「Basic and (reversed) card」，这样牌组会同时存在基础卡片（正面->反面）和翻转卡片。