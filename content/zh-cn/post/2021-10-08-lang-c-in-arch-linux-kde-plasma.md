---
title: 解决 Arch Linux（KDE Plasma）中 Locale LANG=C 的问题
date: '2021-10-08'
slug: lang-c-in-arch-linux-kde-plasma
tags:
  - Arch Linux
  - Linux
---

最近在 Arch Linux 上的 Git 显示不了中文，执行了 `git config --global core.quotepath false` 还是不行。`git log` 显示的中文变成这样了：

```
Markdown <E6><8A><80><E5><B7><A7><EF><BC><9A>Rmarkdown -> R Markdown
```

它应该是这样的：

```
Markdown 技巧：Rmarkdown -> R Markdown
```

查看 locale，发现 locale 居然不是en_US.UTF-8，而是 C，这是啥啊？

```
❯ locale
LANG=C
LC_CTYPE="C"
LC_NUMERIC="C"
LC_TIME="C"
LC_COLLATE="C"
LC_MONETARY="C"
LC_MESSAGES="C"
LC_PAPER="C"
LC_NAME="C"
LC_ADDRESS="C"
LC_TELEPHONE="C"
LC_MEASUREMENT="C"
LC_IDENTIFICATION="C"
LC_ALL=
```

我之前设置的 locale 明明是 en_US.UTF-8。

```bash
sudo localectl set-locale LANG=en_US.UTF-8
```

查阅万能的 [ArchWiki](https://wiki.archlinux.org/title/Locale_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%88%91%E7%9A%84%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%AF%AD%E8%A8%80%E8%BF%98%E6%98%AF%E4%B8%8D%E5%AF%B9) 后发现我似乎在 KDE Plasma 把 locale 设置成 Default (C) 了（System Settings -> Regional Settings -> Formats -> Region）。

```
❯ cat ~/.config/plasma-localerc
[Formats]
LANG=C
```

把 Plasma 的 locale 配置文件删除后重启就行了。

```bash
rm -i ~/.config/plasma-localerc
```