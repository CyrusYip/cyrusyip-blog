---
title: 用笔记本电脑屏幕玩 Nintendo Switch
date: '2021-08-05'
slug: play-ns-on-laptop
tags:
  - Nintendo Switch
---

## 缘起

我从去年末尾开始玩健身环大冒险，没毕业前在出租屋自己一个人玩。毕业后回家都是在客厅玩，要是有人在场我就不好意思了，于是有时候训练计划就被打断了。前些天和女朋友去广州把出租屋的行李都寄回家，出门带了NS（Nintendo Switch）和笔记本电脑。收拾完东西和女朋友玩马力欧赛车，已经打包好显示器了，就只能看着 NS 的屏幕玩。两个人都看得眼睛累死了，女朋友就问我能不能把 NS 接到笔记本电脑上玩。我说：「能，买个采集卡。便宜的也得四五百吧，感觉不便宜。」一般笔记本电脑的 HDMI 只能输出信号，不能输入信号，所以直接接上是接收不到 NS 画面的。

![别直接连接 NS 和笔记本电脑](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2021-08-05_ns-output-ways.png)

我以为采集卡都是四五百起步，去淘宝看，还是有便宜的啊，买了 87 块的绿巨人采集卡，型号是 LJN-CJQ002。正好可以解决玩健身环的问题。除了健身环外，分级比较高的游戏也不太适合在客厅玩，比如 AI 梦境档案。上次我在客厅玩的时候突然来了这样一句台词：

![说胡话的伊丽丝](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2021-08-05_iris.png)

总感觉在客厅怪尴尬的，赶紧按下主页键退出。只要我按得快，就没人注意到。

## 采集卡的使用方法

1. 在[官网](https://obsproject.com/)下载并安装 OBS[^obs] Studio
1. 打开 OBS，进入自动配置
    1. 选择 Optimize just for recording
    1. Base(Canvas) Resolution = 电脑的分辨率
    1. FPS = 60
    1. Apply Settings
1. 接线：Nintendo Switch（NS） -> 底座 -> HDMI 线 -> 采集卡 -> 电脑 
1. 给 NS 和电脑插电[^dian]
1. 设置视频信号
    1. 点击 OBS 下方 Source 的 + 按钮
    1. Video Capture Device -> Create new -> OK
    1. Device = 带 USB 名称的
    1. Video Format = 先试试默认的，不行就换，我用的设备用不了 YUYV 格式，其他格式都行
    1. Resolution = 电脑分辨率
    1. Frame Rate = 60 FPS
    1. OK
    1. 在画面空白处右击，勾上 Enable Preview
1. 设置音频信号
    1. 点击 OBS 下方「Audio Mixer -> Mic/Aux」右下角的齿轮按钮
    1. Advanced Audio Properties
    1. Mic/Aux -> Audio Monitoring -> Monitor Only (mute output)
    1. Close
    1. 如果这个办法不行，就在 Source 添加 Audio Input Capture，然后用上面的步骤设置
1. 放大预览画面
    1. 右击预览画面
    1. 勾上「lock preview」
    1. 右击预览画面
    1. Preview Scaling -> Canvas
    1. 点击菜单栏的 View
    1. 取消所有勾上的选项，包括 Docks 里面的
    1. View -> Fullscreen Interface（F11），按下 F11 退出全屏
    1. 如果需要恢复默认界面，就点击 View -> Docks -> Reset UI，然后再勾上之前的选项

## 使用感受

感觉玩游戏的时候帧率只有三四十，达不到产品页说的 60 帧。玩马力欧赛车卡得影响发挥，玩健身环还行，梦境档案没问题，Youtube 能播放 1080P 60FPS 的视频。问客服：「帧率低怎么回事？和采集卡配置或笔记本配置有关系吗？」客服说：「没有配置要求，有独立显卡更流畅。」我的笔记本是 Magicbook 14（AMD Ryzen 5 3500U ，16G RAM），用女朋友的小新 Air 14（AMD Ryzen 5 4600U，16G RAM）感觉更流畅。要是不需要省钱、录屏、直播，还是买便携式显示器比较好。最后还有一些待解决的问题：

- 如何查看实时帧率
- 默认的全屏预览只能 720p，如何调成 1080P
- 全屏后如何隐藏光标

[^obs]: OBS 的全称是 Open Broadcaster Software。

[^dian]: 笔记本电脑不插电会变慢。