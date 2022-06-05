---
title: Arch Linux 安装与配置记录
date: '2021-09-28'
slug: install-archlinux
tags:
  - Arch Linux
  - Linux
---

## 使用感受

Arch Linux 用起来太爽了，我已经在主力电脑装上了！软件超多，官方仓库加上 [archlinuxcn 仓库](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/) 和 [AUR](https://aur.archlinux.org/)，真的是什么都能安装。滚动更新保证软件都是最新版，还不用像 Ubuntu 那样苦苦地等半年更新，也不用准备一大段时间来更新系统，每次用电脑更新一下就行，也就几分钟的事情。[ArchWiki](https://wiki.archlinux.org/) 的资料超级全面，我要查的东西里面都有。Arch Linux 平时用起来比 Kubuntu 更快，开机才三四秒，关机也是几秒钟。之前用 Kubuntu 遇到的问题在 Arch Linux 上都没了：关机两三分钟才行、休眠后不会关屏幕、版本更新后要手动修改软件源、KDE Plasma 没有休眠按键。pacman 安装和卸载软件也超快，甩 apt 几条街。AUR 虽然什么软件都有，但都是未经审核的，我还挺担心遇到恶意代码。接下来学学 Bash 和打包软件才行，不然看不懂 AUR 上面的打包脚本。

## 安装

本文多次出现 `cat` 命令，例如：

```
❯ cat ~/.xprofile
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

以上命令在本文的意思是创建或修改 `~/.xprofile`，并添加

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

Arch Linux 的安装教程有很多，我安装的时候主要看这三份。

- [Arch Linux 安装使用教程 - ArchTutorial - Arch Linux Studio](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/)
- [Installation guide - ArchWiki](https://wiki.archlinux.org/title/installation_guide)
- [How To Install Arch Linux 2021 [Step by Step Guide] | ITzGeek](https://www.itzgeek.com/how-tos/linux/arch-linux/install-arch-linux-2021.html)

我的电脑用 UEFI 启动，使用三个分区。

- `/efi`
- `/`
- `swap`

EFI 分区本来就有了，跳过创建与格式化 EFI 分区的步骤。创建 `/` 和 `swap` 分区即可。感觉用命令行分区好难，我就用 U 盘启动 Kubuntu，用里面的分区软件来分区，用 Windows PE 也行。分区完就可以启动 Arch Linux 安装镜像了，先格式化再挂载。

```bash
# 格式化
mkfs.ext4 /dev/nvme0n1p4
mkswp /dev/nvme0n1p5

# 挂载
mount /dev/nvme0n1p4 /mnt # 一定要先挂载 / 再挂载其他
mkdir /mnt/efi
mount /dev/nvme0n1p1 /mnt/efi
swapon /dev/nvme0n1p5
```

## 配置

### 添加 archlinuxcn 源

```
❯ cat /etc/pacman.conf
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

```bash
sudo pacman -Syu archlinuxcn-keyring
```

### 让 pacman 同时下载多个包

```
❯ cat /etc/pacman.conf
ParallelDownloads = 16 # 同时下载 16 个包
```

### 安装软件

Arch Linux [不支持更新部分软件（partial upgrades）](https://wiki.archlinux.org/title/System_maintenance#Partial_upgrades_are_unsupported)，所以我使用 `pacman -Syu package` 命令，先更新所有软件再安装需要的软件。

```bash
# 工具
sudo pacman -Syu trash-cli \
mplayer \
vlc \
flameshot \
spectacle \
obs-studio \
aria2 \
okular \
kdegraphics-mobipocket \
man-db \
gwenview \
os-prober \
pamac-aur \
ufw \
gufw \
ufw-extras \
ntfs-3g \
z \
virtualbox \
virtualbox-guest-iso \
virtualbox-guest-utils \
virtualbox-ext-oracle

yay -Syu dropbox \
google-chrome

# 美化
sudo pacman -Syu tela-icon-theme-git \
tela-circle-icon-theme-git \
grub-theme-whitesur-white-1080p-git

# 编程
sudo pacman -Syu openssh \
nodejs \
npm \
yarn \
webstorm \
webstorm-jre \
rstudio-desktop-git \
android-tools \
tldr \
github-cli \
git

# 学习
sudo pacman -Syu goldendict-qt5-git
yay -Syu anki-release-source


# 安装 ZSH 与插件
sudo pacman -Syu zsh \
oh-my-zsh-git \
zsh-theme-powerlevel10k \
powerline-fonts \
awesome-terminal-fonts \
zsh-syntax-highlighting-git \
zsh-autosuggestions \
zsh-completions-git

# 中文字体
sudo pacman -Syu wqy-bitmapfont \
wqy-microhei \
wqy-microhei-lite \
wqy-zenhei \
adobe-source-han-sans-cn-fonts \
adobe-source-han-serif-cn-fonts \
noto-fonts \
noto-fonts-cjk \
noto-fonts-emoji \
noto-fonts-extra

# 通讯
sudo pacman -Syu telegram-desktop \
thunderbird
yay -Syu wechat-uos \
deepin-wine-tim \
deepin-wine-wechat

# Fcitx5 输入法
sudo pacman -Syu fcitx5-im \
fcitx5-chinese-addons \
fcitx5-material-color \
fcitx5-pinyin-zhwiki

# 办公软件
# WPS
yay -Syu wps-office \
wps-office-mui-zh-cn \
ttf-wps-fonts \
wps-office-fonts
# LibreOffice
sudo pacman -Syu libreoffice-fresh \
libreoffice-fresh-zh-cn
# OnlyOffice
sudo pacman -Syu onlyoffice-bin

# 杀毒
sudo pacman -Syu clamav clamtk
sudo freshclam
sudo systemctl enable clamav-freshclam.service --now
sudo systemctl enable clamav-daemon.service --now
# 杀毒命令
# clamdscan --multiscan --fdpass

# 性能增强
yay -Syu auto-cpufreq
systemctl enable --now auto-cpufreq
sudo pacman -Syu linux-zen linux-zen-headers
```

### 配置 Fcitx5 输入法

```
❯ cat ~/.pam_environment
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=\@im=fcitx
INPUT_METHOD  DEFAULT=fcitx
SDL_IM_MODULE DEFAULT=fcitx
```

```
❯ cat ~/.xprofile
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

Fcitx5 的快捷键是 `Control + Space`，编程软件的补全快捷键也是这个，把 Fcitx5 的快捷键改为 `Super + Space` 以避免冲突。打开 `Fcitx 5 Configuration`，点击 `Configure global options`，把 `Trigger Input Method` 改为 `Super + Space`。

### 配置中文优先级

[`noto-fonts-cjk`](https://archlinux.org/packages/extra/any/noto-fonts-cjk/) 包括中文、日文、韩文字体，安装后有时候中文被错误地显示为日文。把中文字体优先级调到日语前面就可以解决这个问题。

```
❯ cat ~/.fonts.conf
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Sans CJK SC</family>
      <family>Noto Sans CJK TC</family>
      <family>Noto Sans CJK JP</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Sans Mono CJK SC</family>
      <family>Noto Sans Mono CJK TC</family>
      <family>Noto Sans Mono CJK JP</family>
    </prefer>
  </alias>
</fontconfig>
```

```bash
# 刷新字体缓存
fc-cache -fv
```

```bash
fc-match -s | grep 'Noto Sans CJK'
# 如果出现下面内容就代表字体优先级修改成功
# NotoSansCJK-Regular.ttc: "Noto Sans CJK SC" "Regular"
```

### 配置 GRUB

取消 GRUB 的子菜单，并让它记住上次的启动项。这样选择内核的时候更方便。

1.  编辑配置文件
    
    ```bash
    sudo nano /etc/default/grub
    ```
    
2.  把 `GRUB_DEFAULT=0` 改为 `GRUB_DEFAULT=saved`
    
3.  去掉 `GRUB_SAVEDEFAULT=true` 前面的 `#`
    
4.  去掉 `GRUB_DISABLE_SUBMENU=y` 前面的 `#`
    
5.  在 `GRUB_CMDLINE_LINUX_DEFAULT=` 里加入 `nowatchdog`，以空格与其他内容分开，加入该参数可加快开关机速度
    
6.  `Ctrl + O` 保存，`Ctrl + X` 退出
    
7.  更新配置文件
    
    ```bash
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    ```
    

### 配置休眠

1.  查看 swap 分区名称
    
    ```bash
    sudo fdisk -l
    ```
    
    ```
    Disk /dev/nvme0n1: 476.94 GiB, 512110190592 bytes, 1000215216 sectors
    Disk model: WDC PC SN730 SDBPNTY-512G-1027          
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: gpt
    Disk identifier: DF3F41B3-00FB-45D1-8B23-3929872B9524
    
    Device             Start        End   Sectors   Size Type
    /dev/nvme0n1p1      2048     206847    204800   100M EFI System
    /dev/nvme0n1p2    206848     239615     32768    16M Microsoft reserved
    /dev/nvme0n1p3    239616  168011775 167772160    80G Microsoft basic data
    /dev/nvme0n1p4 168011776  938358619 770346844 367.3G Linux filesystem
    /dev/nvme0n1p5 938358784  971902975  33544192    16G Linux swap
    /dev/nvme0n1p6 971902976  972951551   1048576   512M Windows recovery environment
    /dev/nvme0n1p7 972951552  998117375  25165824    12G Windows recovery environment
    /dev/nvme0n1p8 998117376 1000214527   2097152     1G Windows recovery environment
    ```
    
    `/dev/nvme0n1p5` 就是 swap 分区。
    
2.  配置 GRUB
    
    ```bash
    sudo nano /etc/default/grub
    ```
    
    在 `GRUB_CMDLINE_LINUX_DEFAULT` 里加入 `resume=/dev/nvme0n1p5`，以空格与其他内容隔开。修改完就这样
    
    ```
    GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 nowatchdog resume=/dev/nvme0n1p5"
    ```
    
3.  更新 GRUB 配置文件
    
    ```bash
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    ```
    
4.  重启后生效
    
    ```bash
    reboot
    ```
    

### 配置 Git 与 Github CLI

```bash
# 导入 GPG 私钥
gpg --import armor.asc
# 用 GPG 签署 commit
gpg --list-secret-keys --keyid-format LONG
git config --global user.signingkey FRUR8JBULWM31RFB
git config --global commit.gpgsign true
# 设置编辑器为 nano
git config --global core.editor nano
# 显示中文
git config --global core.quotepath false
# 设置名称与邮箱
git config --global user.name "Joe"
git config --global user.email "joe@example.com"
```

### 配置 ZSH 与插件

```bash
# 启用 Oh My Zsh
cp /usr/share/oh-my-zsh/zshrc ~/.zshrc
# 启用 Powerlevel10k 主题
echo 'source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
# 启用 zsh-syntax-highlighting（语法高亮）
echo 'source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc
# 启用 zsh-autosuggestions（自动提示）
echo 'source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc
# 启用 zsh-completions-git（自动补全）
echo 'fpath=(/usr/share/zsh/site-functions $fpath)' >> ~/.zshrc
echo 'autoload -U compinit' >> ~/.zshrc
echo 'compinit -i' >> ~/.zshrc
rm -f ~/.zcompdump; compinit
# 启用 z
echo '[[ -r "/usr/share/z/z.sh" ]] && source /usr/share/z/z.sh' >> ~/.zshrc
# 把默认 Shell 修改为 ZSH
chsh -s /bin/zsh
# 进入 zsh
zsh
# 配置 Powerlevel10k 主题
p10k configure
# 配置 gh 补全（需要先安装 github-cli）
gh completion -s zsh > ~/_gh
sudo mv ~/_gh /usr/share/zsh/site-functions
# 配置 yarn 全局安装包的路径
echo 'export PATH="$PATH:$(yarn global bin)"' >> ~/.zshrc
```

### 防火墙

请看我的这篇教程：[给本地电脑配置 UFW（Uncomplicated Firewall）防火墙](/zh-cn/post/2021/10/09/ufw-for-local-computers/)。

### 迁移 Thunderbird 数据

[Moving Thunderbird Data to a New Computer](https://support.mozilla.org/en-US/kb/moving-thunderbird-data-to-a-new-computer)

先把 `~/.thunderbird` 文件夹从旧电脑放入网盘，在新电脑打开网盘内的 `.thunderbird`，把里面的内容复制到新电脑的 `~/.thunderbird`，如果有重复文件就选择覆盖。

### 修复 Windows 引导

[https://wiki.archlinux.org/title/GRUB#Detecting\_other\_operating_systems](https://wiki.archlinux.org/title/GRUB#Detecting_other_operating_systems)

安装 Arch Linux 的时候，按照[这个教程](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/)把 EFI 分区格式化了，结果 Windows 10 的引导文件也没了，头疼。不过用[优启通 PE](https://www.itsk.com/thread-420052-1-1.html)修复了。修复方法：用 U 盘启动优启通，点击「开始菜单 -> 程序 -> 系统安装 -> NTBootAutoFix（引导修复工具）-> 选择 EFI 盘符 -> 开始修复」。优启通网盘下载的速度特慢，想快点修复引导可以去下载[微 PE 工具箱](https://www.wepe.com.cn/)，这个下载速度还行，里面也有类似的引导修复工具，不过我没测试过。

接下来用 Arch Linux 把 Windows 启动项添加到 GRUB。

```bash
sudo pacman -Syu os-prober
```

加入/取消注释这一行：

```
❯ cat /etc/default/grub
GRUB_DISABLE_OS_PROBER=false
```

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```