---
title: 在 Ubuntu 编译 GoldenDict
date: '2020-10-02'
slug: ubuntu-compile-goldendict
tags:
  - Ubuntu
  - GoldenDict
---

本文测试于 Ubuntu 21.04。

## 安装依赖

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

## Appimage 版本

想使用最新版的 GoldenDict，也可以试试 [Appimage 版](https://github.com/Abs62/goldendict/releases/tag/continuous)。

## 参考资料

- GoldenDict 代码库的[说明文档](https://github.com/goldendict/goldendict/blob/master/README.md)