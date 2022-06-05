---
title: 树莓派 4B OpenWrt 旁路由教程
date: '2021-08-30'
slug: raspberry-pi-4b-openwrt
tags:
  - OpenWrt
  - Raspberry Pi 4B
---

本文内容主要来自 [SuLingGG](https://github.com/SuLingGG) 的 [OpenWrt-Rpi](https://github.com/SuLingGG/OpenWrt-Rpi) 文档，感谢 SuLingGG 编译的 OpenWrt 并写了详细的文档。我的~~吃灰派~~树莓派 4B 在墓里躺了近两年，又复活了。欢迎大家[捐赠](https://github.com/SuLingGG/OpenWrt-Mini/blob/main/FUNDING.md) SuLingGG 编译的 OpenWrt。如果本文太难懂，请到 Youtube 或者哔哩哔哩搜索「树莓派安装 OpenWrt」和「树莓派 旁路由」，看看教程视频了解过程。然后~~关闭这篇教程~~再回来看本文。本文主要内容为安装 OpenWrt 固件、旁路由（旁路网关）设置、后续设置（扩充容量、关闭电源灯……）。

## 树莓派作路由器有什么功能？

请看 [SuLingGG](https://github.com/SuLingGG) 的文档：

- [自编译 OpenWrt 系列 - 固件特性 | 美丽应用](https://mlapp.cn/1001.html)
- [内置功能 · SuLingGG/OpenWrt-Rpi Wiki](https://github.com/SuLingGG/OpenWrt-Rpi/wiki/%E5%86%85%E7%BD%AE%E5%8A%9F%E8%83%BD)

## 刷入固件

刷入固件前先准备好~~作案~~工具：

- 选择一个网站下载 [SuLingGG](https://github.com/SuLingGG) 编译的 [Lean OpenWrt](https://github.com/coolsnowwolf/lede) 固件：[openwrt.cc](https://openwrt.cc/releases/targets/bcm27xx/bcm2711/)、[Google Drive](https://drive.google.com/drive/folders/1_P2RoPbguY99qJxmCU4SKUgP8Kg0Xr03)

    - Google Drive 的下载位置如下，请选择日期最新的固件，如果最新日期没有树莓派 4B 的固件就看看之前的

    - ```
        firmware
            ├── 2021-08-26
            ├── 2021-08-27
            ├── 2021-08-28
            └── ...
                └── lean # Lean 版固件
                    └── bcm27xx # Lean 版树莓派系列固件
                        └── bcm2711 # 适用于树莓派 4B (64位)
        ```

    - 下载文件名包含  ext4-factory 或 squashfs-factory 的文件，例如 [openwrt-bcm27xx-bcm2711-rpi-4-ext4-factory.img.gz](https://openwrt.cc/releases/targets/bcm27xx/bcm2711/openwrt-bcm27xx-bcm2711-rpi-4-ext4-factory.img.gz)。squashfs 重置系统更方便，ext4 固件扩充容量更简单。下文以 ext4 固件为例。固件版本的区别请看[这里](https://mlapp.cn/1004.html)

    - 解压文件，获得 openwrt-bcm27xx-bcm2711-rpi-4-ext4-factory.img

- 安装 [balenaEtcher](https://www.balena.io/etcher/)

- microSD（TF[^tf]）卡（固件大概 1G，建议闪存卡[^ka]至少 4G）

- microSD（TF）读卡器（建议买 USB3.0 版，速度更快）

- 删除闪存卡所有分区，格式化为 fat32（不格式化可能导致[无法保存设置](https://github.com/SuLingGG/OpenWrt-Rpi/issues/26)）

- 1 条千兆网线

- 电脑（带网口的更好）

- SSH 客户端（可忽略）

[^tf]: microSD 才是正确的名称，但它常被误称为 TF 卡。两者的关系如下（摘录自[维基百科](https://zh.wikipedia.org/wiki/MicroSD)）：microSD卡原本称为TF卡（T-Flash卡或TransFlash），由摩托罗拉与闪迪共同研发，在2004年推出。不过闪迪无法自行将它推广普及化，前期仅有摩托罗拉的手机支持TransFlash。为了能将销路完全拓展，闪迪于是将TransFlash规格并入SD协会，成为SD家族产品之一，造就了目前使用最广泛的手机存储卡。

[^ka]: microSD 是闪存（flash memory）卡，而不是内存（RAM，Random Access Memory）卡，但「内存卡」的说法更广泛。 

准备完毕，现在开始刷入固件：

1. 把闪存卡插入读卡器，读卡器插入电脑
1. 打开 balenaEtcher
1. 点击「Flash from file」
1. 选择解压好的「openwrt-bcm27xx-bcm2711-rpi-4-ext4-factory.img」
1. 点击「Select target」，选择闪存卡，注意看容量对不对，请勿选择本机硬盘
1. 点击「Flash!」
1. 成功后把闪存卡插入树莓派，树莓派插电后[红灯常亮表示正常](https://www.raspberrypi.org/forums/viewtopic.php?t=247054)

## 树莓派设置

路由器默认 IP 是 `192.168.1.1`，用户为 `root`，密码为 `password`。如果操作中出现问题导致无法继续配置，请重新刷入固件。

### 连接树莓派

选择一种连接树莓派的方式：

- 断开树莓派的有线连接，电脑连接树莓派发射的 WIFI：OpenWrt
- 断开电脑的无线连接，用网线接入树莓派

### 修改 WIFI 密码

为了防止别人连上 WIFI 捣蛋，先修改 WIFI 密码。

1. 点击「网络 -> 无线 -> 修改」
1. 点击「基本设置」，在「ESSID」填入 WIFI 名称
1. 点击「无线安全」，在「密码」填入新密码
1. 点击「保存&应用」

### 更改 LAN 口 IP 地址

我的路由器管理界面地址为 192.168.0.1，接下来要把树莓派的 IP 改为与路由器同一网段，即 192.168.0.x（0≤x≤255）。这里我把树莓派 LAN 口 IP 设置为 192.168.0.100。为了避免冲突，不要把树莓派 LAN 口 IP 最后一段设置成 0/1/255。请根据情况设置，不要照搬我的 IP。如果你的路由器管理界面为 192.168.31.1，那你可以把 IP 设置为 192.168.31.100。更改 IP 后请记好，以后管理界面都在 192.168.0.100。设置前在电脑可以打开终端（CMD 或 Powershell ）检查是否冲突：

```
ping 192.168.0.100
```

如果显示「Destination Host Unreachable」就代表地址没被占用。如果没问题就选择一种设置方式将 LAN 口 IP 改为 192.168.0.100：

- 打开终端执行命令：

    ```
    ssh root@192.168.1.1 # 密码是 password
    uci set network.lan.ipaddr=192.168.0.100
    uci commit network
    /etc/init.d/network restart
    ```

- 用浏览器访问 <http://192.168.1.1/>，用户名为 `root`，密码为 `password`，手动设置：

    - 点击「网络 -> 接口 -> LAN -> 修改」
    - IPv4 地址改为 192.168.0.100
    - 点击「保存&应用」

设置好后重新连接树莓派网络。

### 更改 LAN 口参数

- 登陆 <http://192.168.0.100/>
- 点击「网络 -> 接口 -> LAN -> 修改」
    - 协议：静态地址
    - IPV4 地址：192.168.0.100（之前修改过，现在保持不变）
    - IPv4 子网掩码: 255.255.255.0
    - IPv4 网关：改为上级路由器管理界面 IP：192.168.0.1
    - Pv4 广播：把上级路由网段 IP 最后一段改为 255： 192.168.0.255
    - 使用自定义的 DNS 服务器：同样为上级路由器 IP：192.168.0.1
    - 忽略此接口/不在此接口提供 DHCP 服务 （在页面底部）：打勾
- 点击「保存&应用」

### 连接路由器

断开电脑与树莓派的连接，用网线将树莓派接到路由器 LAN 口。

## 客户端设置

连接主路由的设备需要进行以下设置：

- IP 获取方式改为 「静态（或手动）」
- IP 地址：填为路由器网段下任意不冲突的 IP （不能与已分配的 IP 冲突，IP 最后一段也不可为 0/1/255），以上文为例，可设置为 192.168.0.166
- 前缀长度/子网掩码：若提示填写前缀长度，则填写 24，若提示填写子网掩码，则填写 255.255.255.0
- DNS：填写为树莓派 LAN 口 IP：192.168.0.100
- 网关/路由器：填写为树莓派 LAN 口 IP：192.168.0.100
- 其他设置保持默认即可

## 安装后的设置

建议修改管理员密码，其余设置按需调整。

### 扩充容量

固件只使用闪存卡 1G 左右的空间，剩下的空间就闲置了。我前面刷入了 ext4 固件，使用 Linux 系统的 GParted 调整 rootfs 分区即可扩充空间。rootfs 分区前后至少留出 4M 的空间[^jian]。详细教程：[SD 卡分区扩容指南 | 美丽应用](https://mlapp.cn/1011.html)。

[^jian]: 「rootfs 分区前后至少留出 4M 的空间」的说法是在[这里](https://mlapp.cn/1011.html)看到的，其实我也不知道为什么要留出 4M 空间。如果你知道，请告诉我。

### 修改管理员密码

1. 点击「系统 -> 管理权」
1. 在「密码」和「确认密码」处填入管理员密码
1. 在「SSH 密钥」处填写公钥后可以 SSH 免密码连接
1. 点击「保存&应用」

### 关闭电源灯

红色电源灯看着不舒服，于是我就关掉了。

点击「系统 -> LED 配置」，使用两个配置。

- 配置 1
    - 软件：led0
    - LED 名称：led0
    - 默认状态：不打勾
    - 触发器：无
- 配置 2
    - 软件：led1
    - LED 名称：led1
    - 默认状态：不打勾
    - 触发器：无

### 防火墙

我的树莓派刷入系统网络后没问题，但还是引用一下[旁路由设置指南](https://mlapp.cn/1008.html)的内容，留给需要的人。

> 1. 如果你的上级路由固件为 老毛子 Pandavan，树莓派做旁路由出现卡顿情况的话，请尝试关闭 Wan 口设置中的 “IPv4 硬件加速”
> 1. 如果你严格按照此文章操作，但出现 **无法上网、访问国内网站缓慢** 等症状，可在完成上文全部步骤的基础上，在“网络 - 防火墙 - 自定义规则”中新增一行 iptables 规则并重启防火墙再试：
>
>     ```
>     iptables -t nat -I POSTROUTING -j MASQUERADE
>     ```
>
>     若仍未解决，可以尝试删除原有两条规则并重启防火墙再试：
>
>     ```
>     iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 53
>     iptables -t nat -A PREROUTING -p tcp --dport 53 -j REDIRECT --to-ports 53
>     ```
>
> 1. 如果以上两个方法未能解决，请尝试在 Lan 口的“物理设置”中取消“桥接接口”的打勾，并在下方的“接口”中选择“eth0”，保存并应用再试。但请注意，此时树莓派的板载无线网卡将无法使用 (有信号但无法上网)。
> 1. 本篇文章所述设置方法可能对某些型号的华为路由器无效，建议更换其他路由器再试。

### 超频与散热

超频后性能更强，相关教程请看我写的两篇博客。

- [在 OpenWrt 控制树莓派 Argon Mini Fan](/zh-cn/post/2021/09/15/openwrt-argon-mini-fan/)
- [树莓派 4B 超频教程](/zh-cn/post/2021/09/20/raspberry-pi4-overclock/)

## 问答

### 树莓派与路由器断开连接后，怎么让电脑连接树莓派？

通过 WIFI 或网线连接树莓派，手动把 IP 设置为 192.168.0.100 的同一网段，即 192.168.0.x（0≤x≤255，x≠100），例如 192.168.0.1。此时就能连接，可以用浏览器进入管理界面 192.168.0.100 了。

### 忘了树莓派的 IP 地址怎么办？

先把 microSD 卡插入 Linux 电脑，然后打开终端执行命令。

```bash
# 查看分区
# user 为你的用户名
ls /media/user
# 11cd116c-beae-43ae-bfb5-b8ec18c9b98a  boot  disk

# 进入分区
# 请根据情况输入分区名称
cd /media/user/11cd116c-beae-43ae-bfb5-b8ec18c9b98a

# 查看 ip
grep "ipaddr" ./upper/etc/config/network
# option ipaddr '127.0.0.1'
# option ipaddr '192.168.0.100'
```
输出结果里的 192.168.0.100 就是 IP 树莓派地址。如果你不会用 Linux 就重新刷固件吧。

### OpenWrt-Rpi 的插件太多了，有精简版吗？

请使用 OpenWrt-Rpi 的姊妹版 [OpenWrt-Mini](https://github.com/SuLingGG/OpenWrt-Mini)，点击[这里](https://openwrt.cc/snapshots/targets/bcm27xx/bcm2711/)下载，安装方法和 OpenWrt-Rpi 一样。

## 参考资料

- [SuLingGG/OpenWrt-Rpi: Raspberry Pi & NanoPi R2S/R4S & G-Dock & x86 OpenWrt Compile Project. (Based on Github Action / Daily Update)](https://github.com/SuLingGG/OpenWrt-Rpi)
- [自编译 OpenWrt 系列 - 旁路由设置指南 | 美丽应用](https://mlapp.cn/1008.html)
- [自编译 OpenWrt 系列 - SD 卡分区扩容指南 | 美丽应用](https://mlapp.cn/1011.html)
- [关闭树莓派的指示灯 · Issue #150 · SuLingGG/OpenWrt-Rpi](https://github.com/SuLingGG/OpenWrt-Rpi/issues/150)