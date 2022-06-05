---
title: 不指定路径运行自己写的软件
date: '2020-12-24'
slug: put-software-into-path
tags:
  - CLI
  - Linux
  - Ubuntu
---

在 Linux 上运行自己写的软件必须指定路径才能运行。举个例子，我写了个 BASH 脚本，把代码保存到 `hello_world` 文件，放到 `~/Desktop`，并赋予它运行权限。

```bash
#!/bin/bash
echo "Hello, World!"
```

如果我们在终端执行 `hello_world` 会怎么样呢？

```bash
$ hello_world
Command 'hello_world' not found, did you mean:
  command 'hello-world' from snap hello-world (6.4)
See 'snap info <snapname>' for additional versions.
```

完全不行啊。必须在终端输入 `~/Desktop/hello_world` 才能运行 `hello_world`。

```bash
$ ~/Desktop/hello_world
Hello, World!
```

怎么样才能像 `mv` 一样可以不输入路径就运行呢？要回答这个问题就得先弄清楚为什么 BASH 可以直接执行 `mv`。原因就是 `PATH` 变量，它保存了可执行文件的目录。输入 `tr ':' '\n' <<< "$PATH"` 可以查看 `PATH` 变量。

```bash
tr ':' '\n' <<< "$PATH"
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

当你不指定路径，直接输入一个命令（例如 `mv`）时，BASH 会从上面的目录中查找是否有这个程序，有就运行，没有就显示 `command not found`。所以把我们前面写的 `hello_world` 放入其中一个目录就可以运行了。

```bash
$ mv ~/Desktop/hello_world /home/user/.local/bin
$ hello_world
Hello, World!
```

随便找个目录丢进去也不太好，要删除文件的时候不小心删除了系统自带的软件就糟糕了。最好自己建立一个目录专门储存自己写的软件，一般 `~/bin` 用于储存用户自己的软件。那我们可以把自己写的软件存到 `~/bin`。设置步骤：

1. 建立目录

    ```bash
    mkdir ~/bin
    ```

1. 把目录添加到 `PATH` 变量

    把 `export PATH="/home/hunter/bin:$PATH"` 添加到 `~/.bashrc`[^rc]（如果用 zsh 就添加到 `~/.zshrc`）

1. 打开新的终端窗口

现在把软件放到 `~/bin` 之后直接在终端输入就可以运行了。

[^rc]: `.bashrc` 用于初始化 BASH，每次打开 BASH，BASH 都会运行 `.bashrc`。

---

延伸阅读：

- [Writing shell scripts - Lesson 1: Writing your first script and getting it to work](http://linuxcommand.org/lc3_wss0010.php)
- [PATH (变量) - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/PATH_(%E5%8F%98%E9%87%8F))
- [bash - What is the purpose of .bashrc and how does it work? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/129143/what-is-the-purpose-of-bashrc-and-how-does-it-work)