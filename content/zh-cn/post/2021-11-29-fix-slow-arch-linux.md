---
title: 修复变慢的 Arch Linux（起因：auto-cpufreq）
date: '2021-11-29'
slug: fix-slow-arch-linux
tags:
  - Arch Linux
  - Linux
---

最近 Arch Linux 用起来有点慢，有时候桌面会卡住一两秒。我用 auto-cpufreq(1.7.2) 调节 CPU 频率，该不会是它出问题了吧。先看看数据：

```bash
❯ sudo auto-cpufreq --stats

Note: You can quit stats mode by pressing "ctrl+c"

                Executed on: December 06 (Monday) - 01:05:35

-------------------------------------------------------------------------------

Linux distro: Arch Linux rolling n/a
Linux kernel: 5.15.6-zen2-1-zen
Processor: AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx
Cores: 8
Architecture: x86_64
Driver: acpi-cpufreq

------------------------------ Current CPU stats ------------------------------

CPU max frequency: 2100 MHz
CPU min frequency: 1400 MHz

Core    Usage   Temperature     Frequency
CPU0:    11.0%     43 °C     1397 MHz
CPU1:     8.2%     43 °C     1397 MHz
CPU2:    10.0%     43 °C     1400 MHz
CPU3:    13.9%     43 °C     1400 MHz
CPU4:    16.2%     43 °C     1400 MHz
CPU5:     7.0%     43 °C     1400 MHz
CPU6:    13.0%     43 °C     1400 MHz
CPU7:     8.9%     43 °C     1400 MHz

---------------------------- CPU frequency scaling ----------------------------

Battery is: discharging

Setting to use: "powersave" governor

Total CPU usage: 1.2 %
Total system load: 0.44
Average temp. of all cores: 42.75 °C

Load optimal
setting turbo boost: off

-------------------------------------------------------------------------------
```

果然出问题了，我的笔记本在充电，auto-cpufreq 错误地认为电脑没充电，将调频器设置为 powersave，而且频率只有 1400 MHz。Ryzen 5 3500U 的最高频率可是 3700 MHz 啊。解决办法就是禁用或卸载 auto-cpufreq。

```
# 禁用
sudo systemctl disable --now auto-cpufreq.service
# 卸载
sudo pacman -Rsn auto-cpufreq
```

[1.8.0 版本修复了充电检测的问题](https://github.com/AdnanHodzic/auto-cpufreq/issues/281#issuecomment-986220028)，但我使用设置充电阈值（charge threshold）之后 auto-cpufreq 会认为笔记本未充电。用了 auto-cpufreq 之后用 Geekbench 跑分比不用还低，TLP 就没这个问题。auto-cpufreq 实在太多问题了，已弃用。

---

排查问题的时候发现几个好用的工具：

- TLP：省电利器
- cpupower：查看/调节 CPU
- cpupower-gui：查看/调节 CPU，图形界面
- Geekbench：CPU 评测工具，可根据分数检查 CPU 性能