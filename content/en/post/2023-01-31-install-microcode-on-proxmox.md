---
title: How to Install the Latest Microcode on Proxmox VE (Debian stable)
date: '2023-01-31'
slug: install-microcode-on-proxmox
tags:
  - Proxmox Virtual Environment
  - homelab
  - Debian
---

Microcode is the firmware used to fix bugs in the CPU. [It should be installed only on the host instead of virtual machines](https://unix.stackexchange.com/q/572754/447708) because microcode updates are applied during boot. We need to install it from the Debian unstable repository because microcode packages in Proxmox (Debian stable) are out of date.

Add the unstable repo.

```
echo "deb http://deb.debian.org/debian/ unstable main contrib non-free" > /etc/apt/sources.list.d/debian-unstable.list
```

Add this to `/etc/apt/preferences.d/unstable-repo`.

```
# lower the priority
Package: *
Pin: release o=Debian,a=unstable
Pin-Priority: 10

# allow upgrading microcode
Package: intel-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
Package: amd64-microcode
Pin: release o=Debian,a=unstable
Pin-Priority: 500
```

Update all repos and make sure no package will upgrade from the unstable repo.

```
apt update && apt list --upgradable
```

Install one of the microcode packages according to your CPU manufacturer. Don't install both.

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

If you want to remove microcode and unstable repo, run:

```
# remove microcode
apt remove amd64-microcode intel-microcode
apt autoremove
# remove unstable repo and config
rm /etc/apt/sources.list.d/debian-unstable.list /etc/apt/preferences.d/unstable-repo
# reboot
reboot
# check microcode, you should see "No entries"
journalctl -k --grep="microcode updated early to"
```

Further reading:

- [Microcode - Debian Wiki](https://wiki.debian.org/Microcode)
- [Do I need CPU (or any) microcode in a QEMU/KVM virtual machine? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/572757/447708)
- [apt - How to install some packages from "unstable" Debian on a computer running "stable" Debian? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/8051/447708)
- [AptConfiguration - Debian Wiki](https://wiki.debian.org/AptConfiguration)
