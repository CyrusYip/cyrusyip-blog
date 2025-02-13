---
title: Upgrade OnePlus Ace 3 from PixelOS 14 to PixelOS 15
date: 2025-02-13T00:00:00+08:00
slug: oneplus-ace3-from-pixelos14-to-pixelos15
tags:
  - android
  - oneplus
  - oneplus-ace-3
  - pixelos
lastmod: 2025-02-13T23:16:29+08:00
translationKey: oneplus-ace3-from-pixelos14-to-pixelos15
---

## Required files

- [PJE110domestic_11_14.0.0.317CN01_2024012904340000.zip](https://droidwin.com/download-oneplus-12r-ace-3-edl-unbrick-firmware-rom/) (Click All Packages: DOWNLOAD. Log in a Google account if you can't download.)
- [ColorOS PJE110_15.0.0.500(CN01) C.32 全量包](https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%20ACE%203/ColorOS%20PJE110_15.0.0.500(CN01)%20C.32/) (Copy the link of 官方链接 and use aria2 or Aria2App to download the file.)
- `1.3.zip` and `prog_firehose_ddr.zip` (Download files from [How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/).)

## Steps

1. Backup apps and data using [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup) (root required, optional step).
1. Follow [How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/) to flash `PJE110domestic_11_14.0.0.317CN01_2024012904340000.zip`.
1. Flash `ColorOS PJE110_15.0.0.500` using local install on ColorOS 14 (flash ColorOS 15 the first time). Try [General - General Local install issues on system updater and how to fix it | XDA Forums](https://xdaforums.com/t/general-local-install-issues-on-system-updater-and-how-to-fix-it.4714365/) if local install is gray in the system updater.
1. Flash `ColorOS PJE110_15.0.0.500` using local install on ColorOS 15 (flash ColorOS 15 the second time).
1. Flash [PixelOS 15](https://pixelos.net/download/aston) following the instructions on the website.
1. Restore data using DataBackup (optional step).

---

This post was shared on [XDA forum](https://xdaforums.com/t/upgrade-oneplus-ace-3-from-pixelos-14-to-pixelos-15.4718511/).