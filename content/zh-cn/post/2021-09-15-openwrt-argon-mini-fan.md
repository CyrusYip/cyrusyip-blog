---
title: 在 OpenWrt 控制树莓派 Argon Mini Fan
date: '2021-09-15'
slug: openwrt-argon-mini-fan
tags:
  - Raspberry Pi 4B
  - OpenWrt
---

本文配套文章：[树莓派 4B 超频教程](/zh-cn/post/2021/09/20/raspberry-pi4-overclock/)

本文测试于 [SuLingGG/OpenWrt-Mini](https://github.com/SuLingGG/OpenWrt-Mini) 固件，系统版本：`ImmortalWrt 18.06-SNAPSHOT r0-b0fa0c9 / LuCI openwrt-18.06-k5.4 branch (git-21.247.81448-3061bdd)`。

## 配置

1. 把风扇的档位调至 PWM

2. 连接 OpenWrt

    ```bash
    # 请使用你树莓派的 IP，不要照抄我的
    ssh root@192.168.1.1
    ```

3. 备份配置文件

    ```bash
    cp /boot/config.txt /boot/config.txt.bak
    ```

4. 编辑配置文件 `/boot/config.txt`

    ```bash
    nano /boot/config.txt
    ```

    在底部添加以下内容，树莓派超过 60°C 时风扇就转

    ```
    dtoverlay=gpio-fan,gpiopin=18,temp=60000 # 单位是 1/1000°C
    ```

    按下 `Ctrl + O` 保存，`Ctrl + X` 退出

5. 安装插件

    ```bash
    opkg update
    opkg install kmod-hwmon-core kmod-hwmon-gpiofan kmod-i2c-core
    ```

6. 重启

    ```bash
    reboot
    ```

7. 如果要修改温度就改动 `/boot/config.txt` 再重启

    ```bash
    nano /boot/config.txt
    reboot
    ```

## 测试

1. 安装压力测试软件 stress-ng 

    ```
    opkg update
    opkg install stress-ng procps-ng-watch
    ```

1. 对 CPU 进行压力测试，使其超过 60°C

    ```
    stress-ng --cpu 0
    ```
    
1. 开启另一个窗口监控温度

    ```
    watch -n 1 vcgencmd measure_temp
    ```

1. 超过 60°C 后看看风扇转不转，如果转了就按下 `Ctrl + C` 关闭程序。温度下降后再看看风扇转不转，不转就对了

## 后记

Argon Neo 搭配 Argon Mini Fan 真好用啊！调好风扇之后树莓派就可以做一个安静的路由器了，只有温度过高时风扇才转。要是你的树莓派也用 OpenWrt，不要用 Argon Fan HAT。OpenWrt 不能安装 Argon Fan HAT 的控制脚本，装上风扇后它只会以 50% 的转速一直转。

## 默认的 config.txt

这是 [SuLingGG/OpenWrt-Mini](https://github.com/SuLingGG/OpenWrt-Mini) 固件 `/boot/config.txt` 的内容。

```
################################################################################
# Bootloader configuration - config.txt
################################################################################

################################################################################
# For overclocking and various other settings, see:
# https://www.raspberrypi.org/documentation/configuration/config-txt/README.md
################################################################################

# OpenWrt config
include distroconfig.txt

[pi2]
dtparam=i2c_arm=on,audio=on

[pi3]
dtparam=i2c_arm=on,audio=on

[pi4]
dtparam=i2c_arm=on,audio=on

[all]
# Place your custom settings here.
dtparam=i2c_arm=on,audio=on
```

## 参考资料

- [Official Raspberry Pi 4 fan? (Yes!, instructions inside) - Hardware Questions and Recommendations - OpenWrt Forum](https://forum.openwrt.org/t/official-raspberry-pi-4-fan-yes-instructions-inside/93975)

- [[4:23] The Best $10 Pi4 Case Fan Combo - The Argon Poly+ - YouTube](https://youtu.be/fJKWd6xJYU4?t=267)