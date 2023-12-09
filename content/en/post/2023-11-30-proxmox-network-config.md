---
title: How to Change Network Configuration on Proxmox VE
date: '2023-11-30'
slug: proxmox-network-config
tags:
  - Proxmox Virtual Environment
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
