---
title: KDE Plasma X11 黑屏后重建账号
date: 2023-12-05T00:00:00+08:00
slug: new-account-for-kde-plasma
tags:
  - Arch Linux
  - KDE Plasma
  - Linux
lastmod: 2024-02-18T00:18:43+08:00 # remove this line if the content is actually changed
---

最近 Arch Linux 升级重启后进 KDE Plasma X11 就黑屏剩下光标，某次升级后 Wayland 也用不上了。在 Arch 论坛看到一个[相似的情况](https://bbs.archlinux.org/viewtopic.php?id=290292)，但是里面的方法在我这边没用。提问和等待也要花时间，索性就新建账号吧，至少新账户用 KDE Plasma 没问题。

## 新建用户

按下 `Ctrl Alt F4` 进入 tty 新建用户。

```bash
useradd --create-home --groups wheel --shell /bin/bash cyrus2
passwd cyrus2
```

按 `Ctrl Alt F1`（也可能是 `F2` 或者 `F3`） 返回 sddm 登录新账户。

## 配置

1. 软件基本都是装在系统，无需重装。
2. 连接 WIFI
3. 安装[配置文件](https://github.com/CyrusYip/dotfiles)
4. 安装 zinit： `bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"`
5. 设置默认 Shell：`chsh --shell /usr/bin/zsh`
6. 安装 `kio-admin`，这样 dolphin 才能用管理员权限访问旧账户的家目录
7. 从旧账号复制配置文件
    - `~/.ssh`
    - `~/.gnupg`
    - `~/.local/share/keyrings/` （seahorse）
8. 移动家目录的文件（用 dolphin 复制容易卡住，还时不时询问密码，不要一次弄太多。`sudo lf` 里面复制的文件权限会变 root。复制 git 仓库超慢，最好忽略。）
    1. Desktop
    2. Documents
    3. Downloads
    4. Music
    5. Pictures 
    6. Videos
    7. VirtualBox VMs
9. 登录软件
    1. 登录 Firefox 和 Brave（[Brave 浏览器同步码的最后一个单词每天都不一样](https://community.brave.com/t/this-code-has-expired-generate-a-new-one-on-the-other-device-and-try-again/426964)）
        1. 登录 Bitwarden
    2. 登录 MegaSync 同步文件，同步完后删除旧账户的网盘文件
    3. 登录 Joplin
    4. 登录 VS Code，同步设置
    5. 登录 [GitHub CLI](https://cli.github.com/)
10. 克隆常用的 Git 仓库
11. 配置 KDE
    1. 添加 [Netspeed Widget](https://store.kde.org/p/998895)
    2. 新建两个 Virtual Desktop
    3. 开机启动（autostart）
        1. MegaSync
        2. Fcitx5
        3. Joplin
    4. bismuth 快捷键设置，`Settings -> Shortcuts -> Shortcuts -> Window Tiling`，打开需要使用的快捷键
    5. 其他快捷键
        1. `Switch to Next Screen = Meta +,`
        2. 点击 `Window Behavior`，关闭 `Active screen follows mouse`，打开 `Separate screen focus`
        3. `Lock Session = Meta+Ctrl+Space`
    6. 特效
        1. `Desktop Effects -> Virtual Desktop Switching Animation -> Fade Desktop`
    7. 设置 [plasma-hud](https://github.com/Zren/plasma-hud) 快捷键
        ```bash
        cp ~/.config/kwinrc{,.bak} # 备份
        kwriteconfig5 --file ~/.config/kwinrc --group ModifierOnlyShortcuts --key Alt "com.github.zren.PlasmaHUD,/PlasmaHUD,com.github.zren.PlasmaHUD,toggleHUD"
        qdbus org.kde.KWin /KWin reconfigure
        ```
12. GoldenDict 导入词典
13. 清理旧家目录里不需要的文件，比如 `~/.cache`

## 使用默认配置的感想

KDE Plasma 默认单击打开文件，这还挺好用的。
