---
title: GitHub 图床教程
date: '2020-12-05'
slug: host-images-on-github
tags:
  - Github
  - blog
---

- 新建[公共仓库](https://github.com/new)[^why public]

    勾选 `Add a README file`，这样待会就可以直接克隆了

- 克隆仓库

    ```bash
    git clone git@github.com:your-username/repo-name.git
    ```

- 使用 Bash 脚本自动上传

    ```bash
    #!/bin/bash
    git add --all
    git commit -m "update"
    git push
    ```

- 安装所需软件

    ```bash
    sudo apt install fzf xclip
    pip3 install pyperclip
    ```

- 使用 Python 脚本获取图片网址

    ```python
    #!/usr/bin/env python3
    import pyperclip
    import subprocess
    
    # 请按照实际情况填写
    username = "username"
    repo_name = "repo-name"
    branch_name = "branch-name"
    
    github = f"https://raw.githubusercontent.com/{username}/{repo_name}/{branch_name}/"
    jsdeliver = f"https://cdn.jsdelivr.net/gh/{username}/{repo_name}/"
    copy_path = "fzf | tr -d '\n' | xclip -selection c"
    
    def get_url():
        subprocess.call(copy_path, shell=True)
        path = pyperclip.paste()
        print(f"\n![]({github+path})\n")
        print(f"![]({jsdeliver+path})\n")
        pyperclip.copy(f"![]({jsdeliver+path})")
    
    while True:
        if input("Press Enter to continue. Type something else to quit: ") == "":
            get_url()
        else:
            break
    ```

    这个脚本使用会输出图片的原网址和经过 jsDelivr 加速的网址，并把 jsDelivr 的网址复制到剪贴板。

[^why public]: 私人仓库需要 token 访问图片，但是 token 会自动刷新，刷新后就无法使用之前的网址。参考：[图床+Github需求](https://github.com/Molunerfinn/PicGo/issues/361)
