---
title: 给本地电脑配置 UFW（Uncomplicated Firewall）防火墙
date: '2021-10-09'
slug: ufw-for-local-computers
tags:
  - Linux
  - Arch Linux
---

## 安装

```bash
# 安装 UFW 与图形界面
sudo pacman -Syu ufw ufw-extras gufw
# 禁止入站连接（外部访问）
sudo ufw default deny incoming
# 允许出站连接
sudo ufw default allow outgoing
# 启用 UFW
sudo systemctl enable ufw --now
# 检查 UFW 状态，显示 Status: active 就说明成功启用
sudo ufw status verbose
```

## 用法

```bash
# 允许 203.0.113.101 访问
sudo ufw allow from 203.0.113.101
# 开放 8080 端口
sudo ufw allow 8080

# 在规则前加上 delete 表示删除规则

# 取消允许 203.0.113.101 访问
sudo ufw delete allow from 203.0.113.101
# 取消开放 8080 端口
sudo ufw delete allow 8080
```

## 服务器注意事项

在服务器使用 UFW 必须先执行 `ufw allow ssh`（允许 SSH 连接），再执行 `ufw default deny incoming`，最后执行 `ufw enable`，不然会导致无法用 SSH 连接服务器。

## 延伸阅读

- [Ubuntu Manpage: ufw - program for managing a netfilter firewall](https://manpages.ubuntu.com/manpages/hirsute/en/man8/ufw.8.html)
- [Uncomplicated Firewall - ArchWiki](https://wiki.archlinux.org/title/Uncomplicated_Firewall)
- [UFW Essentials: Common Firewall Rules and Commands | DigitalOcean](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)