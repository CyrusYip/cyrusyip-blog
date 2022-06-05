---
title: 在 Debian/Ubuntu 安装旧版 WPS Linux
date: '2021-08-08'
slug: ubuntu-install-older-wps
tags:
  - Kubuntu
  - Ubuntu
  - Linux
---

最近把 WPS For Linux 更新到最新的 11.1.0.10702，打开就提示「系统DPI不对称，WPS可能存在显示问题」，果然 WPS 都是模糊的。打算去[官网](https://linux.wps.cn/)找上个版本，结果只有最新版，气死我了！在谷歌搜了几次也找不到历史版本。随后我在万能的 AUR（Arch User Repository）找到了 [WPS](https://aur.archlinux.org/packages/wps-office-cn/)，这里有旧版的下载链接。以下是下载与安装步骤：

1. 点击页面的 [View Changes](https://aur.archlinux.org/cgit/aur.git/log/?h=wps-office-cn)

1. 在 Commit message 这里找到上个版本 11.1.0.10161

1. 点击 [upgpkg: wps-office-cn 11.1.0.10161](https://aur.archlinux.org/cgit/aur.git/commit/?h=wps-office-cn&id=c7f6d16d3232488f53755137c58c21736e84f0e6)

1. 搜索 `source_x86_64 = `，找到 + 开头的绿色文本，<https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/10161/wps-office_11.1.0.10161_amd64.deb> 就是我们要的下载地址

1. 安装后要删除配置才能用

    ```bash
    # 下载
    wget https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/10161/wps-office_11.1.0.10161_amd64.deb
    # 安装
    sudo apt install ./wps-office_11.1.0.10161_amd64.deb
    # 删除配置文件
    rm -rI /home/hunter/.config/Kingsoft/
    ```

后记：我从未用过 Arch Linux，我一开始把仓库克隆下载就查看 PKGBUILD 文件，歪打误撞地得到了下载地址。后来才发现下载地址就在 `.SRCINFO` 文件，之前真的白费力气了。突然感觉 Arch Linux 真的是啥软件都有人打包，连 UOS 独占的[微信](https://aur.archlinux.org/packages/wechat-uos/)都有，搞得我都想从 Kubuntu 换过去了。Ubuntu 半年才更新一次，每次更新完都要手动处理软件源，实在是烦。Arch Linux 这种滚动更新的 Linux 发行版对我来说很有吸引力，有空的时候要试试。

以下是先前惨痛的尝试。

---

这有个 Git 仓库，里面的 PKGBUILD 就是安装脚本。在里面能找到旧版的下载链接。

克隆仓库到本地。

```bash
git clone https://aur.archlinux.org/wps-office-cn.git
cd wps-office-cn
git log --pretty=oneline --graph --abbrev-commit
git reset --hard c7f6d16
```

现在看到上个版本 11.1.0.10161 对应的提交是 c7f6d16，回退到这个版本。

```bash
git reset --hard c7f6d16
grep "pkgver=" PKGBUILD # 查看版本号，版本号为 11.1.0.10161
grep "source_x86_64=" PKGBUILD # 查看下载网址，网址为 https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/${pkgver##*.}/wps-office_${pkgver}_amd64.deb

# ARM 设备的应该用下面这条命令
# grep "source_aarch64" PKGBUILD
# ARM 版的网址为 https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/${pkgver##*.}/wps-office_${pkgver}_arm64.deb
```

把下载网址（`https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/${pkgver##*.}/wps-office_${pkgver}_amd64.deb`）的 `${pkgver##*.}` 替换为版本号的最后一串数字（10161），把 `${pkgver}` 替换为版本号（11.1.0.10161），最后获得的网址就是 WPS 11.1.0.10161 的下载网址：<https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/10161/wps-office_11.1.0.10161_amd64.deb>。现在就可以下载安装，安装完后要删除配置文件才能运行。

```bash
# 下载
wget https://wdl1.cache.wps.cn/wps/download/ep/Linux2019/10161/wps-office_11.1.0.10161_amd64.deb
# 安装
sudo apt install ./wps-office_11.1.0.10161_amd64.deb
# 删除配置文件
rm -rI /home/hunter/.config/Kingsoft/
```

如果你想安装其他版本，不用重复我前面的步骤。在[这里](https://aur.archlinux.org/cgit/aur.git/log/?h=wps-office-cn)找你想要的版本，把版本号替换到我前面找到的网址就行了，这个网址一直没变过。要是不行就从头做起吧。