---
title: trash-cli 中文手册
date: '2020-12-12'
tags:
  - Ubuntu
  - Linux
  - CLI
slug: trash-cli-manual
---

> `rm` 是常用的 `BASH` 命令，但是误删文件后比较难恢复。用 [trash-cli](https://github.com/andreafrancia/trash-cli) 更安全，它只是把文件移动到回收站，这样误删文件也很容易恢复。我觉得这个软件挺好用的，就把[官方文档](https://github.com/andreafrancia/trash-cli/blob/master/README.rst)翻译成[中文](https://github.com/andreafrancia/trash-cli/blob/master/README_zh-CN.rst)了。

<!--
# trash-cli - Command Line Interface to FreeDesktop.org Trash.
-->

## trash-cli——FreeDesktop.org 回收站的命令行界面

[![Donate](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93L6PYT4WBN5A)

<!--
trash-cli trashes files recording the original path, deletion date, and permissions. It uses the same trashcan used by KDE, GNOME, and XFCE, but you can invoke it from the command line (and scripts).
-->

trash-cli 用于移动文件到回收站，同时会记录文件的原地址、删除日期和权限。trash-cli 和 KDE、GNOME、XFCE 使用同一个回收站，你可以在命令行或脚本运行 trash-cli。

<!--
It provides these commands:

    trash-put           trash files and directories.
    trash-empty         empty the trashcan(s).
    trash-list          list trashed files.
    trash-restore       restore a trashed file.
    trash-rm            remove individual files from the trashcan.
-->

trash-cli 提供以下命令：

    trash-put           把文件或目录移动到回收站
    trash-empty         清空回收站
    trash-list          列出回收站文件
    trash-restore       恢复回收站文件
    trash-rm            删除回收站文件

<!--
## Usage
-->

### 用法

<!--
Trash a file:

    $ trash-put
-->

移动文件到回收站：

    $ trash-put

<!--
List trashed files:

    $ trash-list
    2008-06-01 10:30:48 /home/andrea/bar
    2008-06-02 21:50:41 /home/andrea/bar
    2008-06-23 21:50:49 /home/andrea/foo
-->

列出回收站文件：

    $ trash-list
    2008-06-01 10:30:48 /home/andrea/bar
    2008-06-02 21:50:41 /home/andrea/bar
    2008-06-23 21:50:49 /home/andrea/foo

<!--
Search for a file in the trashcan:

    $ trash-list | grep foo
    2007-08-30 12:36:00 /home/andrea/foo
    2007-08-30 12:39:41 /home/andrea/foo
-->

搜索回收站文件：

    $ trash-list | grep foo
    2007-08-30 12:36:00 /home/andrea/foo
    2007-08-30 12:39:41 /home/andrea/foo

<!--
Restore a trashed file:

    $ trash-restore
    0 2007-08-30 12:36:00 /home/andrea/foo
    1 2007-08-30 12:39:41 /home/andrea/bar
    2 2007-08-30 12:39:41 /home/andrea/bar2
    3 2007-08-30 12:39:41 /home/andrea/foo2
    4 2007-08-30 12:39:41 /home/andrea/foo
    What file to restore [0..4]: 4
    $ ls foo
    foo
-->

恢复回收站文件：

    $ trash-restore
    0 2007-08-30 12:36:00 /home/andrea/foo
    1 2007-08-30 12:39:41 /home/andrea/bar
    2 2007-08-30 12:39:41 /home/andrea/bar2
    3 2007-08-30 12:39:41 /home/andrea/foo2
    4 2007-08-30 12:39:41 /home/andrea/foo
    What file to restore [0..4]: 4
    $ ls foo
    foo

<!--
Remove all files from the trashcan:

    $ trash-empty
-->

删除所有回收站文件：

    $ trash-empty

<!--
Remove only the files that have been deleted more than \<days\> ago:

    $ trash-empty <days>
-->

删除回收站中 n 天前被回收的文件：

    $ trash-empty <days>

<!--
Example:

    $ date
    Tue Feb 19 20:26:52 CET 2008
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today
    2008-02-18 20:11:34 /home/einar/yesterday
    2008-02-10 20:11:34 /home/einar/last_week
    $ trash-empty 7
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today
    2008-02-18 20:11:34 /home/einar/yesterday
    $ trash-empty 1
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today
-->

示例：

    $ date
    Tue Feb 19 20:26:52 CET 2008
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today
    2008-02-18 20:11:34 /home/einar/yesterday
    2008-02-10 20:11:34 /home/einar/last_week
    $ trash-empty 7
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today
    2008-02-18 20:11:34 /home/einar/yesterday
    $ trash-empty 1
    $ trash-list
    2008-02-19 20:11:34 /home/einar/today

<!--
Remove only files matching a pattern:

    $ trash-rm \*.o

Note: you need to use quotes in order to protect the pattern from shell
expansion.
-->

只删除符合某种模式的文件：

    $ trash-rm \*.o

<!--
Note: you need to use quotes in order to protect the pattern from shell expansion.
-->

注意：要用双引号圈住模式来避免 shell 拓展。

<!--
## FAQ
-->

### 常见问题

<!--
### How to create a top level .Trash dir?

Steps :

    sudo mkdir --parent /.Trash
    sudo chmod a+rw /.Trash
    sudo chmod +t /.Trash
-->

#### 如何创建顶级 .Trash 目录？

步骤：

    sudo mkdir --parent /.Trash
    sudo chmod a+rw /.Trash
    sudo chmod +t /.Trash

<!--
### Can I alias *rm* to *trash-put*?
-->

#### 我能把 *rm* 的别名设置为 *trash-put* 吗？

<!--
You can but you shouldn't. In the early days I thought it was a good idea to do that but now I changed my mind.

Although the interface of *trash-put* seems to be compatible with *rm*, it has different semantics which will cause you problems. For example, while *rm* requires *-R* for deleting directories *trash-put* does not.
-->

可以，但不应该这样做。以前我觉得这是个好主意，但现在我不觉得。

虽然 *trash-put* 的界面看起来与 *rm* 兼容，但它们有不同的语法，这些差异会导致一些问题。比如，用 *rm* 删除目录时需要 *-R*，*trash-put* 则不需要。

<!--
### But sometimes I forget to use *trash-put*, really can't I?
-->

#### 但有时候我忘记用 *trash-put* 了，真的不能给 *rm* 设置别名吗？

<!--
You could alias *rm* to something that will
remind you to not use it:
-->

你可以给 *rm* 设置一个别名来提醒你不要使用它：

    alias rm='echo "This is not the command you are looking for."; false'

<!--
Then, if you really want to use *rm*, simply prepend a slash to bypass the alias:
-->

如果你真的要用 *rm*，那就在 *rm* 前加上斜杠来取消别名：

    \rm file-without-hope

<!--
Note that Bash aliases are used only in interactive shells, so using this alias should not interfere with scripts that expect to use *rm*.
-->

注意，Bash 别名是有在交互式界面才有效，所以使用这个别名不会影响使用 *rm* 的脚本。

<!--
### Where the trashed files go?
-->

#### 被移动到回收站的文件在哪？

<!--
File trashed from the home partition will be moved here:

    ~/.local/share/Trash/
-->

从 home 分区移动到回收站的文件在这：

    ~/.local/share/Trash/

<!--
## Installation
-->

### 安装

<!--
### The easy way
-->

#### 简单方法

<!--
Requirements:

> -   Python 3 (Python 2.7 may work)
> -   pip (use *apt-get install python-pip* on Debian)
-->

要求：

> - Python 3 (Python 2.7 也可以)
> - pip (在 Debian 上用 *apt-get install python-pip* 来安装 pip)

<!--
Installation command:

    pip install trash-cli
-->

安装命令:

    pip install trash-cli

<!--
### From sources
-->

#### 源码安装

<!--
System-wide installation:

    git clone https://github.com/andreafrancia/trash-cli.git
    cd trash-cli
    sudo pip install .
-->

为所有用户安装：

    git clone https://github.com/andreafrancia/trash-cli.git
    cd trash-cli
    sudo pip install .

<!--
User-only installation:

    git clone https://github.com/andreafrancia/trash-cli.git
    cd trash-cli
    pip install .
-->

为当前用户安装：

    git clone https://github.com/andreafrancia/trash-cli.git
    cd trash-cli
    pip install .

<!--
After the user installation you may want add this line to your .bashrc:

    export PATH=~/.local/bin:"$PATH"
-->

为当前用户安装后你可能需要把以下代码添加到 .bashrc：

    export PATH=~/.local/bin:"$PATH"

<!--
For uninstalling use:

    pip uninstall trash-cli
-->

卸载命令：

    pip uninstall trash-cli


#### 用包管理器安装

Debian/Ubuntu (apt):

    sudo apt install trash-cli

<!--
## Bugs and feedback
-->

### 反馈与 Bug 报告

<!--
If you discover a bug please report it here:

> <https://github.com/andreafrancia/trash-cli/issues>

You can also email me to <andrea@andreafrancia.it>. On Twitter I'm
@andreafrancia.
-->

如果你发现了 bug，请在这里报告：

> <https://github.com/andreafrancia/trash-cli/issues>

你也可以给我发邮件 <andrea@andreafrancia.it>。我的推特帐号是 @andreafrancia。

<!--
## Development
-->

### 开发

<!--
Environment setup:

    virtualenv env --no-site-packages
    source env/bin/activate
    pip install -r requirements-dev.txt
-->

环境设置：

    virtualenv env --no-site-packages
    source env/bin/activate
    pip install -r requirements-dev.txt

<!--
Running tests:

    nosetests unit_tests           # run only unit tests
    nosetests integration_tests    # run all integration tests
    nosetests -A 'not stress_test' # run all tests but stress tests
    nosetests                      # run all tests
-->

运行测试：

    nosetests unit_tests           # 只运行单元测试
    nosetests integration_tests    # 运行所有集成测试
    nosetests -A 'not stress_test' # 运行压力测试以外的测试
    nosetests                      # 运行所有测试

<!--
Check the installation process before release:

    python check_release_installation.py
-->

发布前检测安装进程：

    python check_release_installation.py

<!--
Profiling unit tests:

    pip install gprof2dot
    nosetests --with-profile --profile-stats-file stats.pf --profile-restrict=unit_tests unit_tests
    gprof2dot -w  -f pstats stats.pf | dot -Tsvg >| stats.svg
    open stats.svg
-->

单元测试性能分析：

    pip install gprof2dot
    nosetests --with-profile --profile-stats-file stats.pf --profile-restrict=unit_tests unit_tests
    gprof2dot -w  -f pstats stats.pf | dot -Tsvg >| stats.svg
    open stats.svg
