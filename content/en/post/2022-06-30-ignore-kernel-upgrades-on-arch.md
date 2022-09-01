---
title: How to Ignore Kernel Upgrades on Arch Linux
date: '2022-06-30'
slug: ignore-kernel-upgrades-on-arch
tags:
  - Arch Linux
  - pacman
---

Warning: Ignoring kernel upgrades makes the system more vulnerable due to the lack of the latest security fixes.

## Ignore Temporarily

Pacman's `--ignore` option is used to ignore package upgrades. You can ignore multiple packages, separated by commas. This command upgrades the system but ignores three kernels.

```
sudo pacman -Syu --ignore linux,linux-header,linux-lts,linux-lts-headers,linux-zen,linux-zen-headers
```

## Ignore Permanently

Typing `--ignore packages` takes some time[^time]. Sometimes, you might forget to type it. You can permanently ignore kernel upgrades by adding this to `/etc/pacman.conf` in the `[options]` section.

[^time]: If you use fish or zsh-autosuggestions, that should not be a problem.

```
IgnorePkg = linux linux-headers linux-lts linux-lts-headers linux-zen linux-zen-headers
```

Note that packages in `IgnorePkg` are separated by spaces. If you want to upgrade kernels after configuring `IgnorePkg`, install them explicitly:
 
```bash
sudo pacman -Syu --needed linux linux-headers linux-lts linux-lts-headers linux-zen linux-zen-headers
# or use brace expansion
sudo pacman -Syu --needed linux{,-lts,-zen}{,-headers}
```

## About Partial Upgrades

[Partial upgrades are unsupported on Arch Linux](https://wiki.archlinux.org/title/System_maintenance#Partial_upgrades_are_unsupported). That means if you install or upgrade some package(s) without upgrading other packages, the system might break. For example, these commands might break the system.

```
pacman -Sy; pacman -S package
pacman -Sy package
```

I think ignoring kernel upgrades does not break the system because Linux software works with different versions of the kernel. Sometimes, I ignore kernel upgrades for a week and have no problems at all.

## Why I Ignore Kernel Upgrades

```
❯ head -n 1 /var/log/pacman.log
[2021-09-30T11:37:30+0000] [PACMAN] Running 'pacman -r /mnt -Sy --cachedir=/mnt/var/cache/pacman/pkg --noconfirm base base-devel linux linux-firmware dhcpcd iwd vim nano sudo bash-completion'
```

I have been using Arch Linux since September 30, 2021. I am a happy user most of the time. I love its update-to-date packages. The only thing annoying me is kernel upgrades. I installed three Linux kernels (stable, longterm, and zen kernel). I usually use zen kernel. It is updated frequently, about every 3 days. Upgrading the current kernel without rebooting breaks some functionalities such as USB and virtualization[^virtualization]. Rebooting interrupts my work because I have to close the software and open it after rebooting. Upgrading the kernel is also much slower than upgrading other packages[^packages]. Thus, I dislike upgrading kernels. I would like to do it when I am free.

[^virtualization]: This problem is caused by missing kernel modules and can be solved by [kernel-modules-hook](https://archlinux.org/packages/community/any/kernel-modules-hook/).

[^packages]: Upgrade time can be reduced by uninstalling extra Dynamic Kernel Module Support (DKMS) modules and kernels. It also saves time installing packages by `pacman -S <package>` instead of `pacman -Syu <package>`.

## Acknowledgment

I shared this post on [Arch Linux subreddit](https://www.reddit.com/r/archlinux/comments/x19ebv/how_to_ignore_kernel_upgrades_on_arch_linux/). People corrected my wrong opinions. I learned a lot from the comments. Thank you.

## References

[pacman - Skip package from being upgraded - ArchWiki](https://wiki.archlinux.org/title/Pacman#Skip_package_from_being_upgraded)
