---
title: 在 Linux 上使用京东京造（Keychron）K1 SE 的功能键（F1～F12）
date: '2022-01-18'
slug: k1se-function-keys-on-linux
tags:
  - Linux
  - keyboard
  - Keychron
---

K1 SE 的功能键在 Linux 上就永远是媒体键，按 `F12` 和 `fn + F12` 都是增加音量。解决办法：

```bash
echo 2 | sudo tee /sys/module/hid_apple/parameters/fnmode
```

现在按功能键就是功能键，按 `fn + 功能键` 就是媒体键，不过重启就失效了。下面是永久生效的方法：

```bash
echo options hid_apple fnmode=2 | sudo tee -a /etc/modprobe.d/hid_apple.conf
sudo mkinitcpio --allpresets
```

---

附言：京东京造 K 系列键盘就是贴了京东牌的 Keychron 键盘。

---

参考资料：

- [On an Apple Keyboard under Linux, how do I make the Function keys work without the fn modifier key? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/121395/on-an-apple-keyboard-under-linux-how-do-i-make-the-function-keys-work-without-t)
- [Apple Keyboard - ArchWiki](https://wiki.archlinux.org/title/Apple_Keyboard#Function_keys_do_not_work)