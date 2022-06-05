---
title: 用 BASH 脚本更新各类软件包
date: '2020-12-25'
tags:
  - CLI
  - Linux
  - Ubuntu
slug: update-packages-script
---

刚用 Ubuntu 的时候，觉得用 apt 安装软件很方便，从此不再需要像用 Windows 一样要去官方下载软件。用久了也发现 Ubuntu 软件仓库有两个问题：软件不是最新版本、缺少某些软件。要解决这些问题，除了添加 PPA 以外，就只能用的其他包管理器作为补充。用多了包管理器，每次更新都要输入好几个命令，太麻烦啦。还是用 BASH 脚本一次性更新各类软件包吧。

先安装待会需要用的软件，`apt-fast` 用于加速 `apt` 的下载速度，`pipupgrade` 用来更新 Python 包，`npm-check` 用于更新 npm 包。

```bash
# install apt-fast
# homepage: https://github.com/ilikenwf/apt-fast

sudo add-apt-repository ppa:apt-fast/stable
sudo apt-get update
sudo apt install apt-fast

# install pipupgrade
# homepage: https://github.com/achillesrasquinha/pipupgrade
pip install pipupgrade

# install npm-check
# homepage: https://github.com/dylang/npm-check
sudo npm install -g npm-check
```

下面就是更新脚本，将它[保存到 PATH 变量包含的目录](/zh-cn/post/2020/12/24/put-software-into-path/)里，然后授予执行权限就可以直接在命令行运行了。

```bash
#!/bin/bash -x

# apt
sudo apt update
sudo apt-fast upgrade -y

# tlmgr
sudo tlmgr update --self --all

# npm
sudo npm-check --global --update--all

# pip
pipupgrade --ignore-error -y

# cran
Rscript -e "update.packages()"
```
