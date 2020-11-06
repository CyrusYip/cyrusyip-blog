---
title: 在 Ubuntu 下配置 Fcitx5
date: '2020-11-06'
slug: configure-fcitx5-on-ubuntu
categories: []
tags:
  - Fcitx5
  - Ubuntu
lastmod: '2020-11-06T14:34:04+08:00'
---

# 安装

```bash
# 安装 Fcitx5
sudo apt install fcitx5 \
fcitx5-pinyin \
fcitx5-chinese-addons \
fcitx5-frontend-gtk2 \
fcitx5-frontend-gtk3 \
fcitx5-frontend-qt5 \
fcitx5-module-ibus \
fcitx5-module-cloudpinyin \
fcitx5-material-color

# 把 Fcitx5 设置为默认输入法
im-config -n fcitx5

# 设置 Fcitx5 拼音输入法
fcitx5-configtool

# 开机启动
cp /usr/share/applications/fcitx5.desktop ~/.config/autostart/
```

# 配置

## 修改标点符号键位映射

Fcitx5 默认的标点符号键位为：

```
$ cat /usr/share/fcitx5/punctuation/punc.mb.zh_CN
. 。
, ，
? ？
" “ ”
: ：
; ；
' ‘ ’
< 《
> 》
\ 、
! ！
$ ￥
^ ……
* ×
_ ——
( （
) ）
[ ·
] 「 」
~ ～
```

因为我常用 Markdown 和直角引号，所以把原本是弯引号的键位改成了直角引号，把方括号的键位改成了弯引号，取消了乘号和分隔符。如果要输入乘号和分隔符，就按下 `Ctrl + Alt + Shift + U`，输入`multiplication sign` 或 `middle dot`；使用 `Tab` 和 `Shift Tab` 选择，使用 `Enter` 确定。

设置方法：

1. 建立新的配置文件

    ```bash
    mkdir ~/.local/share/fcitx5/punctuation/
    touch ~/.local/share/fcitx5/punctuation/punc.mb.zh_CN
    nano ~/.local/share/fcitx5/punctuation/punc.mb.zh_CN
    ```

2. 把下面的配置内容复制进去：

    ```
    . 。
    , ，
    ? ？
    " 「 」
    : ：
    ; ；
    ' 『 』
    < 《
    > 》
    \ 、
    ! ！
    $ ￥
    ^ ……
    _ ——
    ( （
    ) ）
    [ ‘ ’
    ] “ ”
    ~ ～
    ```

3. 重启 Fcitx5

    ```bash
    pkill fcitx5 && fcitx5 &
    ```

变化如下：

```
$ icdiff punc.mb.zh_CN.old punc.mb.zh_CN.new -U 0
punc.mb.zh_CN.old                            punc.mb.zh_CN.new                           
" “ ”                                        " 「 」                                     
---                                          ---                                         
' ‘ ’                                        ' 『 』                                     
---                                          ---                                         
* ×                                                                                      
---                                          ---                                         
[ ·                                          [ ‘ ’                                       
] 「 」                                      ] “ ”
```

## 使用中文维基词库

1. [下载词库](https://github.com/felixonmars/fcitx5-pinyin-zhwiki/releases)

    选择日期最新的 `zhwiki-*.dict` 下载

2. 添加词库

    ```bash
    sudo mkdir /usr/share/fcitx5/pinyin/dictionaries # 建立词库目录
    sudo cp zhwiki-20201020.dict /usr/share/fcitx5/pinyin/dictionaries # 添加词库

3. 重启 Fcitx5

    ```bash
    pkill fcitx5 && fcitx5 &
    ```
