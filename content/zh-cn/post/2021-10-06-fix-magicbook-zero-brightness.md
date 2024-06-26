---
title: 修复 MagicBook 14（Ryzen5 3500U）在 Arch Linux 下亮度突然变 0 的问题
date: 2021-10-06T00:00:00+08:00
slug: fix-magicbook-zero-brightness
tags:
  - MagicBook 14
  - arch-linux
  - linux
lastmod: 2023-03-08T14:03:06+08:00
---

**2023 年 3 月 8 日更新**：MagicBook 14 在以下内核亮度正常，已经不需要改内核参数了。

- linux 6.2.2.arch1-1
- linux-lts 6.1.14-1
- linux-zen 6.2.2.zen1-1

现在加上参数反而会导致无法调节亮度。如果之前改过内核参数，请删除并重新生成引导程序配置。

---

我的 MagicBook 14（Ryzen5 3500U）休眠/睡眠/插电/断电/开机后可能亮度降为 0。解决办法：启动时使用以下内核参数。

```
acpi_backlight=vendor
```

如果你用 GRUB，就修改 `/etc/default/grub`，在 `GRUB_CMDLINE_LINUX_DEFAULT` 加上内核参数，如果有多个参数就以空格分开。

```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 acpi_backlight=vendor"
```

然后刷新配置文件：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

---

参考资料：[[SOLVED] Failed to start Load/Save Screen Backlight Brightness / Laptop Issues / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=211967)

延伸阅读：[What do the kernel parameters acpi_osi=linux and acpi_backlight=vendor do? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/110624/what-do-the-kernel-parameters-acpi-osi-linux-and-acpi-backlight-vendor-do)
