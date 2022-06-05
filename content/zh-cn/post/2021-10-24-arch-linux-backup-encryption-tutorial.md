---
title: Arch Linux 备份、加密、还原教程
date: '2021-10-24'
slug: arch-linux-backup-encryption-tutorial
tags:
  - Arch Linux
  - Linux
---

最近想加密笔记本电脑的硬盘，一般硬盘加密都是在安装系统前做的，但是我的笔记本已经装上 Arch Linux 了。我刚好有个闲置的移动硬盘，于是我就想到了办法：

1. 备份系统到移动硬盘
1. 加密笔记本硬盘
1. 还原系统
1. 重装引导程序

## 准备

1. 待加密的电脑
1. 移动硬盘
1. 刷入 Arch Linux 安装镜像的 U 盘（推荐用 Ventoy 刷入镜像）
1. 网络

备份、还原和写入空数据会花费比较多时间，建议准备 1 天的时间慢慢弄，等待的时候就去干点别的事。请谨慎操作，要是你打错命令（比如：格式化分区时搞错了），可能会丢失数据。可以先在虚拟机练习，弄坏也没关系。用于备份的移动硬盘也加密才是真的安全，为了简化文章，我就忽略这部分了。后面写的加密方法一样适用于移动硬盘。本文适用于 UEFI + GPT。

## 扩大 EFI 分区（可略过）

如果你把 EFI 分区挂载到 `/efi`，那么只需要把引导程序安装到 EFI 分区，Linux 内核不在 `/efi`，所以不需要占用很多 EFI 分区的空间。但是加密硬盘需要把 EFI 分区挂载到 `/boot`，Linux 内核也要安装到 EFI 分区，这需要占用更多空间。ArchWiki 建议 EFI 分区至少 260 MiB。我安装了 linux 内核、linux-lts 内核、linux-zen 内核和 GRUB，EFI 分区占用 249.4 MiB。260 MiB 就只能安装 3 个 Linux 内核了。如果有安装多个内核的需求，可以把 EFI 分区调得更大，我自己把 EFI 分区扩大到 3 GiB 了。分区工具可以选择 cfdisk 或 GParted。先缩小 EFI 分区隔壁的分区，再把多出的空间加到 EFI 分区就可以了。

## 备份

启动待备份的 Arch Linux，先查看分区信息，nvme0n1p4 就是需要加密的 `/` 分区。

```bash
> lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0 931.5G  0 disk 
├─sda1        8:1    0   350M  0 part /run/media/hunter/B8CA-E0A9
├─sda2        8:2    0 251.4G  0 part /run/media/hunter/0CB8CBCCB8CBB30E
└─sda3        8:3    0 377.9G  0 part /run/media/hunter/6676d81d-215e-4fcc-a1ff-4e87df4ffe34
mmcblk0     179:0    0 116.5G  0 disk 
├─mmcblk0p1 179:1    0 116.5G  0 part /run/media/hunter/Ventoy
└─mmcblk0p2 179:2    0    32M  0 part 
nvme0n1     259:0    0 238.5G  0 disk 
├─nvme0n1p1 259:1    0   260M  0 part /efi
├─nvme0n1p2 259:2    0    16M  0 part 
├─nvme0n1p3 259:3    0   150G  0 part 
├─nvme0n1p4 259:4    0  79.4G  0 part /
├─nvme0n1p5 259:5    0  1000M  0 part 
└─nvme0n1p7 259:6    0   7.8G  0 part [SWAP]
```

挂载移动硬盘，KDE Plasma 已经帮我自动挂载好了，现在把 `nvme0n1p4` 备份至 `sda3`（`/run/media/hunter/6676d81d-215e-4fcc-a1ff-4e87df4ffe34`）。备份 45G 花了 10 分钟。

```bash
sudo rsync --archive --acls --xattrs --hard-links --sparse --one-file-system --delete --delete-excluded --numeric-ids --progress --info=progress2 \
--exclude={"/var/lib/dhcpcd/*","/swapfile","/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} \
/ /run/media/hunter/6676d81d-215e-4fcc-a1ff-4e87df4ffe34
```

参数含义：

- `--archive --acls --xattrs`：保存软链接与文件属性
- `--hard-links`：保存硬链接
- `--sparse`：备份稀疏文件，例如虚拟磁盘、Docker 镜像
- `--one-file-system`：不要备份挂载点
- `--delete`：多次备份时，删除不存在原系统的文件
- `delete-excluded`：多次备份时，删除被排除的文件
- `--numeric-ids`：用数字表示用户组和用户，而不是用名称表示，避免在跨系统使用时出差错
- `--progress`：显示备份文件与进度
- `--info=progress2`：显示总备份进度
- `--exclude={...}`：排除不需要备份的文件

## 加密

备份好就关机，启动 U 盘的 Arch Linux 安装镜像，选择「Copy to RAM」。启动后拔下 U 盘，插入移动硬盘。以下命令可以调大字体、调高亮度：

