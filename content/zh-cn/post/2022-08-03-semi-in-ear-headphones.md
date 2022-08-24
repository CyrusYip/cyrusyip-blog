---
title: 119～259 元蓝牙半入耳耳机简评
date: '2022-08-03'
slug: semi-in-ear-headphones
tags:
  - headphones
---

2019 年买了一款[小米有线耳机](https://item.jd.com/6968445.html)，一直用到现在。前些天用的时候总有电流声，仔细一看才发现有些地方的金属线都露出来了，用透明胶贴上继续用着。过几天又发现耳机按键附近的线快断了，是时候买新耳机了。我的手机没有耳机插口，每次用耳机都要靠转接线，用转接线又得占用充电口，还是买蓝牙耳机吧。我对耳机的要求：半入耳、舒适、音质不亚于原来耳机。

一开始买了 65 块的[联想(Lenovo) thinkplus LP40](https://item.jd.com/100017786994.html)。LP40 音质好差，仿佛音响前盖了几层布,完全不能接受。第二款买的是 179 块的 Redmi Buds3。这个也不行，一戴就右耳疼。我右耳道比较小，入耳式耳机用最小的圈圈右耳都痛，所以只能买半入耳的。这样慢慢试也不是个办法，于是我上京东一下子买了几款心仪的耳机来测试，留下最适合的一款。耳机购于 2022 年 8 月 1 日。

我根据自己的感受给耳机评分。舒适度和音质数字越大越好，10 分表示音质最好。噪音数字越低越好，10 分表示噪音最多。防水防尘等级的含义请参考：[国际防护等级认证 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%9B%BD%E9%99%85%E9%98%B2%E6%8A%A4%E7%AD%89%E7%BA%A7%E8%AE%A4%E8%AF%81)。耳机测试以听歌为主。

- 测试歌曲：[Youtube 上的 Lovelyz 的歌](https://www.youtube.com/results?search_query=lovelyz)
- 测试机器：Magicbook 14（Arch Linux + KDE Plasma）、小米 9 SE
- 注意事项：调好音量再播放歌曲，100% 音量听一秒耳朵能疼几分钟
- 查看编码：`pactl list sources | grep codec`

以下是耳机对比表，我最后选择了倍思 E8，因为它戴着最舒服。

| 名称                  | 价格 | 舒适度 | 音质 | 噪音 | 编解码器     | 单耳机重量 | 防尘防水 | 型号           |
|-----------------------|------|--------|------|------|--------------|------------|----------|----------------|
| FILL Key              | 219  | 5      | 10   | 0    | AAC/SBC      | 3.7g       | IPx4     |                |
| OPPO Enco Air2        | 169  | 7      | 9    | 2    | AAC/SBC      | 3.5g       | IPx4     | ETE11          |
| Redmi Buds 3          | 179  | 0      |      |      | aptX/AAC/SBC | 4.5g       | IP54     |                |
| 京东京造 J-Buds Air   | 119  | 8      | 8    | 0    | AAC/SBC      | 3.5g       | 无       |                |
| 京东京造 J1           | 119  | 9      | 8    | 0    | AAC/SBC      | 3g         | IPx4     | 京东京造LV02JL |
| 倍思 E8               | 158  | 9      | 8    | 0    | AAC/SBC      | 3.4g       | IPx5     |                |
| 漫步者 LolliPods Plus | 259  | 6      | 10   | 0    | aptX/SBC     | 4.1g       | IP54     |                |
| 漫步者 Zero Buds      | 188  | 8      | 8    | 0    | SBC          | 3.5g       | IP54     |                |

以下是对部分耳机的评价。

## FILL Key

右耳不舒服，盒子和耳机好看。

## OPPO Enco Air2

久戴还是不舒服。有配套的手机软件，软件可以查看盒子和耳机电量、升级固件、设置按键作用、设置音效。软件界面简洁好用，被国产软件折磨多了，用这个软件我都快感动落泪了。

## Redmi Buds 3

尺寸太大，戴上就右耳疼，左耳也不舒服，中止测试。

## 京东京造 J-Buds Air

没有防水，盒子很丑。

## 京东京造 J1

和笔记本连接有一定概率会音质异常，重新连接后没事。不能检测关盖动作，放入盒子后20秒才断开连接，实在是太笨了。开盖后得拿出耳机才开始匹配设备，这也很笨。

## 倍思 E8

和笔记本电脑自动连接后每一两秒就卡一下，Linux 下有问题，同一台机器换到 Windows 就没事了，搞不懂。在 Linux 用以下命令重新连接就好了（`AB:AB:AB:AB:AB:AB` 表示耳机的 MAC 地址）。

```
bluetoothctl disconnect AB:AB:AB:AB:AB:AB && bluetoothctl connect AB:AB:AB:AB:AB:AB
```

配套的手机软件要注册才能用，呸！软件还要开定位才能匹配耳机，呸！我真的搞不懂为什么需要帐号和定位，真是不尊重隐私。因为这款耳机戴着最舒服，还是选了它……

## 使用体验

第一次用无线蓝牙耳机，不用插线实在是太爽了，再也不用担心扯线了。双设备连接也很好用，同时连接手机和笔记本电脑，不用断开连接才连接另一个设备。手机收入盒子后，手机会自动暂停音频播放。但是电脑（KDE Plasma）会继续用自带的音响播放，这个问题有待解决。

## 相关资料

- [Advanced Audio Coding - Wikipedia](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)[Advanced Audio Coding - Wikipedia](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)
- [Audio Video Sync Test 60 FPS - YouTube](https://www.youtube.com/watch?v=TjAa0wOe5k4&feature=youtu.be)（音频视频同步测试）
- [SBC (codec) - Wikipedia](https://en.wikipedia.org/wiki/SBC_(codec))
- [aptX - Wikipedia](https://en.wikipedia.org/wiki/AptX)
- [国际防护等级认证 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E5%9B%BD%E9%99%85%E9%98%B2%E6%8A%A4%E7%AD%89%E7%BA%A7%E8%AE%A4%E8%AF%81)
