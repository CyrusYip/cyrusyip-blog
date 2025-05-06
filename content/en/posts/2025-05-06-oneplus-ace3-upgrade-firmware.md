---
title: Upgrade Firmware for OnePlus Ace 3
date: 2025-05-06T00:00:00+08:00
slug: oneplus-ace3-upgrade-firmware
tags:
  - android
  - oneplus
  - oneplus-ace-3
  - pixelos
lastmod: 2025-05-06T00:00:00+08:00
translationKey: oneplus-ace3-upgrade-firmware
---

My OnePlus Ace 3 runs on PixelOS, which doesn't include the firmware, so I need to upgrade the firmware by myself.

Firmware is installed via fastboot and fastbootd, so we need to test them:

1. Connect the phone to the computer
1. Press the volume-down button and power button to enter fastboot
1. Run `fastboot devices`, and make sure the phone is in fastboot
1. Run `fastboot reboot fastboot` to enter fastbootd
1. Run `fastboot devices`, and make sure the phone is in fastbootd

My phone runs on PixelOS_aston-15.0-20250424 with PJE110_15.0.0.500 firmware, and I want to upgrade the firmware to PJE110_15.0.0.701.

Installation steps:

1. Press the volume-down button and power button to enter fastboot.
1. Download the firmware from [this link](https://github.com/inferno0230/op12r-fw-repo/releases). I will download [PJE110_15.0.0.701](https://github.com/inferno0230/op12r-fw-repo/releases/tag/PJE110_15.0.0.701(CN01))。Extract the file.
1. Run `install_images.sh` on Linux/macOS, `install_images.bat` on Windows.