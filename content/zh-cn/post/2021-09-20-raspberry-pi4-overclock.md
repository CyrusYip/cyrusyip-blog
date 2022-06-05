---
title: 树莓派 4B 超频教程
date: '2021-09-20'
slug: raspberry-pi4-overclock
tags:
  - Raspberry Pi 4B
  - OpenWrt
---

本文配套文章：[在 OpenWrt 控制树莓派 Argon Mini Fan](/zh-cn/post/2021/09/15/openwrt-argon-mini-fan/)

## 准备散热器和充电器

树莓派 4B 温度达到 80°C 后 CPU 会降频，超过 85°C 后 CPU 和 GPU 都降频。所以超频前一定要给树莓派 4B 加上散热器以保证温度不超过 80°C。要是超频后达到 80°C 降频就得不偿失了。常见的散热器包括散热片、散热风扇、金属外壳等。我用的是 Argon Neo 和 [Argon Mini Fan](/zh-cn/post/2021/09/15/openwrt-argon-mini-fan/)。用风扇不要到 80°C 才启动，那会都降频了，要在降频前启动，比如超过 60°C 就启动或者一直开着。

充电器电压至少 4.8 V，建议使用树莓派官方充电器或者 5V 3A 充电器。

## 超频设置

根据[树莓派官方杂志的文章](https://magpi.raspberrypi.org/articles/how-to-overclock-raspberry-pi-4)，把树莓派 CPU 超频至 2.0GHz。

1. 修改 `/boot/config.txt`。

    ```bash
    nano /boot/config.txt
    ```

1. 加入以下内容。

    ```
    # overclock
    over_voltage=6
    arm_freq=2000
    ```
    
1. 重启

    ```bash
    reboot
    ```

## OpenWrt 的额外设置

我使用的 [SuLingGG/OpenWrt-Mini](https://github.com/SuLingGG/OpenWrt-Mini) 固件自带 CPU 频率调节软件，需要进行额外配置。访问 luci 管理界面，点击 「系统 -> CPU 性能优化调节设置」，把「最大 Turbo Boost CPU 频率」调为 `2000000`。

## 取消超频

如果超频后无法开机，就把内存卡拔下来插入电脑，修改 `/boot/config.txt`，把频率调到可以开机。如果实在不行就把添加的超频配置都删了。

## 测试

1. 安装压力测试软件 stress-ng 

    ```
    opkg update
    opkg install stress-ng procps-ng-watch
    ```

1. 对 CPU 进行压力测试，使其频率达到 2.0GHz

    ```
    stress-ng --cpu 0
    ```
    
1. 开启另一个窗口查看 CPU 频率

    ```
    watch -n 1 vcgencmd measure_clock arm
    ```

1. 频率到达 2000000000 左右就对了，按下 `Ctrl + C` 关闭程序

## 进阶

树莓派超频的最高频率是 2.147GHz，但可能会导致树莓派无法重启（我的树莓派就是）。所以建议用 2.0GHz。树莓派可以超频 GPU，但官方人员说作用很小。

> Our engineering team told us that the benefits from gpu_freq are marginal at best, and it should be removed if Raspberry Pi 4 fails to boot.
>
> —[How to overclock Raspberry Pi 4 — The MagPi magazine](https://magpi.raspberrypi.org/articles/how-to-overclock-raspberry-pi-4)

如果你要超频 GPU，就在 `/boot/config.txt` 加上这行代码：

```
gpu_freq=750
```

这样 GPU 就超频到 750 MHz 了。

加上这行代码后树莓派会一直以最高频率运行，建议别用。

```
force_turbo=1
```

完整的配置内容是这样的：

```
# overclock
over_voltage=6 # 增加电压
arm_freq=2000 # CPU 频率，单位是 MHz，最高 2147
# gpu_freq=750 # GPU 频率，单位是 MHz
# force_turbo=1 # 以最高频率运行
```

上述代码只把 CPU 超频至 2.0GHz。`#` 之后的内容不会被系统读取，换言之，配置前面加上 `#` 就代表禁用，没有 `#` 就代表启用。如果不用超频功能，就改成这样：

```
# overclock
# over_voltage=6 # 增加电压
# arm_freq=2000 # CPU 频率，单位是 MHz，最高 2147
# gpu_freq=750 # GPU 频率，单位是 MHz
# force_turbo=1 # 以最高频率运行
```

修改文件后重启才会生效。

## 参考资料

[How to overclock Raspberry Pi 4 — The MagPi magazine](https://magpi.raspberrypi.org/articles/how-to-overclock-raspberry-pi-4)