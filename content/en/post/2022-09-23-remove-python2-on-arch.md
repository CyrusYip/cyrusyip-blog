---
title: Removing Python 2 on Arch Linux
date: '2022-09-23'
slug: remove-python2-on-arch
tags:
  - Arch Linux
---

[Python 2 was dropped from Arch Linux](https://archlinux.org/news/removing-python2-from-the-repositories/). It was lucky that there were only two python2 packages on my Arch.

```
❯ pacman -Qs python2
local/python2 2.7.18-5
    A high-level scripting language
local/python2-setuptools 2:44.1.1-2
    Easily download, build, install, upgrade, and uninstall Python packages
```

I removed them without hesitation.

```
❯ sudo pacman -Rscn python2 python2-setuptools
checking dependencies...

Package (2)         Old Version  Net Change

python2             2.7.18-5     -76.84 MiB
python2-setuptools  2:44.1.1-2    -3.81 MiB

Total Removed Size:  80.65 MiB

:: Do you want to remove these packages? [Y/n] 
:: Processing package changes...
(1/2) removing python2-setuptools
(2/2) removing python2
:: Running post-transaction hooks...
(1/2) Arming ConditionNeedsUpdate...
(2/2) Refreshing PackageKit...
```
