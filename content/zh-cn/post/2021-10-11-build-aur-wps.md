---
title: 以 WPS 为例，手动构建和安装 AUR 的包
date: '2021-10-11'
slug: build-aur-wps
tags:
  - Arch Linux
  - Linux
---

**更新**：安装好旧版后发现最新的 [WPS 国际版](https://aur.archlinux.org/packages/wps-office/)并没有界面模糊的问题，白折腾了。

```bash
# 安装国际版 WPS
yay -Syu wps-office
```

---

最近系统从 Kubuntu 切换到 Arch Linux 了，安装了最新的 [WPS 国内版](https://aur.archlinux.org/packages/wps-office-cn/)，还是遇到了界面模糊的问题。干脆就手动安装旧版的吧。`makepkg` 不支持 root 帐户，所以要使用非 root 帐户操作。

```bash
# 安装 Git
sudo pacman -Syu git
# 获取 PKGBUILD
git clone https://aur.archlinux.org/wps-office-cn.git
cd wps-office-cn
# 查看旧版 commit
git log
# 切换到旧版（11.1.0.10161）
git reset --hard c7f6d16d3232488f53755137c58c21736e84f0e6
# 更新系统
sudo pacman -Syu
# 安装依赖并打包
makepkg --syncdeps # 简写：makepkg -s
# 安装打包好的 WPS，其实就是使用 pacman -U 安装
makepkg --install # 简写：makepkg -i
```