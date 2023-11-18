---
title: 在 Proxmox VE 安装最新 microcode
date: '2023-09-20'
slug: install-microcode-on-proxmox
tags:
  - Proxmox Virtual Environment
  - homelab
  - Debian
translationKey: install-microcode-on-proxmox
---

本教程介绍用 `apt` 命令安装最新版微码（microcode）的方法，以改善 N5105 虚拟机死机问题。为了避免弄坏系统，请勿从 unstable 软件仓库安装微码以外的软件包。本教程测试于 Proxmox VE 7.4 / 8.0.2。

<!--
pve-manager/7.4-3/9002ab8a (running kernel: 6.2.11-1-pve)

[I] root@pve ~ [255]# pveversion -v
proxmox-ve: 8.0.2 (running kernel: 6.2.16-12-pve)
pve-manager: 8.0.4 (running version: 8.0.4/d258a813cfa6b390)
-->

微码是修复中央处理器（CPU）的固件。它在开机时被使用，[应该装在宿主机（host）](https://unix.stackexchange.com/q/572754/447708)，不要装在虚拟机（virtual machine）。Proxmox （Debian stable）仓库的微码可能是过时的，所以要从 Debian unstable 仓库安装。

## 安装方法

添加 unstable 仓库，只使用 `non-free-firmware` 组件。

```shell
echo "deb http://deb.debian.org/debian/ unstable non-free-firmware" > /etc/apt/sources.list.d/debian-unstable.list
```

创建 `/etc/apt/preferences.d/unstable-repo` 配置文件，添加以下内容，防止从 unstable 仓库安装其他软件包。

```
# 降低所有 unstable 仓库软件包的优先级
Package: *
Pin: release o=Debian,a=unstable
Pin-Priority: 10

# 允许从 unstable 仓库升级微码
Package: intel-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
# 此行应该是空行或者注释
Package: amd64-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
```

更新仓库，确保没有软件包从 unstable 仓库升级。

```shell
apt update && apt list --upgradable
```

根据处理器厂商安装微码软件包。

```shell
# Intel 处理器
apt install intel-microcode
# AMD 处理器
apt install amd64-microcode
```

重启 Proxmox。

```shell
reboot
```

核实微码加载情况。

```shell
journalctl -k --grep="microcode updated early to"
```

看到和下面类似的输出信息就对了。

```
Sep 10 11:38:55 pve kernel: microcode: microcode updated early to revision 0x24000024, date = 2022-09-02
```

此处的 2022-09-02 和微码软件包版本不对应，它表示 Intel 上次更新本机处理器（N5105）的日期。

## 其他安装方法

如果你不想添加 unstable 仓库，可以直接从 Debian 网站下载微码软件包。根据处理器厂商，从 [amd64-microcode](https://packages.debian.org/sid/amd64/amd64-microcode/download) 或者 [intel-microcode](https://packages.debian.org/sid/amd64/intel-microcode/download) 获取最新的下载链接，使用 `wget '链接'` 命令下载，`apt install ./文件名.deb` 命令安装。

示例：

```shell
# AMD 处理器
wget 'http://ftp.us.debian.org/debian/pool/non-free-firmware/a/amd64-microcode/amd64-microcode_3.20230808.1.1_amd64.deb/DontCopyThisLinkVerbatim'
apt install ./amd64-microcode_3.20230808.1.1_amd64.deb

# Intel 处理器
wget 'http://ftp.us.debian.org/debian/pool/non-free-firmware/i/intel-microcode/intel-microcode_3.20230808.1_amd64.deb/DontCopyThisLinkVerbatim'
apt install ./intel-microcode_3.20230808.1_amd64.deb
```



## 卸载方法

移除微码软件包和 unstable 仓库：

```shell
# 移除微码软件包
apt purge amd64-microcode intel-microcode
apt autoremove
# 确保没有从 unstable 仓库安装软件
apt list --installed | grep '/unstable'
# 移除 unstable 仓库与配置文件
rm /etc/apt/sources.list.d/debian-unstable.list /etc/apt/preferences.d/unstable-repo
# 重启
reboot
# 检查微码，此时应该看到 No entries
journalctl -k --grep="microcode updated early to"
```

## 缘起

我在零刻 EQ59[^eq59] N5105 迷你主机安装了 Proxmox VE。一开始用得挺开心的，但部分虚拟机时不时死机，搞的我很烦。[我发现很多 N5105 处理器的用户也有一样的问题](https://forum.proxmox.com/threads/vm-freezes-irregularly.111494/)，其中一个解决方法是安装微码，于是我就装上最新的微码。虽然微码没有完全解决问题，但确实大大减少了死机的情况。除此之外，我还安装了 Proxmox VE No-Subscription 仓库里最新的内核。

[^eq59]: 零刻 EQ59 N5105 对应的海外型号是 Beelink U59 N5105.

## 延伸阅读

- [Microcode - Debian Wiki](https://wiki.debian.org/Microcode)
- [Microcode - ArchWiki](https://wiki.archlinux.org/title/Microcode)
- [Do I need CPU (or any) microcode in a QEMU/KVM virtual machine? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/572757/447708)
- [apt - How to install some packages from "unstable" Debian on a computer running "stable" Debian? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/8051/447708)
- [AptConfiguration - Debian Wiki](https://wiki.debian.org/AptConfiguration)
- [DontBreakDebian - Debian Wiki](https://wiki.debian.org/DontBreakDebian)
