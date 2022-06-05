---
title: 完全删除 Git 仓库的文件
date: '2021-01-25'
slug: git-remove-sensitive-data
tags:
  - CLI
  - Git
---

<!--
怎么删除多个文件？
-->

## 步骤

完全删除 Git 仓库的文件是我不常用的操作，但好像每年都得用几次。还是把方法摘抄于此作为备忘录，省得下次再去搜索。这个方法是从 [GitHub 文档](https://docs.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository)抄来的，操作比较危险，请先把本文看完再尝试。可以把整个仓库复制到另一个地方来尝试前 2 步。

1. 重写历史

    ```bash
    git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch path/to/your/file" \
    --prune-empty --tag-name-filter cat -- --all
    ```

    注意，此命令需要在仓库根目录运行。如果反悔了就用 `git reflog` 查看第 2 条历史的哈希值，然后用 `git reset --hard commit-id` 就可以恢复了。

1. 清除 reflog

    ```bash
    git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
    git reflog expire --expire=now --all
    git gc --prune=now
    ```

    执行了这些命令之后文件就真的消失了，无法恢复。

1. 推送更改到远程仓库

    ```bash
    git push origin --force --all
    git push origin --force --tags
    ```

1. 联系 [GitHub](https://support.github.com/contact) 删除 pull requests 中的文件

上述操作十分危险，如非必要，千万别在公开的仓库使用，不然会给开发者带来麻烦。使用后 Git 历史会被重写，别人 `git pull` 时会出错。

## 技巧

下面这几条技巧可以帮你避免添加不必要的文件。

- 用 `.gitignore` 排除文件
- 使用 GUI 软件，用 GUI 更容易看出具体的文件变动
- 使用 `git add filename` 和 `git rm filename` 来代替 `git add .` 和 `git commit -a`
- 使用 `git add --interactive` 添加文件
- 使用 `git diff --cached` 查看变动
