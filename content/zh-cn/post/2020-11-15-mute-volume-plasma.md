---
title: KDE Plasma 开机静音设置
date: '2020-11-15'
slug: mute-volume-plasma
tags:
  - Kubuntu
  - KDE Plasma
---

Kubuntu 休眠之后开机总会报错：

```
Message from syslogd@my-pc at Nov 15 09:31:33 ...
kernel:[ 319.150050] Do you have a strange power saving mode enabled?
Message from syslogd@my-pc at Nov 15 09:31:33 ...
kernel:[ 319.150050] Dazed and confused, but trying to continue 

Message from syslogd@my-pc at Nov 15 09:31:33 ...
kernel:[ 319.150049] Uhhuh. NMI received for unknown reason 2d on CPU 0. 
```

在 Stack Exchange 搜索了一下，没发现什么简单的解决方法，于是就一直忍着。但是在教室或者图书馆的时候，打开电脑，突然间它发出了响亮的「噔」警报声。旁人的目光让我的社交焦虑值飙升，巴不得找个洞钻进去。关注的眼神实在是太可怕了！我还是想办法解决这个问题吧。既然没办法阻止报错，那就只能开机和解锁的时候设置静音了。

在 [Ask Ubuntu](https://askubuntu.com/questions/584603/set-volume-to-100-on-start-up-ubuntu-12-04) 找到了设置音量的命令：

```bash
/usr/bin/pactl set-sink-volume 0 100%
# or
/usr/bin/amixer -D pulse sset Master 100%
```

接下来就可以开始设置静音了。

## 设置开机静音

### 命令行设置

```bash
mkdir ~/.config/autostart-scripts

cd ~/.config/autostart-scripts

echo "#\!/bin/bash
/usr/bin/pactl set-sink-volume 0 0%" > 0-vol.sh

chmod +x 0-vol.sh
```

### GUI 设置

点击 `System Settings -> Workspace -> Startup and Shutdown -> Autostart -> Add Script`，直接在设置搜索 `Autostart` 也行，添加的脚本内容如下：

```bash
#!/bin/bash
/usr/bin/pactl set-sink-volume 0 0%
```

休眠后再开机，发现没有静音。经过测试，发现这个方法只适用于关机之后开机。可能从休眠中启动只是把硬盘中保存的东西再重新放入内存，所以并不算开机吧。从休眠中启动完之后会进入解锁界面，所以要设置锁屏静音。

## 设置锁屏静音

这个设置我只找到了 GUI 的方法，同样是在系统设置。

1. 进入设置

    `System Settings -> Personalization -> Notifications -> Applications -> Screen Saver`

2. 选择 `Screen locked`

3. 在 `Run command` 选项添加前面的静音脚本

    `~/.config/autostart-scripts/0-vol.sh`

终于可以不听到这烦人的提示音了！写到这里发现应该只设置锁屏静音就行了，不需要设置开机静音。懒得测试了，就这样吧。