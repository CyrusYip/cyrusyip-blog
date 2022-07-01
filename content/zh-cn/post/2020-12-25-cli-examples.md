---
title: 命令行实例
date: '2020-12-25'
slug: cli-examples
tags:
  - CLI
  - Linux
  - Ubuntu
---

本文用于收集~~我记不住的~~实用的命令行用法。

## docker

```
# 启动已停止的容器
docker start f357e2faab77 # restart it in the background
docker attach f357e2faab77 # reattach the terminal & stdin
```

[docker - I lose my data when the container exits - Stack Overflow](https://stackoverflow.com/questions/19585028/i-lose-my-data-when-the-container-exits/19616598#19616598)

## 下载视频

```bash
# 安装工具
pip install you-get youtube-dl -U

# 下载视频
you-get https://www.iqiyi.com/v_m72044yl88.html
youtube-dl https://www.youtube.com/watch\?v\=9gfECJHQElo
```

## 去广告看视频

```bash
you-get -p vlc https://www.iqiyi.com/v_m72044yl88.html
```

## 转换图片格式

先安装 [ImageMagick](https://imagemagick.org/)：

```bash
sudo apt install imagemagick
```

把 jpg 图片转换为 png 图片：

```bash
convert input.jpg output.png
```

## 合成音频文件

[SoX](http://sox.sourceforge.net/) 和 [Mp3Wrap](http://mp3wrap.sourceforge.net/) 都可以用来合成 MP3。他们的区别如下（测试文件大小为 3.7 MB 和 4.4 MB）[^env]：

|                             | SoX                                             | Mp3Wrap                                             |
| --------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| 速度                        | 10.5 秒                                         | 瞬间                                                |
| 还原文件                    | 否                                              | 是                                                  |
| 正常播放（Elisa、VLC、mpv） | 是                                              | 只有 mpv 可以正常播放，其他播放器播放听起来不太对劲 |
| 输出文件/源文件         | 97.7%<!--8,278,912 / (3,899,155 + 4,575,372)--> | 100.006%<!--8,475,040 / (3,899,155 + 4,575,372)-->  |
|                             |                                                 |                                                     |

[^env]: 测试文件为`紅蓮華`（input-1.mp3，3.7 MB）和 `from the edge` （input-2.mp3，4.4 MB），播放器为 Elisa、VLC、mpv。

### SoX

安装 [SoX](http://sox.sourceforge.net/)：

```bash
sudo apt-get install sox libsox-fmt-mp3
```

把 `input-1.mp3` 和 `input-2.mp3` 合成为 `output.mp3`：

```bash
sox input-1.mp3 input-2.mp3 output.mp3
```

注意，要按顺序输入待合成的 MP3，把输出文件写在最后。

### Mp3Wrap

安装：

```bash
sudo apt install mp3wrap mp3splt
```

把 `input-1.mp3` 和 `input-2.mp3` 合成为 `output.mp3`：

```bash
mp3wrap output.mp3 input-1.mp3 input-2.mp3
```

注意，这次是先写输出文件，再写输入文件。输出的文件会加上后缀 `MP3WRAP`，所以生成的输出文件名为 `output_MP3WRAP.mp3`。这个后缀用于提醒用户文件是 Mp3Wrap 生成的，可以用 Mp3splt 还原：

```bash
mp3splt -w output_MP3WRAP.mp3
# -w Warp Mode，用于拆分由 Mp3Wrap 和 AlbumWrap 生成的文件
```

上述命令会把 `output_MP3WRAP.mp3` 还原成原来的 `input-1.mp3` 和 `input-2.mp3`（不会删除 `output_MP3WRAP.mp3`）。还原出来的文件和原文件是一模一样的。

## 拆分音频文件

把 MP3 拆分多个文件，每份 30 秒：

```bash
ffmpeg -i input.mp3 -f segment -segment_time 30 -c copy out%03d.mp3
```

## 剪辑视频

剪取 `input.mp4` 06:01.511 至 06:23.841 的内容，并保存为 `output.mp4`：

```bash
ffmpeg -ss 06:01.511 -to 06:23.841 -i input.mp4 -c copy output.mp4
```

选项含义：

- `-ss` （**s**et the **s**tart time）指定视频开始时间
- `-to` 指定结束时间
- `-i` （input）指定输入文件
- `-c copy` 表示使用相同编码方式（速度更快）
- `output.mp4` 是输出文件名

这些选项一定要按照顺序写，不然剪出来的视频时间不对。

我试过把 `-i` 先写在前面，也就是这样：

```
ffmpeg -i input.mp4 -ss 06:01.511 -to 06:23.841 -c copy output.mp4
```

结果输出视频开头的时间总是不对，然后整了两小时都不知道咋回事。遇到 ffmpeg 以前，我都不知道命令行软件的选项位置会影响结果。啊！多么痛的领悟！如果把 `-c copy` 选项也去掉的话，输出视频又正确了，真是搞不懂啊。

```
ffmpeg -i input.mp4 -ss 06:01.511 -to 06:23.841 output.mp4
```

## 输出好看的 PATH 变量

如果直接用 `echo $PATH` 查看 PATH 变量，结果很难看，很难分清楚哪个目录是哪个。

```bash
$ echo $PATH
/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/bin:/home/user/.local/bin:/home/user/miniconda3/condabin:/home/user/bin:/home/user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

用 `tr ':' '\n' <<< "$PATH"`，结果一目了然。`<<<` 把右边的 `$PATH` 传递到左边，`tr ':' '\n'` 把 `$PATH` 中的 `:` 转换为换行符。

```bash
$ tr ':' '\n' <<< "$PATH"
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/bin
/home/user/.local/bin
/home/user/miniconda3/condabin
/home/user/bin
/home/user/.local/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/snap/bin
```

参考：[shell - Show PATH in a human-readable way - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/80153/447708)
## KDE Plasma

```bash
# 重启 Plasma
kquitapp5 plasmashell; sleep 2; kstart5 plasmashell
# 重新加载软件列表
kbuildsycoca5
```

参考：[kwin - Can I restart the KDE Plasma Desktop without logging out? - Ask Ubuntu](https://askubuntu.com/a/481738/1154635)
## 设置华为笔记本充电阈值（charge threshold）

```bash
echo "40 70" | sudo tee /sys/devices/platform/huawei-wmi/charge_control_thresholds
```
