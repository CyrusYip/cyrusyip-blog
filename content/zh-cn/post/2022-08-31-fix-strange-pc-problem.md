---
title: 修复奇怪的电脑问题
date: '2022-08-31'
slug: fix-strange-pc-problem
tags:
  - computer
---

友情提示：你可以边看本文边猜问题的原因，这样可能比较有趣。

今天晚上电脑在 Chrome 用 Fcitx5 输入法的时候选字总是出错（奇怪现象 1），重启 Chrome 后又没事了。电脑锁屏后我就去睡觉了，半夜去上厕所的时候发现显示器和笔记本电脑屏幕都亮着，没有自动关闭（奇怪现象 2）。第二天打开 KDE Plasma 的设置看看有没有「接了显示器就不熄屏」的选项。打开「Energy Saving」，里面似乎没有相关选项。此时电脑有点不受控制，乱点里面的东西，还点击里面的选项卡了（奇怪现象 3）。俗话说，重启能解决 90% 的电脑问题。于是我就升级了 Arch Linux 并重启，但是没用。

用电脑那么多年没见过那么奇怪的事情，该不会被黑了吧。想想又不太可能，我用 Linux，黑了我电脑干坏事也得悄悄地用命令行吧，用远程桌面实在是吃力不讨好。好吧，打开 Chrome 搜索一下，不过我也不知道搜啥。打开 Chrome 之后，无论我点击哪个标签页，Chrome 都会选择它右边的标签页，再选择右边的，直至到最右边（奇怪现象 4）。同样是 Chromium 内核的 Brave 浏览器也有这个问题，但是 Firefox 就没事。

电脑的输入设备无非是鼠标和键盘，就逐个排查吧。先打开 [screenkey](https://www.thregr.org/~wavexx/software/screenkey/) 检测键盘输入，再点击 Chrome 标签页，问题依旧，但没有键盘输入，说明键盘没问题。接下来就打开鼠标检测软件，但我没安装。算了，直接关掉无线鼠标，用笔记本触控板点 Chrome 标签页，问题依旧。我突然想到自己写过一个[检测鼠标的网页](https://github.com/CyrusYip/mouse-detector)，打开一看发现输入设备一直触发向后滚动。终于确定问题了，上谷歌搜「linux mouse keep scroll」，找到相关问题：[10.10 - Mouse wheel jumpy on scrolling - Ask Ubuntu](https://askubuntu.com/questions/32280/mouse-wheel-jumpy-on-scrolling)。提问者也是点标签页就跳到最右边。

> But I open many browser tabs, and if i just move my mouse of one of the tabs, the the right-most tab gets selected.

提问者自己回答说问题原因是低电量的无线键盘干扰了无线鼠标。

> Unbelievable, but the problem was that my wireless keyboard and my wireless mouse's receivers were both on adjacent usb ports. when i moved my mouse's reciever to a further away port, I found that my mouse was not being weird any more, but my keyboard was acting funny. **Turns out my keyboard's battery was running low and it was interfering with my mouse**.

我电脑用的无线输入设备就只有鼠标，应该没干扰吧。拔掉插在 USB 分线器的接收器再插入，问题就消失了。我还是觉得很奇怪，为什么一开始插着接收器关了鼠标还是出问题？鼠标都关了应该就不会向接收器发指令吧。
