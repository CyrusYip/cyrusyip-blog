---
title: 修复 Kubuntu 无音频设备的问题
author: ''
date: '2020-11-24'
slug: kubuntu-no-sound-device
categories: []
tags:
  - Kubuntu
---

执行命令：

```bash
sudo alsa force-reload
pulseaudio -k
start-pulseaudio-x11
```

进入 `System Settings -> Hardware -> Audio -> Advanced -> Device Profiles`，把 `Profile` 改成 `Analog Stereo Duplex`。

---

参考：[(K)Ubuntu 17.10 - No Audio devices found, no settings, no sound](https://askubuntu.com/a/978992/1154635)
