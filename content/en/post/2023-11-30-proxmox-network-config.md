---
title: How to Change Network Configuration on Proxmox VE
date: 2023-11-30T00:00:00+08:00
slug: proxmox-network-config
tags:
  - Proxmox Virtual Environment
lastmod: 2023-12-10T02:08:40+08:00 # remove this line if the content is actually changed
---

When a Proxmox server connects to a new network (e.g. a new router), its network configuration needs to be changed.

Edit `/etc/network/interfaces` and `/etc/hosts` to change IP address and gateway, `/etc/resolv.conf` to change DNS. Then reboot the system.

```bash
# Use nano to edit
nano /etc/{network/interfaces,hosts,resolv.conf}
# Use Vim to edit
vim -p /etc/{network/interfaces,hosts,resolv.conf}
```

```bash
reboot
```
