---
title: 命令行实例
date: '2020-12-25'
slug: cli-examples
tags:
  - CLI
  - Linux
  - Ubuntu
---

本文用于收集~~我记不住的~~实用的命令行用法。

<!--more-->

# 剪辑视频

```bash
ffmpeg -i input.mp4 -ss 06:00 -to 8:38 cut.mp4
```

`-i` 指定输入文件，`-ss` （**s**et the **s**tart time）指定视频开始时间，`-to` 指定结束时间。

# 输出好看的 PATH 变量

如果直接用 `echo $PATH` 查看 PATH 变量，结果很难看，很难分清楚哪个目录是哪个。

```bash
$ echo $PATH
/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/miniconda3/condabin:/home/user/bin:/home/user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

用 `tr ':' '\n' <<< "$PATH"`，结果一目了然。`<<<` 把右边的 `$PATH` 传递到左边，`tr ':' '\n'` 把 `$PATH` 中的 `:` 转换为换行符。

```bash
$ tr ':' '\n' <<< "$PATH"
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/miniconda3/condabin
/home/user/bin
/home/user/.local/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/snap/bin
```

参考：[shell - Show PATH in a human-readable way - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/80153/447708)

# 重启 KDE Plasma

```bash
kquitapp5 plasmashell # kill plasma
kstart5 plasmashell # start plasma
```

参考：[kwin - Can I restart the KDE Plasma Desktop without logging out? - Ask Ubuntu](https://askubuntu.com/a/481738/1154635)