```bash
# 调大字体
setfont ter-132n
# 调高亮度（把 * 改为实际的目录）
echo 200 > /sys/class/backlight/*/brightness
```

现在开始加密。

```bash
# 写入随机数据，防止原有数据被恢复
# 79.4G 的固态硬盘，时间 5 分 08 秒
cryptsetup open --type plain --key-file /dev/urandom /dev/nvme0n1p4 to_be_wiped
dd if=/dev/zero of=/dev/mapper/to_be_wiped bs=1M status=progress

# 检查写入数据大小，单位是 Byte
blockdev --getsize64 /dev/mapper/to_be_wiped
85298511872 # 85298511872/1024/1024/1024 = 79.44G

# 关闭临时容器
cryptsetup close to_be_wiped

# 加密分区
cryptsetup --verify-passphrase --verbose luksFormat /dev/nvme0n1p4
cryptsetup open /dev/nvme0n1p4 cryptroot
mkfs.ext4 /dev/mapper/cryptroot
```

## 还原

还原还是用一样的 rsync 命令，就是把路径反过来写就行了，先写 sdb3 的挂载点，再写加密分区的挂载点。因为备份的时候排除了不需要的文件，所以不需要 `--delete-excluded` 和 `--exclude={...}` 参数。用安装镜像不能方便地复制粘贴命令，我用了简写的命令。

```bash
# 挂载加密分区
mkdir /mnt/cryptroot
mount /dev/mapper/cryptroot /mnt/cryptroot

# 挂载移动硬盘
mkdir /mnt/disk
mount /dev/sdb3 /mnt/disk

# 还原系统（注意路径最后的斜杠）
# 耗时 15 分钟
rsync -aAXHSx --delete --numeric-ids --progress --info=progress2 \
/mnt/disk/ /mnt/cryptroot/

# 重新挂载
# EFI 分区必须挂载到 /boot，不然开机时无法使用内核
umount /mnt/cryptroot
umount /mnt/disk
rm -r /mnt/cryptroot
rm -r /mnt/disk
mount /dev/mapper/cryptroot /mnt
mount /dev/nvme0n1p1 /mnt/boot

# 创建 swap 文件，大小为 1M*8192（8G）
dd if=/dev/zero of=/mnt/swapfile bs=1M count=8192 status=progress
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile

# 重新生成 fstab（file systems table）
genfstab -U /mnt > /mnt/etc/fstab
# 将根目录 / 改为 /mnt
arch-chroot /mnt
```

编辑 `/etc/mkinitcpio.conf`，在 `HOOKS` 这一行加入

- `encrypt`（`udev` 之后）
- `keyboard`（`autodetect` 之前）
- `keymap`（`encrypt` 之前，如果使用美国键盘布局，可忽略此选项）
- `resume`（`udev` 之后）

完整的内容：

```
HOOKS=(base udev keyboard autodetect keymap modconf block encrypt filesystems resume fsck)
```

```bash
# 连接无线网络
# 用网线插上就能用了，可以忽略这部分
rfkill list                     # 检查无线设备状态
rfkill unblock wifi             # 如果 WIFI 被禁用就启用 WIFI
iwctl                           # 进入交互式命令行
device list                     # 列出设备名
station wlan0 scan              # 扫描网络
station wlan0 get-networks      # 列出网络
station wlan0 connect abcd-wifi # 连接 abcd-wifi
exit                            # 推出 iwd

# 重装内核与 microcode
# 用 Intel 处理器就安装 intel-ucode
# 用 AMD 处理器就安装 amd-ucode
# 可能不需要 linux-firmware
pacman -Syu linux linux-firmware linux-zen amd-ucode

# 重新生成 initramfs
mkinitcpio -P
```

```bash
# 获取 swap_file_offset
filefrag -v /swapfile
```

记下第 1 横行数字的第 4 个数字，`18055168`。用下面这个好长的命令可以直接获取这个数字。

```bash
filefrag -v /swapfile | awk '$1=="0:" {print substr($4, 1, length($4)-2)}'
```

```bash
# 将 swap_file_offset 插入到 GRUB 配置文件
echo "18055168" >> /etc/default/grub
# 将 nvme0n1p4 的 UUID 插入到 GRUB 配置文件
blkid -s UUID -o value /dev/nvme0n1p4 >> /etc/default/grub
```

编辑 `/etc/default/grub`，加入

```
GRUB_CMDLINE_LINUX="cryptdevice=UUID=uuid-value:cryptroot root=/dev/mapper/cryptroot"
GRUB_CMDLINE_LINUX_DEFAULT="resume=/dev/mapper/cryptroot resume_offset=swap_file_offset"
```

请将 `uuid-value` 替换为倒数第 1 行的内容，`swap_file_offset` 替换为倒数第 2 行的内容，删去最后两行。如果你使用了 GRUB 主题并且主题不在 `/boot`，那就在 `GRUB_THEME` 前加上 `#`，硬盘没解密读取不了主题文件。

