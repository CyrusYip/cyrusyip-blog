---
title: 红米 AC2100 刷 breed 后刷回官方固件
date: 2022-10-16T00:00:00+08:00
slug: ac2100-stock-firmware
tags:
  - redmi-ac2100
lastmod: 2022-11-29T20:35:00+08:00
---

相关文章：[红米 AC2100 刷入 OpenWrt 固件](/zh-cn/post/2021/06/19/ac2100-openwrt/)


红米 AC2100 刷回官方固件的主要步骤：准备工具、刷入官方 bootloader、刷入官方固件。

## 准备工具

1. 官方 bootloader（找不到官方链接，我在[这里](https://wifi.gitbook.io/ac2100)下载的）
1. [Redmi路由器AC2100 稳定版固件](http://miwifi.com/miwifi_download.html)（我下载的版本是 [miwifi_rm2100_all_fb720_2.0.23.bin](https://cdn.cnbj1.fds.api.mi-img.com/xiaoqiang/rom/rm2100/miwifi_rm2100_all_fb720_2.0.23.bin)）
1. [小米路由器修复工具](http://miwifi.com/miwifi_download.html)
1. 牙签
1. 网线
1. Windows 电脑[^nao]

[^nao]: 小米路由器修复工具只有 Windows 版，我的系统是 Arch Linux。我用了 Virtualbox 启动 Win10 来刷机的，把 USB 网卡分配给虚拟机就行了。

## 刷入 bootloader

1. LAN 插到电脑
1. 拔下 AC2100 的电源，用牙签顶住 Reset 键，插电，蓝色灯闪烁时松开
1. 访问 `192.168.1.1`
1. 固件更新->Bootloader->选择文件->选刚刚下载的 `bootloader-redmi-ac2100.bin`->勾选自动重启->上传->更新

## 刷入官方固件

1. 拔下电源，用牙签按住 Reset 键，插电，橙色灯闪烁时松开
1. 解压修复工具，打开 `MIWIFIRepairTool.x86.exe`
1. 本地上传->浏览->选择 `miwifi_rm2100_all_fb720_2.0.23.bin`->选择对应的网卡->下一步
1. 蓝色灯闪烁表示成功，拔电源再接上，电脑打开 `http://192.168.31.1/` 有页面就成功啦

## 文件哈希值

|        | bootloader-redmi-ac2100.bin                                      | miwifi_rm2100_all_fb720_2.0.23.bin                               |
|--------|------------------------------------------------------------------|------------------------------------------------------------------|
| md5    | f4ba3f7b01d2dd47c664528688166cd1                                 | ca32a6cb7e60df65a391fe5f235fb720                                 |
| sha256 | e09c1a8ddb794ed237960b021ac34c0602374211cc5e589f6b2084b9fde3f96c | f1e374fcecab26e6d968f24e4753f0c78543ff8819c7fd4a3e6aa6316c943994 |

```
❯ md5sum bootloader-redmi-ac2100.bin
f4ba3f7b01d2dd47c664528688166cd1  bootloader-redmi-ac2100.bin
❯ md5sum miwifi_rm2100_all_fb720_2.0.23.bin
ca32a6cb7e60df65a391fe5f235fb720  miwifi_rm2100_all_fb720_2.0.23.bin
❯ sha256sum bootloader-redmi-ac2100.bin
e09c1a8ddb794ed237960b021ac34c0602374211cc5e589f6b2084b9fde3f96c  bootloader-redmi-ac2100.bin
❯ sha256sum miwifi_rm2100_all_fb720_2.0.23.bin
f1e374fcecab26e6d968f24e4753f0c78543ff8819c7fd4a3e6aa6316c943994  miwifi_rm2100_all_fb720_2.0.23.bin
```

参考资料：[小米/红米AC2100 刷breed后 刷回官方固件 - YouTube](https://youtu.be/r1llyBTgq74)
