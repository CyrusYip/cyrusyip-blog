---
title: 修复 Kubuntu 无音频设备的问题
date: '2020-11-24'
slug: kubuntu-no-sound-device
tags:
  - Kubuntu
---

执行命令：

```bash
#!/bin/bash -x
sudo alsa force-reload
pulseaudio -k
start-pulseaudio-x11
```

进入 `System Settings -> Hardware -> Audio -> Advanced -> Device Profiles`，把 `Profile` 改成 `Analog Stereo Duplex`。

把重置音频的命令保存为脚本文件，以后使用更方便：

1. 把开头的脚本保存为 `reset-sound`

1. 添加执行权限

    `chmod +x reset-sound`

1. 把文件放到 `$PATH`[^path] 目录中

这样以后出问题了就不用回来看那几行命令了，直接在终端执行 `reset-sound` 就行。

[^path]: 如果你没有建立目录存放自己用的脚本，那就使用 `mkdir ~/bin` 建立一个，然后把 `export PATH="/home/hunter/bin:$PATH"` 添加到 `.bashrc` 和 `.zshrc`。

---

延伸阅读：

- [(K)Ubuntu 17.10 - No Audio devices found, no settings, no sound](https://askubuntu.com/a/978992/1154635)
