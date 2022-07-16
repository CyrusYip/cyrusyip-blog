---
title: 在 RStudio 中使用 Fcitx5（Kubuntu 20.10）
date: '2020-11-01'
slug: use-fcitx5-in-rstudio-on-kubuntu20.10
tags:
  - Fcitx5
  - RStudio
---

2022 年 7 月 16 日更新：[Electron 版的 RStudio 可以正常使用 Fcitx5 了](https://github.com/rstudio/rstudio/issues/1903#issuecomment-1183477202)，位置也正常。

在 Kubuntu 20.10 使用 RStudio 的时候，发现它不支持 Fcitx。参考 [RStudio 官方的方法](https://support.rstudio.com/hc/en-us/articles/205605748-Using-RStudio-0-99-with-Fctix-on-Linux)，成功在 RStudio 里面用上了 Fcitx 5。里面部分内容已经过时，应该用下面这个命令才对：

```bash
sudo ln -s /usr/lib/$(dpkg-architecture -qDEB_BUILD_MULTIARCH)/qt5/plugins/platforminputcontexts/libfcitxplatforminputcontextplugin.so /usr/lib/rstudio/plugins/platforminputcontexts
```

最近把 Kubuntu 20.04 升级到了 20.10,结果无法在 RStudio 中使用 Fcitx5 了。可恶，为什么 RStudio 不支持 Fcitx！官方不作为，那只好自己动手了。

首先尝试了编译 fcitx-qt5，失败。不行，我要~~死磕这个问题~~认怂了，用 Ibus 去了。把输入法设置成 Ibus 之后，用了一段时间；感觉真是难用，还没有云拼音，突然十分怀念 Fcitx5。于是我启动了 Fcitx5，发现它可以和 Ibus 共存，真是不可思议。又可以在 RStudio 里用 Fcitx5了。

下面是设置方法：

```bash
# 安装 Ibus 输入法，将它设置为默认的输入法
sudo apt install ibus
im-config -n ibus

# 安装 Fctix5
sudo apt install \
fcitx5 \
fcitx5-pinyin \
fcitx5-chinese-addons \
fcitx5-frontend-gtk2 \
fcitx5-frontend-gtk3 \
fcitx5-frontend-qt5 \
kde-config-fcitx5 \
fcitx5-module-ibus

# 开机启动 Fcitx5
cp /usr/share/applications/fcitx5.desktop ~/.config/autostart/

# 设置 Fcitx5（如果已经设置过了就跳过这一步）
fcitx5-configtool

# 如果有缺失的包就先添加下面的 PPA：
# sudo add-apt-repository ppa:hosxy/fcitx5
```

这个方法有个坏处：Fcitx5 在某些软件中显示的位置不正确。

![fcitx5-in-rstudio](https://user-images.githubusercontent.com/60951091/97728651-c4c90d00-1b0c-11eb-833d-09ab5753def9.png)

俗话说，如果解决不了问题，就把提出问题的人解决掉。软件亦是如此，这个软件有问题，就换另一个咯。你可以用 RStudio Server，它是用浏览器访问的，Chrome 和 Firefox 都支持 Fcitx 5。如果你还是搞不定，那可以抛弃 RStudio，改用 Visual Studio Code。VS Code 也是支持 [R 语言](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.r)的。

---

延伸阅读

- [真正的解决方法：通过编译 fcitx-qt5 来让 RStudio 支持 Fcitx5](https://jiangjun.link/post/debian-mendeley-rstudio-fcitx/)
- [RStudio 中无法使用 Fcitx 的报告](https://github.com/rstudio/rstudio/issues/1903)
