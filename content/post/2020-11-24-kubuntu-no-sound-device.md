---
title: 修复 Kubuntu 无音频设备的问题
author: ''
date: '2020-11-24'
slug: kubuntu-no-sound-device
categories: []
tags:
  - Kubuntu
---

有时候电脑开机之后，没有音频设备，没办法播音乐了。突然想去设置看看，就发现解决方法就是切换一下音频设备。

进入 `System Settings -> Hardware -> Audio -> Advanced -> Device Profiles`，把 `Profile` 改成 `Stereo Output + Analog Stereo Input`。