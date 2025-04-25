---
title: 解锁 Redmi K40S（HyperOS 1.0）的 bootloader
date: 2025-03-13T00:00:00+08:00
slug: unlock-redmi-k40s-hyperos1
tags:
  - android
  - hyperos
  - redmi
lastmod: 2025-04-25T11:46:14+08:00
---

<!-- 写英文版？ -->

从 HyperOS 开始，[解锁 bootloader（引导程序）的难度大大增加](/zh-cn/posts/2024/12/08/xiaomi-no-longer-for-fans/)，不过还是有办法绕过限制。建议想解锁的读者先暂停系统更新和应用更新，以免升级后无法绕过限制。

这台 Redmi K40S 的系统版本是 HyperOS 1.0.8.0.ULMCNXM。以下是解锁方法：

1. 插入手机卡。
1. 下载[设置应用](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass/releases/download/1.0-fix/Settings_Redmi_marble_V816.0.5.0.UMRINXM.zip)，解压后传到手机安装，成功。
1. 根据电脑系统下载 [HyperSploit](https://github.com/TheAirBlow/HyperSploit/releases) 并运行，根据提示操作。
1. 这台手机显示验证失败，电脑显示 `Error 401: Xiaomi account credentials expired, login again`。
1. 退出账号，登录账号。再次运行 HyperSploit，这次电脑显示绑定成功了。运行[小米官方解锁工具](https://en.miui.com/unlock/download_en.html)（[备用版](https://miuirom.xiaomi.com/rom/u1106245679/7.6.727.43/miflash_unlock_en_7.6.727.43.zip)），提示等待 168 小时。
1. 手机卡就留在这里了[^le]。
1. 打开应用商店，关闭自动升级。打开系统更新，关闭自动下载和夜间安装。让手机一直开机。
1. 等够 7 天后再次运行小米官方解锁工具，成功啦！

[^le]: 我不确定是否要一直插卡，只是感觉这样比较稳妥。

---

重启完居然显示有账号锁，需要联网后验证小米账号密码。我的手机卡设置了密码，系统它又不让我输入手机卡密码（这太傻了吧！），这样无法用手机卡的网络。只好连接 WIFI 了，输入密码后进入系统，再退出小米账号。最后装上了我最喜欢的 [LineageOS 系统](https://wiki.lineageos.org/devices/munch/)。


<!--
## 安装固件记录

安装完后装 LineageOS 没问题，后续还更新了两次。

```
❯ fastboot flash abl_ab abl.img
fastboot flash aop_ab aop.img
fastboot flash bluetooth_ab bluetooth.img
fastboot flash cmnlib_ab cmnlib.img
fastboot flash cmnlib64_ab cmnlib64.img
fastboot flash devcfg_ab devcfg.img
fastboot flash dsp_ab dsp.img
fastboot flash featenabler_ab featenabler.img
fastboot flash hyp_ab hyp.img
fastboot flash imagefv_ab imagefv.img
fastboot flash keymaster_ab keymaster.img
fastboot flash modem_ab modem.img
fastboot flash qupfw_ab qupfw.img
fastboot flash tz_ab tz.img
fastboot flash uefisecapp_ab uefisecapp.img
fastboot flash xbl_ab xbl.img
fastboot flash xbl_config_ab xbl_config.img

Warning: skip copying abl_ab image avb footer (abl_ab partition size: 0, abl_ab image size: 208896).
Sending 'abl_ab' (204 KB)                          OKAY [  0.016s]
Writing 'abl_ab'                                   (bootloader) Partition abl_a flashed successfully
(bootloader) Partition abl_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.044s
Warning: skip copying aop_ab image avb footer (aop_ab partition size: 0, aop_ab image size: 204800).
Sending 'aop_ab' (200 KB)                          OKAY [  0.006s]
Writing 'aop_ab'                                   (bootloader) Partition aop_a flashed successfully
(bootloader) Partition aop_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.034s
Warning: skip copying bluetooth_ab image avb footer (bluetooth_ab partition size: 0, bluetooth_ab image size: 438272).
Sending 'bluetooth_ab' (428 KB)                    OKAY [  0.014s]
Writing 'bluetooth_ab'                             (bootloader) Partition bluetooth_a flashed successfully
(bootloader) Partition bluetooth_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.044s
Warning: skip copying cmnlib_ab image avb footer (cmnlib_ab partition size: 0, cmnlib_ab image size: 401408).
Sending 'cmnlib_ab' (392 KB)                       OKAY [  0.013s]
Writing 'cmnlib_ab'                                (bootloader) Partition cmnlib_a flashed successfully
(bootloader) Partition cmnlib_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.042s
Warning: skip copying cmnlib64_ab image avb footer (cmnlib64_ab partition size: 0, cmnlib64_ab image size: 520192).
Sending 'cmnlib64_ab' (508 KB)                     OKAY [  0.021s]
Writing 'cmnlib64_ab'                              (bootloader) Partition cmnlib64_a flashed successfully
(bootloader) Partition cmnlib64_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.051s
Warning: skip copying devcfg_ab image avb footer (devcfg_ab partition size: 0, devcfg_ab image size: 57344).
Sending 'devcfg_ab' (56 KB)                        OKAY [  0.004s]
Writing 'devcfg_ab'                                (bootloader) Partition devcfg_a flashed successfully
(bootloader) Partition devcfg_b flashed successfully
OKAY [  0.002s]
Finished. Total time: 0.032s
Warning: skip copying dsp_ab image avb footer (dsp_ab partition size: 0, dsp_ab image size: 67108864).
Sending 'dsp_ab' (65536 KB)                        OKAY [  1.586s]
Writing 'dsp_ab'                                   (bootloader) Partition dsp_a flashed successfully
(bootloader) Partition dsp_b flashed successfully
OKAY [  0.181s]
Finished. Total time: 1.792s
Warning: skip copying featenabler_ab image avb footer (featenabler_ab partition size: 0, featenabler_ab image size: 90112).
Sending 'featenabler_ab' (88 KB)                   OKAY [  0.005s]
Writing 'featenabler_ab'                           (bootloader) Partition featenabler_a flashed successfully
(bootloader) Partition featenabler_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.035s
Warning: skip copying hyp_ab image avb footer (hyp_ab partition size: 0, hyp_ab image size: 450560).
Sending 'hyp_ab' (440 KB)                          OKAY [  0.015s]
Writing 'hyp_ab'                                   (bootloader) Partition hyp_a flashed successfully
(bootloader) Partition hyp_b flashed successfully
OKAY [  0.005s]
Finished. Total time: 0.045s
Warning: skip copying imagefv_ab image avb footer (imagefv_ab partition size: 0, imagefv_ab image size: 2097152).
Sending 'imagefv_ab' (2048 KB)                     OKAY [  0.068s]
Writing 'imagefv_ab'                               (bootloader) Partition imagefv_a flashed successfully
(bootloader) Partition imagefv_b flashed successfully
OKAY [  0.010s]
Finished. Total time: 0.104s
Warning: skip copying keymaster_ab image avb footer (keymaster_ab partition size: 0, keymaster_ab image size: 282624).
Sending 'keymaster_ab' (276 KB)                    OKAY [  0.016s]
Writing 'keymaster_ab'                             (bootloader) Partition keymaster_a flashed successfully
(bootloader) Partition keymaster_b flashed successfully
OKAY [  0.004s]
Finished. Total time: 0.047s
Warning: skip copying modem_ab image avb footer (modem_ab partition size: 0, modem_ab image size: 282521600).
Sending 'modem_ab' (275900 KB)                     OKAY [  6.749s]
Writing 'modem_ab'                                 (bootloader) Partition modem_a flashed successfully
(bootloader) Partition modem_b flashed successfully
OKAY [  0.757s]
Finished. Total time: 7.531s
Warning: skip copying qupfw_ab image avb footer (qupfw_ab partition size: 0, qupfw_ab image size: 57344).
Sending 'qupfw_ab' (56 KB)                         OKAY [  0.010s]
Writing 'qupfw_ab'                                 (bootloader) Partition qupfw_a flashed successfully
(bootloader) Partition qupfw_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.038s
Warning: skip copying tz_ab image avb footer (tz_ab partition size: 0, tz_ab image size: 3194880).
Sending 'tz_ab' (3120 KB)                          OKAY [  0.087s]
Writing 'tz_ab'                                    (bootloader) Partition tz_a flashed successfully
(bootloader) Partition tz_b flashed successfully
OKAY [  0.012s]
Finished. Total time: 0.123s
Warning: skip copying uefisecapp_ab image avb footer (uefisecapp_ab partition size: 0, uefisecapp_ab image size: 126976).
Sending 'uefisecapp_ab' (124 KB)                   OKAY [  0.014s]
Writing 'uefisecapp_ab'                            (bootloader) Partition uefisecapp_a flashed successfully
(bootloader) Partition uefisecapp_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.045s
Warning: skip copying xbl_ab image avb footer (xbl_ab partition size: 0, xbl_ab image size: 3563520).
Sending 'xbl_ab' (3480 KB)                         OKAY [  0.091s]
Writing 'xbl_ab'                                   (bootloader) Partition xbl_a flashed successfully
(bootloader) Partition xbl_b flashed successfully
OKAY [  0.021s]
Finished. Total time: 0.138s
Warning: skip copying xbl_config_ab image avb footer (xbl_config_ab partition size: 0, xbl_config_ab image size: 86016).
Sending 'xbl_config_ab' (84 KB)                    OKAY [  0.004s]
Writing 'xbl_config_ab'                            (bootloader) Partition xbl_config_a flashed successfully
(bootloader) Partition xbl_config_b flashed successfully
OKAY [  0.003s]
Finished. Total time: 0.034s
```
-->