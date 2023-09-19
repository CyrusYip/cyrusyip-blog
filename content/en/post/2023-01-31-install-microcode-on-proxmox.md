---
title: How to Install the Latest Microcode on Proxmox VE (Debian stable)
date: '2023-01-31'
slug: install-microcode-on-proxmox
tags:
  - Proxmox Virtual Environment
  - homelab
  - Debian
---

In this tutorial, I will help you install latest microcode in a upgradable way so that you can upgrade the microcode via `apt` command. Please don't install packages except microcode packages from the unstable repository to [avoid a broken system](https://wiki.debian.org/DontBreakDebian#Don.27t_make_a_FrankenDebian). This tutorial was tested on Proxmox VE 7.4 / 8.0.2 .

<!--
pve-manager/7.4-3/9002ab8a (running kernel: 6.2.11-1-pve)

[I] root@pve ~ [255]# pveversion -v
proxmox-ve: 8.0.2 (running kernel: 6.2.16-12-pve)
pve-manager: 8.0.4 (running version: 8.0.4/d258a813cfa6b390)
-->

## Installation

Microcode is the firmware used to fix bugs in the CPU. [It should be installed only on the host instead of virtual machines](https://unix.stackexchange.com/q/572754/447708) because microcode updates are applied during boot. We need to install it from the Debian unstable repository because microcode packages in Proxmox (Debian stable) may be out of date.

Add the unstable repository with only `non-free-firmware` component.

```
echo "deb http://deb.debian.org/debian/ unstable non-free-firmware" > /etc/apt/sources.list.d/debian-unstable.list
```

To avoid installing other packages from the unstable repository, add this to `/etc/apt/preferences.d/unstable-repo`.

```
# lower the priority of all packages in the unstable repository
Package: *
Pin: release o=Debian,a=unstable
Pin-Priority: 10

# allow upgrading microcode from the unstable repository
Package: intel-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
# here should be a blank line or comment
Package: amd64-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
```

Update all repositories and make sure no package will upgrade from the unstable repository.

```
apt update && apt list --upgradable
```

Install one of the microcode packages according to your CPU manufacturer.

```
# Intel CPU
apt install intel-microcode
# AMD CPU
apt install amd64-microcode
```

Reboot the Proxmox host.

```
reboot
```

Check microcode.

```
journalctl -k --grep="microcode updated early to"
```

You should see similar output like this.

```
Feb 12 01:56:47 pve kernel: microcode: microcode updated early to revision 0x24000023, date = 2022-02-19
```

> Note: The date displayed does not correspond to the version of the [intel-microcode] package installed. It does show the last time Intel updated the microcode that corresponds to the specific hardware being updated.
>
> —[Microcode - ArchWiki](https://wiki.archlinux.org/title/Microcode#Verifying_that_microcode_got_updated_on_boot)

## Alternative installation

If you don't want to add the unstable repository, you can download the microcode packages from Debian website.

- [amd64-microcode](https://packages.debian.org/sid/amd64/amd64-microcode/download)
- [intel-microcode](https://packages.debian.org/sid/amd64/intel-microcode/download)

Install one of the microcode packages according to your CPU manufacturer. Don't copy these commands verbatim and use the latest link instead.

```
# AMD CPU
wget 'http://ftp.us.debian.org/debian/pool/non-free-firmware/a/amd64-microcode/amd64-microcode_3.20230808.1.1_amd64.deb/DontCopyThisLinkVerbatim'
apt install ./amd64-microcode_3.20230808.1.1_amd64.deb

# Intel CPU
wget 'http://ftp.us.debian.org/debian/pool/non-free-firmware/i/intel-microcode/intel-microcode_3.20230808.1_amd64.deb/DontCopyThisLinkVerbatim'
apt install ./intel-microcode_3.20230808.1_amd64.deb
```



## Uninstallation

If you want to remove microcode and the unstable repository, run:

```
# remove microcode
apt purge amd64-microcode intel-microcode
apt autoremove
# make sure there is no installed package from the unstable repository
apt list --installed | grep '/unstable'
# remove unstable repository and config
rm /etc/apt/sources.list.d/debian-unstable.list /etc/apt/preferences.d/unstable-repo
# reboot
reboot
# check microcode, you should see "No entries"
journalctl -k --grep="microcode updated early to"
```

## Motivation

I installed Proxmox VE on a Beelink EQ59[^eq59] N5105. I was satisfied at first, but some virtual machines froze from time to time, which bothered me very much. [I found many N5105 CPU users had the same problem](https://forum.proxmox.com/threads/vm-freezes-irregularly.111494/). One of the solutions is installing microcode, so I decided to install latest microcode on EQ59. Though it doesn't completely fix the problem, it really reduce freezing a lot.

[^eq59]: Beelink EQ59 N5105 (零刻 EQ59 N5105) is China version of Beelink U59 N5105.

## Further reading

- [Microcode - Debian Wiki](https://wiki.debian.org/Microcode)
- [Do I need CPU (or any) microcode in a QEMU/KVM virtual machine? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/572757/447708)
- [apt - How to install some packages from "unstable" Debian on a computer running "stable" Debian? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/8051/447708)
- [AptConfiguration - Debian Wiki](https://wiki.debian.org/AptConfiguration)
- [DontBreakDebian - Debian Wiki](https://wiki.debian.org/DontBreakDebian)