```bash
# 重装 GRUB
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

按下 `Ctrl + D` 退出 `chroot`，并执行 `reboot` 重启。

## 技巧

备份、加密和还原完成了，下面是加密后的使用技巧。

### 调整加密分区大小

之前创建了交换分区（swap partition），现在打算改用交换文件(swap file)，所以要把删掉交换分区，把多出的空间加到加密分区。本来打算用 cfdisk 扩展加密分区，但是没成功，于是就用带 GUI 的 endeavouros 了。

1.  打开 GParted
1.  右击 /dev/nvme0n1p7 -> Delete
1.  右击 /dev/nvme0n1p4 -> Open Encryption -> 输入密码解锁
1.  右击 /dev/nvme0n1p4 -> Resize/Move -> 把 Maximum size 填入 New Size -> 按下 Enter -> Resize
1.  点击 Edit -> Apply All Operations -> Apply

### 使用 GRUB 主题的方法

```bash
# 复制到 /boot
sudo cp -r /usr/share/grub/themes/whitesur-white-1080p /boot/grub/themes
# 修改配置文件
echo 'GRUB_THEME="/boot/grub/themes/whitesur-white-1080p/theme.txt"' | sudo tee --append /etc/default/grub
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## 感想

经历了这次加密我才知道可以把整个 Arch Linux 备份下来，那么以后换电脑的时候就不用从头安装系统了。虽然安装 Arch Linux 不是很难（装两三次就熟练了)，但是配置还是很花时间，通过备份还原就再也不用全新安装 Arch Linux了，真爽！还原后只需要根据新电脑的硬件做些调整（更换 microcode、显卡驱动等）就行了。定时备份系统到移动硬盘也挺好的，电脑遗失了，买了新的也能很快还原之前的系统。

## 缘起

之前用 Windows 的时候，加密硬盘很简单，用 BitLocker 也就是点几个按键就行了。Linux 似乎没有类似的简单易用的工具，所以我用 linux 之后没加密过硬盘。带笔记本出门的时候总担心被偷，然后别人盗取笔记本里面的数据来假扮我……

电脑遗失是小事，资料被偷是大事。不过想偷我的资料也不是那么容易。我设置了 UEFI 密码，不知道这个密码就没办法启动 U 盘的系统，也就不能读取硬盘了。要么就把笔记本的硬盘拆下来，放到其他的电脑读取，要么重置 UEFI 密码。小偷有这些时间精力不如直接把笔记本卖了。

所以说要偷到我电脑的资料的人一定要有坏心肠、懂电脑软硬件、不怕违法犯罪。我也就是个普通人，花那么大劲偷我的笔记本资料，可谓是吃力不讨好。要偷资料也是偷大人物的嘛。所以我笔记本资料被偷的可能性应该超低吧。

虽然我说服过自己了，但每次带笔记本出门就特焦虑，一开始想象从笔记本被偷，然后马上快进到小偷拿到了我的 SSH 和 GPG 私钥……那我还是加密硬盘吧， ~~万一我以后成了大人物呢？~~ 这样既安全又能缓解焦虑。

## 参考资料

这参考资料也就比我的毕业论文少 1 个 :)

1. [rsync - Full system backup - ArchWiki](https://wiki.archlinux.org/title/Rsync#Full_system_backup)
1. [dm-crypt/Encrypting an entire system - LUKS on a partition- ArchWiki](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system#LUKS_on_a_partition)
1. [filesystems - Extend a LUKS encrypted partition to fill disk - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/320957/extend-a-luks-encrypted-partition-to-fill-disk)
1. [dm-crypt/Drive preparation - dm-crypt specific methods - ArchWiki](https://wiki.archlinux.org/title/Dm-crypt/Drive_preparation#dm-crypt_specific_methods)
1. [Migrate installation to new hardware - Top to bottom - ArchWiki](https://wiki.archlinux.org/title/Migrate_installation_to_new_hardware#Top_to_bottom)
1. [Installation guide - ArchWiki](https://wiki.archlinux.org/title/Installation_guide)
1. https://medium.com/hacker-toolbelt/arch-install-with-full-disk-encryption-6192e9635281
1. [Arch install with full disk encryption | by Miguel Sampaio da Veiga | Hacker Toolbelt | Medium](https://blog.bespinian.io/posts/installing-arch-linux-on-uefi-with-full-disk-encryption/)
1. [Swap - Swap file- ArchWiki](https://wiki.archlinux.org/title/Swap#Swap_file)
1. [Arch Linux: 12.2020 ISO Install With Encryption & i3 - YouTube](https://youtu.be/SFzN6e7USGk)
1. [rsync+btrfs+dm-crypt 备份整个系统 - 依云's Blog](https://blog.lilydjwg.me/2013/12/29/rsync-btrfs-dm-crypt-full-backup.42219.html)
1. [Arch Linux 安装使用教程 - ArchTutorial - Arch Linux Studio](https://archlinuxstudio.github.io/ArchLinuxTutorial/)