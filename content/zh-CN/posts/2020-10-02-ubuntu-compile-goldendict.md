---
title: 在 Ubuntu 编译 GoldenDict
date: 2020-10-02T00:00:00+08:00
slug: ubuntu-compile-goldendict
tags:
  - goldendict
  - ubuntu
lastmod: 2024-08-14T18:34:14+08:00
---

## 2024年8月14日更新

写这篇文章的初衷是 [GoldenDict](https://github.com/goldendict/goldendict) 没有停止开发但又很少发布新版，最近一次还是[一年前（2023年5月31号）](https://github.com/goldendict/goldendict/releases/tag/1.5.0)。现在推荐大家使用更新和发布频繁的 [Goldendict-ng](https://github.com/xiaoyifang/goldendict-ng)。Goldendict-ng 已被收录于 Debian、Ubuntu、Fedora、OpenSUSE 等 Linux 发行版，用 flatpak 安装也方便。

如果你点进来就是想编译 GoldenDict，请看 [Goldendict 的文档](https://github.com/goldendict/goldendict)，下面的内容可能已过时。

## 安装依赖

测试于 Ubuntu 21.04。

```bash
sudo apt-get update
sudo apt-get install git pkg-config build-essential qt5-qmake \
     libvorbis-dev zlib1g-dev libhunspell-dev x11proto-record-dev \
     qtdeclarative5-dev libxtst-dev liblzo2-dev libbz2-dev \
     libao-dev libavutil-dev libavformat-dev libtiff5-dev libeb16-dev \
     libqt5webkit5-dev libqt5svg5-dev libqt5x11extras5-dev qttools5-dev \
     qttools5-dev-tools qtmultimedia5-dev libqt5multimedia5-plugins \
     libopencc-dev liblzma-dev libzstd-dev
```

## 编译

```bash
# 卸载源里面的 GoldenDict
sudo apt remove goldendict
# 克隆源代码
git clone https://github.com/goldendict/goldendict.git
# 编译
cd goldendict
qmake "CONFIG+=chinese_conversion_support" "CONFIG+=zim_support"
make
# 安装
sudo make install
# 卸载
# sudo make uninstall
```

实际上不执行 `make install` 安装 GoldenDict 也可以用，运行编译好的 GoldenDict 就可以了。

```bash
chmod +x ./goldendict # 增加可执行权限
./goldendict          # 运行
```