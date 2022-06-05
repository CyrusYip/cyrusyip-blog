---
title: 轻松安装 Python 和 Python 包
date: '2021-02-01'
slug: simple-method-of-installing-python-and-python-packages
tags:
  - programming
  - Python
---

## 安装

Python 新手遇到的第一个问题就是安装 Python，我看好多教程都推荐到[官网](https://www.python.org/)下载。这当然是正确的做法，不过还有更简单的方法。

### Windows

在 Win 10 安装 Python 特别简单，直接在 Microsoft Store 搜索 Python 就可以安装最新版本。注意，软件开发者是 Python Software Foundation。安装好之后在 Command Prompt 输入 Python 就可以使用了。

![Python in Microsoft Store](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2021-02-01_microsoft-store-python.png)

如果你用的是 LTSC 版本，就点击[这里](https://github.com/kkkgo/LTSC-Add-MicrosoftStore)下载 Microsoft Store 安装包。如果是 LTSB 就点击[这里](https://github.com/kkkgo/LTSB-Add-MicrosoftStore)下载安装包。如果你用 Win 10 之前的 Windows，就安装 [Miniconda](https://docs.conda.io/en/latest/miniconda.html) 吧，参考下面的用法。

### Linux

在 Linux 发行版一般都自带 Python，可以直接用。比如 Ubuntu 20.10 就自带 Python 3.8.6。不推荐采用源码编译，源码编译可能会覆盖系统自带的 Python。如果要用最新版的 Python，就先安装 [Miniconda](https://docs.conda.io/en/latest/miniconda.html)，再创建虚拟环境：

```bash
conda create --name py3.9 python=3.9 # 创建包含最新 Python 3.9 的环境
conda activate py3.9 # 激活环境
```

取消激活的命令是：

```bash
conda deactivate
```

取消自动激活环境的命令是：

```bash
conda config --set auto_activate_base false
```

如果你从事计算科学的工作，可以直接安装包含相关软件包的 [Anaconda](https://www.anaconda.com/products/individual)。其实 Miniconda 也可以安装 Anaconda 包含软件包：

```bash
conda create --name ana anaconda # 创建包含 Anaconda 所有软件包的环境
conda activate ana # 激活环境
```

## 设置镜像源

咱们大中华局域网连接 Internet 时，时而断线，时而速度慢。这时候就可以给 conda 和 pip 设置国内的镜像源，速度马上就飞起来了。

### pip 镜像源

下面用的是清华镜像站的 [pypi 镜像](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)。

临时使用：

```bash
pip install --index-url https://pypi.tuna.tsinghua.edu.cn/simple some-package
```

设置为默认：

```bash
# 先升级 pip 再配置
pip install --index-url https://pypi.tuna.tsinghua.edu.cn/simple pip --upgrade
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### conda 镜像源

下面用的是清华镜像站的 [Anaconda 镜像](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)。

先建立文件：

```bash
conda config # 生成配置文件
nano ~/.condarc # 编辑配置文件
```

然后把下面的内容复制到 `.condarc`：

```
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

最后运行 `conda clean -i` 清楚缓存，确保用的是清华源的索引。

## 安装 Python 包

我们可以用 pip 和 conda 安装 Python 包。

### pip 用法

从 Microsoft Store 安装的 Python 自带 pip，Linux 的话就用自带的包管理器安装。

```bash
sudo apt install python3-pip
```

检查一下 pip 是否安装成功：

```bash
$ pip --version
pip 21.0.1 from /home/xxxx/.local/lib/python3.8/site-packages/pip (python 3.8)
```

有显示结果就是安装成功了。运行 `pip --help` 可以查看帮助，下面介绍几个最常用的命令。

- 查找

    ```
    pip search you-get
    ```

    如果无法搜索的话，可以直接打开 [Python Package Index](https://pypi.org/) 搜索。

- 安装

    ```
    pip install you-get
    ```

    可以同时安装几个软件，用空格隔开就可以了。卸载和升级也可以作用于多个软件包。

    ```
    pip install you-get youtube-dl
    ```

- 升级部分包

    ```
    pip install --upgrade you-get
    ```

- 升级所有包

    pip 没有升级所有包的命令，要升级所有包，就得用 [pipupgrade](https://github.com/achillesrasquinha/pipupgrade) 或者其他同类工具。先安装 pipupgrade：

    ```
    pip install pipupgrade
    ```

    然后就可以用它升级所有包了：

    ```
    pipupgrade --ignore-error --yes --verbose
    ```

- 列举已安装的包

    ```
    pip list
    ```

- 卸载

    ```
    pip uninstall you-get
    ```


### conda 用法

运行 `conda --help` 可以查看帮助，安装、卸载和升级同样可以作用于多个软件包。

- 查找

    ```
    conda search pandoc
    ```

- 安装

    ```
    conda install pandoc
    ```

- 升级部分包

    ```
    conda update yaml
    ```

- 升级所有包

    ```
    conda update --all
    ```

- 列举已安装的包

    ```
    conda list
    ```

- 卸载

    ```
    conda remove pandoc
    ```

## 附录

- [conda 官方手册](https://docs.conda.io/projects/conda/en/latest/index.html)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/)
